# nycreflect.com

Website for Rebecca Silverman, LCSW, a psychotherapist in New York:
https://www.nycreflect.com

Next.js on Vercel. Changes go through pull requests: every pull request
gets a preview at https://nycreflect-preview.vercel.app, and merging to
`main` publishes the site after `npm run check` passes. See
[AGENTS.md](AGENTS.md) for how changes are made.

- `npm run dev`: local preview at http://localhost:3000
- `npm run check`: build the site and run the site checks
