#!/usr/bin/env bash
# Deploys the prebuilt .vercel/output and waits for Vercel to finish,
# failing fast instead of hanging.
#
# Why not plain `vercel deploy --prebuilt`: when Vercel refuses a deployment
# (state BLOCKED, e.g. the Hobby plan rejecting a commit whose author isn't
# the account owner) the CLI keeps waiting for it to become ready, forever.
# On 2026-10-26 that held three jobs for GitHub's full 6-hour limit and used
# up the month's Actions minutes. Here we start the deploy with --no-wait and
# poll its state ourselves, with a deadline.
#
# Usage: vercel-deploy.sh [extra vercel deploy flags, e.g. --prod]
# Needs: VERCEL_CLI, VERCEL_TOKEN, VERCEL_ORG_ID. Writes url=… to
# $GITHUB_OUTPUT when the deployment is READY.
set -euo pipefail

url=$(npx --yes "$VERCEL_CLI" deploy --prebuilt --no-wait "$@" --token="$VERCEL_TOKEN")
echo "Deployment: $url"

for _ in $(seq 1 60); do # 60 × 10s = 10 minutes
  state=$(curl --fail-with-body -sS -H "Authorization: Bearer $VERCEL_TOKEN" \
    "https://api.vercel.com/v13/deployments/${url#https://}?teamId=$VERCEL_ORG_ID" | jq -r .readyState)
  case "$state" in
    READY)
      echo "url=$url" >> "$GITHUB_OUTPUT"
      exit 0
      ;;
    BLOCKED)
      echo "::error::Vercel blocked this deployment. On the Hobby plan Vercel only deploys commits authored by the account owner."
      exit 1
      ;;
    ERROR | CANCELED)
      echo "::error::Vercel deployment ended in state $state: $url"
      exit 1
      ;;
  esac
  sleep 10
done

echo "::error::Vercel deployment still not ready after 10 minutes (last state: $state): $url"
exit 1
