#!/usr/bin/env bash

URL="https://pvtdat.github.io/astro-profile/"

echo "======================================"
echo " Security Audit"
echo " $URL"
echo "======================================"

echo
echo "[1] HTTPS"
curl -sS -o /dev/null \
  -w "HTTP: %{http_code}\nTLS: %{ssl_verify_result}\n" \
  "$URL"

echo
echo "[2] Response Headers"
curl -sSI "$URL"

echo
echo "[3] Security Headers"

HEADERS=$(curl -sSI "$URL")

check_header() {
  HEADER="$1"

  if echo "$HEADERS" | grep -qi "^$HEADER:"; then
    echo "[OK] $HEADER"
    echo "$HEADERS" | grep -i "^$HEADER:"
  else
    echo "[WARN] Missing: $HEADER"
  fi
}

check_header "Content-Security-Policy"
check_header "Strict-Transport-Security"
check_header "X-Content-Type-Options"
check_header "X-Frame-Options"
check_header "Referrer-Policy"
check_header "Permissions-Policy"

echo
echo "[4] Information Disclosure"

if echo "$HEADERS" | grep -qi "^server:"; then
  echo "[INFO] Server header:"
  echo "$HEADERS" | grep -i "^server:"
fi

if echo "$HEADERS" | grep -qi "^x-powered-by:"; then
  echo "[WARN] X-Powered-By detected:"
  echo "$HEADERS" | grep -i "^x-powered-by:"
else
  echo "[OK] X-Powered-By not exposed"
fi

echo
echo "[5] Common exposed files"

FILES=(
  ".env"
  ".git/config"
  "package.json"
  "robots.txt"
  "sitemap.xml"
)

for FILE in "${FILES[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
    "$URL$FILE")

  if [ "$STATUS" = "200" ]; then
    echo "[FOUND] $FILE -> HTTP $STATUS"
  else
    echo "[OK] $FILE -> HTTP $STATUS"
  fi
done

echo
echo "[6] HTTP resources"

HTML=$(curl -s "$URL")

if echo "$HTML" | grep -q 'http://'; then
  echo "[WARN] HTTP resource detected"
  echo "$HTML" | grep -oE 'http://[^"'\'' ]+' | sort -u
else
  echo "[OK] No obvious HTTP resources"
fi

echo
echo "======================================"
echo " Audit finished"
echo "======================================"