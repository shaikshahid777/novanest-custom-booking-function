# Retell AI – Topic 7: Custom Function Calling (NovaNest `create_booking_request`)

Extends the NovaNest booking agent (Topic 6) with one custom function that submits the confirmed booking to an external endpoint and reads back a booking reference, with graceful failure handling.

## Repo structure
```
server/server.js                      Mock endpoint (validation, idempotency, 503/timeout test modes)
config/function_config.md             Dashboard settings
config/create_booking_request.schema.json   JSON Schema parameters
config/prompt_additions.md            Prompt additions (trigger / success / failure)
docs/API_CONTRACT.md                  API contract
docs/TEST_RESULTS.md                  Test checklist + evidence
docs/FAQ.md                           Topic 7 FAQ answers
docs/DEMO_SCRIPT.md                   Demo video script
tests/run_tests.sh                    Endpoint tests (curl)
```

## Quick start
1. `npm start` (Node 16+; no dependencies) → `http://localhost:3000/create_booking_request`
2. Expose it: `npx ngrok http 3000` (or use webhook.site / n8n / Make instead).
3. In Retell → agent → Tools → Add custom function: follow `config/function_config.md`, paste the schema.
4. Append `config/prompt_additions.md` to the agent prompt.
5. `npm test` for endpoint tests; run dashboard test calls for TC-001…006, TC-010.
   - 503 test: URL `…/create_booking_request?mode=503`
   - Timeout test: URL `…/create_booking_request?mode=delay`

## Assumptions
Topics 1–6 in place; mock endpoint stands in for production API (swap = single URL change); one function only.

## Limitations
In-memory idempotency store (resets on restart); no auth on endpoint; booking reference is simulated.

## Challenges
LLM firing too early (solved with explicit "do not call before" rules); preventing raw JSON/error codes being spoken (prompt paraphrase rules); keeping latency under 5 s.

## Possible enhancements
Real CRM/calendar API, endpoint auth (Retell signature/API key), persistent DB for idempotency, SMS confirmation function, availability-check function.
