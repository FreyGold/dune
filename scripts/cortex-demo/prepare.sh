#!/usr/bin/env bash
set -euo pipefail
source_repo=${1:?Pass the Cortex source repository path}
output_dir=${2:?Pass a new output directory}
if [[ -e "$output_dir" ]]; then
  printf 'Output directory already exists: %s\n' "$output_dir" >&2
  exit 1
fi
mkdir -p "$output_dir"
git -C "$source_repo" archive a4c48825e1df9c2622a11b0042052f780e6d4489 frontend | tar -x -C "$output_dir"
script_dir=$(cd -- "$(dirname -- "$0")" && pwd)
cp -a "$script_dir/overlay/frontend/." "$output_dir/frontend/"
printf '%s\n' 'NEXT_PUBLIC_EXPRESS_API_URL=https://cortex-demo-api.ahmedtawfik833.workers.dev' > "$output_dir/frontend/.env.production"
printf 'Prepared %s/frontend\n' "$output_dir"
