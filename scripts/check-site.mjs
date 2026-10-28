/*
 * SITE CHECKS — run by `npm run check` after `next build`, and in CI on
 * every pull request.
 *
 * Starts the production build locally and checks what a visitor would
 * actually get, page by page. The page list comes from /sitemap.xml, which
 * is generated from ROUTES in src/app/_lib/site.ts, so a new page is
 * covered without touching this file.
 *
 * What fails the check:
 *   - any page that doesn't return 200 or has no <h1>
 *   - placeholder or broken text on a page ("undefined", "lorem ipsum"…)
 *   - an internal link or image that doesn't load
 *   - the phone number or email disagreeing between pages, the footer,
 *     the JSON-LD, and llms.txt (they are hand-copied in several files)
 *   - a colour outside the brand palette in globals.css, or text colours
 *     in that palette too faint to read against their backgrounds
 */
import { spawn } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = Number(process.env.CHECK_PORT ?? 3123);
const BASE = `http://127.0.0.1:${PORT}`;
const PROD_ORIGIN = "https://www.nycreflect.com";

const BAD_TEXT = [
  /\bundefined\b/i,
  /\bNaN\b/,
  /\[object Object\]/,
  /lorem ipsum/i,
  /\bTODO\b/,
  /\bTBD\b/,
  /\bXXX\b/,
];

const problems = [];
const fail = (msg) => problems.push(msg);

/* ---------- Brand palette (static, before the server starts) ----------
   Colours live as tokens in the @theme block of globals.css. Pages must use
   those tokens (bg-cream, text-sage…) rather than new colours, so a design
   change can re-arrange and re-colour sections without drifting off-brand.
   Changing a token's value is allowed (it re-colours the whole site), but
   the text/background pairs below must stay readable. */
const css = readFileSync("src/app/globals.css", "utf8");
const palette = Object.fromEntries(
  [...css.matchAll(/--color-([\w-]+):\s*(#[0-9a-fA-F]{6})\b/g)].map((m) => [m[1], m[2].toLowerCase()]),
);
const paletteHex = new Set(Object.values(palette));

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
// [text token, background token, minimum ratio]. 4.5 = WCAG AA for body
// text. The sage/tan accents (eyebrows, emphasis, muted notes) measure
// about 4.2 today, so 4.0 holds them where they are rather than letting a
// lighter shade slip in; darkening them is always fine.
const CONTRAST_PAIRS = [
  ["text-body", "cream", 4.5],
  ["text-body", "cream-light", 4.5],
  ["text-primary", "cream", 4.5],
  ["text-primary", "sand", 4.5],
  ["dark-text", "dark", 4.5],
  ["sage", "cream", 4],
  ["sage", "cream-light", 4],
  ["text-muted", "cream", 4],
];
for (const [fg, bg, min] of CONTRAST_PAIRS) {
  if (!palette[fg] || !palette[bg]) {
    fail(`globals.css is missing the --color-${palette[fg] ? bg : fg} colour`);
    continue;
  }
  const ratio = contrast(palette[fg], palette[bg]);
  if (ratio < min) {
    fail(`"${fg}" text on "${bg}" is too faint to read (contrast ${ratio.toFixed(2)}, needs ${min})`);
  }
}

const STOCK_COLOUR = /\b(?:bg|text|border|from|via|to|fill|stroke|ring|decoration|outline|divide|placeholder|caret|accent|shadow)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black)(?:-\d{2,3})?\b/g;
// Stock colours with a job: red for form error messages, black for the
// nav's hairline border.
const ALLOWED_STOCK = new Set(["red", "black"]);
function* sourceFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      yield* sourceFiles(p);
    } else if (/\.(tsx|ts)$/.test(name)) yield p;
  }
}
for (const file of sourceFiles("src/app")) {
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(/#[0-9a-fA-F]{6}\b/g)) {
    if (!paletteHex.has(m[0].toLowerCase())) {
      fail(`${file} uses colour ${m[0]}, which isn't in the brand palette (globals.css)`);
    }
  }
  for (const m of src.matchAll(STOCK_COLOUR)) {
    if (!ALLOWED_STOCK.has(m[1])) {
      fail(`${file} uses "${m[0]}", which isn't a brand colour. Use a palette colour such as text-sage or bg-cream`);
    }
  }
}

