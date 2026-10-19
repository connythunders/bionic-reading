#!/usr/bin/env bash
# Hämtar Stiernhööksgymnasiets matsedel från Matilda Menu (denna + nästa vecka)
# och skriver skolmat-data.json. Kräver bara bash, curl och GNU date.
set -euo pipefail

ID="6800a1f1ccac6167260ae1c3"
OUT="${1:-skolmat-data.json}"
TZ=Europe/Stockholm
export TZ

# Måndag i innevarande vecka (date +%u: 1=mån … 7=sön)
dow=$(date +%u)
monday=$(date -d "-$((dow - 1)) days" +%F)

fetch_week() {
  local start end
  start=$(date -d "$monday +$1 days" +%F)
  end=$(date -d "$start +6 days" +%F)
  curl -fsS --retry 3 --retry-delay 5 \
    "https://menu.matildaplatform.com/api/menu?distributorId=${ID}&startDate=${start}&endDate=${end}&lang=sv"
}

w0=$(fetch_week 0)
w1=$(fetch_week 7)

printf '{"updated":"%s","weeks":[%s,%s]}\n' "$(date -Iseconds)" "$w0" "$w1" > "$OUT"
echo "Skrev $OUT ($(wc -c < "$OUT") bytes)"
