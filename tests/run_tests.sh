#!/usr/bin/env bash
# Endpoint-level tests. Starts the server automatically unless NO_SERVER=1 (then set BASE=https://your-url)
BASE=${BASE:-http://localhost:3000}
if [ -z "$NO_SERVER" ]; then node server/server.js >/tmp/mock.log 2>&1 & SP=$!; sleep 1; fi
U="$BASE/create_booking_request"
VALID='{"caller_first_name":"Mia","caller_last_name":"Torres","caller_phone":"3125550247","caller_email":"mia.torres@email.com","service_type":"Buyer Consultation","preferred_window_1":"Tuesday June 24 at 10:00 AM CT","preferred_window_2":"","preferred_window_3":""}'
t(){ echo "--- $1"; curl -s -w "\nHTTP %{http_code}\n" -X POST "$2" -H 'Content-Type: application/json' -d "$3"; }
t "TC-004 success (200 + reference)" "$U" "$VALID"
t "TC-007 missing caller_phone (400 MISSING_FIELD)" "$U" '{"caller_first_name":"Mia","caller_last_name":"Torres","caller_email":"mia.torres@email.com","service_type":"Buyer Consultation","preferred_window_1":"Tue 10AM CT"}'
t "TC-008 invalid phone (400 INVALID_FORMAT)" "$U" '{"caller_first_name":"Mia","caller_last_name":"Torres","caller_phone":"555-ABC-DEFG","caller_email":"mia@email.com","service_type":"Buyer Consultation","preferred_window_1":"Tue 10AM CT"}'
t "TC-009 idempotency run 1" "$U" "$VALID"
t "TC-009 idempotency run 2 (same reference)" "$U" "$VALID"
t "TC-005 forced 503" "$U?mode=503" "$VALID"
echo "--- TC-006 timeout: set Retell URL to $U?mode=delay (responds after 15s > 10s timeout)"
[ -n "$SP" ] && { echo "--- server log"; cat /tmp/mock.log; kill $SP; }
