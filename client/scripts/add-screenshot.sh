#!/usr/bin/env bash
# Exports a screenshot for the site at two widths and records its size.
#
#   scripts/add-screenshot.sh <source image> <name>
#
# Writes src/assets/work/<name>-800.jpg and <name>-1600.jpg (never upscaled) and adds the larger
# file's dimensions to src/assets/work/dimensions.json. Uses macOS `sips`.
set -euo pipefail

source_image="$1"
name="$2"
out="$(dirname "$0")/../src/assets/work"

width="$(sips -g pixelWidth "$source_image" | awk '/pixelWidth/ { print $2 }')"
large=$(( width < 1600 ? width : 1600 ))
small=$(( width < 800 ? width : 800 ))

sips -s format jpeg -s formatOptions 80 --resampleWidth "$small" "$source_image" --out "$out/$name-800.jpg" > /dev/null
sips -s format jpeg -s formatOptions 80 --resampleWidth "$large" "$source_image" --out "$out/$name-1600.jpg" > /dev/null

height="$(sips -g pixelHeight "$out/$name-1600.jpg" | awk '/pixelHeight/ { print $2 }')"
node -e '
  const fs = require("node:fs");
  const [file, name, width, height] = process.argv.slice(1);
  const sizes = JSON.parse(fs.readFileSync(file, "utf8"));
  sizes[name] = [Number(width), Number(height)];
  const sorted = Object.fromEntries(Object.entries(sizes).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(file, `${JSON.stringify(sorted, null, 2)}\n`);
' "$out/dimensions.json" "$name" "$large" "$height"

echo "Added $name ($large x $height)"