const server = spawn("node_modules/.bin/next", ["start", "-p", String(PORT)], {
  stdio: ["ignore", "pipe", "pipe"],
});
let serverLog = "";
server.stdout.on("data", (d) => (serverLog += d));
server.stderr.on("data", (d) => (serverLog += d));

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(BASE, { redirect: "manual" });
      return;
    } catch {
      await sleep(500);
    }
  }
  throw new Error(`Server did not start on ${BASE}.\n${serverLog}`);
}

async function get(path) {
  const res = await fetch(BASE + path, { redirect: "manual" });
  return { status: res.status, body: await res.text() };
}

/** Visible text only: drop scripts/styles (Next's RSC payload legitimately
    contains "$undefined"), then tags. */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
}

const digits = (s) => s.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
const attrs = (html, name) =>
  [...html.matchAll(new RegExp(`${name}="([^"]*)"`, "g"))].map((m) =>
    m[1].replace(/&amp;/g, "&"),
  );

try {
  await waitForServer();

  const sitemap = await get("/sitemap.xml");
  if (sitemap.status !== 200) fail(`/sitemap.xml returned ${sitemap.status}`);
  const pages = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
    const path = m[1].replace(PROD_ORIGIN, "");
    return path === "" ? "/" : path;
  });
  if (pages.length === 0) fail("sitemap.xml lists no pages");

  // Every page in src/app must be in the sitemap (ROUTES in _lib/site.ts),
  // otherwise a newly added page would skip every check below and never be
  // submitted to Google. Folders starting with _ are private (not routed).
  const pageRoutes = (function* walk(dir, route) {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) {
        if (!/^[_(\[]/.test(name)) yield* walk(p, `${route}/${name}`);
      } else if (/^page\.(tsx|ts|jsx|js|mdx)$/.test(name)) {
        yield route || "/";
      }
    }
  })("src/app", "");
  for (const route of pageRoutes) {
    if (!pages.includes(route)) {
      fail(`${route} exists but isn't in ROUTES (src/app/_lib/site.ts), so it's missing from the sitemap`);
    }
  }

  const links = new Set();
  const images = new Set();
  const phones = new Map(); // digits -> where seen
  const emails = new Map(); // lowercased -> where seen
  const note = (map, key, where) => {
    if (!map.has(key)) map.set(key, new Set());
    map.get(key).add(where);
  };

  for (const path of pages) {
    const { status, body } = await get(path);
    if (status !== 200) {
      fail(`${path} returned ${status} (expected 200)`);
      continue;
    }
    if (!/<h1[\s>]/.test(body)) fail(`${path} has no main heading (<h1>)`);
    if (!/<title>[^<]+<\/title>/.test(body)) fail(`${path} has no <title>`);

    // Structure every page must keep: menu, footer, a way to get in touch,
    // and the SEO tags that tell Google which URL this page is.
    if (!/<nav[\s>]/.test(body)) fail(`${path} is missing the top menu`);
    if (!/<footer[\s>]/.test(body)) fail(`${path} is missing the footer`);
    if (path !== "/contact" && !attrs(body, "href").includes("/contact")) {
      fail(`${path} has no link to the contact page`);
    }
    if (!/<meta name="description" content="[^"]{20,}"/.test(body)) {
      fail(`${path} has no Google description (meta description)`);
    }
    const expectedCanonical = path === "/" ? PROD_ORIGIN : PROD_ORIGIN + path;
    const canonical = body.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (canonical !== expectedCanonical) {
      fail(`${path} canonical is ${canonical ?? "missing"} (expected ${expectedCanonical})`);
    }
    if (!/<meta property="og:image" content="[^"]+"/.test(body)) {
      fail(`${path} has no social sharing image (og:image)`);
    }
    for (const m of body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try {
        JSON.parse(m[1]);
      } catch {
        fail(`${path} has broken structured data (JSON-LD doesn't parse)`);
      }
    }
    if (path === "/contact") {
      if (!/<form[\s>]/.test(body)) fail("/contact has no form");
      for (const field of ["name", "email", "phone", "interest", "message", "website"]) {
        if (!new RegExp(`name="${field}"`).test(body)) {
          fail(`/contact form is missing its "${field}" field`);
        }
      }
    }

    const text = visibleText(body);
    for (const re of BAD_TEXT) {
      const m = text.match(re);
      if (m) {
        const i = m.index ?? 0;
        fail(`${path} shows "${m[0]}" in: …${text.slice(Math.max(0, i - 60), i + 60).trim()}…`);
      }
    }

    for (const href of attrs(body, "href")) {
      if (href.startsWith("/") && !href.startsWith("/_next/")) {
        links.add(href.split("#")[0] || "/");
      } else if (href.startsWith("tel:")) {
        note(phones, digits(href), `${path} (phone link)`);
      } else if (href.startsWith("mailto:")) {
        note(emails, href.slice(7).split("?")[0].toLowerCase(), `${path} (email link)`);
      }
    }
    for (const src of [...attrs(body, "src"), ...attrs(body, "srcSet").flatMap((s) =>
      s.split(",").map((part) => part.trim().split(" ")[0]))]) {
      if (src.startsWith("/") && !src.startsWith("/_next/static/")) images.add(src);
    }

    for (const m of text.matchAll(/\(?\b\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b/g)) {
      note(phones, digits(m[0]), `${path} (text)`);
    }
    for (const m of body.matchAll(/"telephone":"([^"]+)"/g)) {
      note(phones, digits(m[1]), `${path} (structured data)`);
    }
    for (const m of body.matchAll(/"email":"([^"]+)"/g)) {
      note(emails, m[1].toLowerCase(), `${path} (structured data)`);
    }
  }

  for (const link of links) {
    const { status } = await get(link);
    if (status !== 200) fail(`Link to ${link} is broken (returned ${status})`);
  }
  for (const img of images) {
    const { status } = await get(img);
    if (status !== 200) fail(`Image ${img} doesn't load (returned ${status})`);
  }

  for (const extra of ["/robots.txt", "/llms.txt"]) {
    const { status, body } = await get(extra);
    if (status !== 200) {
      fail(`${extra} returned ${status}`);
      continue;
    }
    if (extra === "/llms.txt") {
      for (const m of body.matchAll(/\b\d{3}-\d{3}-\d{4}\b/g)) note(phones, digits(m[0]), "/llms.txt");
      for (const m of body.matchAll(/[\w.+-]+@[\w-]+\.[\w.]+/g)) note(emails, m[0].toLowerCase(), "/llms.txt");
    }
  }

  const missing = await get("/this-page-should-not-exist");
  if (missing.status !== 404) fail(`Unknown pages return ${missing.status} instead of 404`);

  const describe = (map) =>
    [...map].map(([k, where]) => `  ${k}: ${[...where].slice(0, 4).join(", ")}`).join("\n");
  if (phones.size > 1) fail(`Phone number differs between places:\n${describe(phones)}`);
  if (emails.size > 1) fail(`Email address differs between places:\n${describe(emails)}`);
  if (phones.size === 0) fail("No phone number found anywhere on the site");
  if (emails.size === 0) fail("No email address found anywhere on the site");

  console.log(
    `Checked ${pages.length} pages, ${links.size} internal links, ${images.size} images.`,
  );
} catch (err) {
  fail(String(err?.stack ?? err));
} finally {
  server.kill();
}

if (problems.length) {
  console.error(`\n✗ Site check found ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`- ${p}`);
  process.exit(1);
}
console.log("✓ Site check passed.");
