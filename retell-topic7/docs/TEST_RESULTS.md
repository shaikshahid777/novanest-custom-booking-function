# Test Results (fill Status/Evidence after running; attach screenshots)

| TC | Description | Layer | How to run | Expected | Status | Evidence |
|---|---|---|---|---|---|---|
| TC-001 | Happy path, trigger after confirmation | Call | Dashboard test call, confirm all fields, say "yes" | Fires after confirm; holding msg; reference read | ☐ Pass | screenshot/video |
| TC-002 | Parameters correct | Call | Check webhook.site log | 8 params top level, values match call | ☐ Pass | webhook.site screenshot |
| TC-003 | Early trigger prevention | Call | Omit email, say "ready" | No request; agent asks email | ☐ Pass | empty webhook log |
| TC-004 | Reference spoken naturally | Call | Happy path, read transcript | No JSON keys spoken | ☐ Pass | transcript |
| TC-005 | 503 handling | Call | Endpoint URL + `?mode=503` | Defined failure message | ☐ Pass | transcript |
| TC-006 | Timeout handling | Call | Endpoint URL + `?mode=delay` | After retries, failure message, no hang | ☐ Pass | transcript |
| TC-007 | Missing field → 400 | Endpoint | `tests/run_tests.sh` | 400 MISSING_FIELD | ☐ Pass | terminal output |
| TC-008 | Invalid phone → 400 | Endpoint | `tests/run_tests.sh` | 400 INVALID_FORMAT | ☐ Pass | terminal output |
| TC-009 | Idempotency | Endpoint | `tests/run_tests.sh` | Same reference twice | ☐ Pass | terminal output |
| TC-010 | No raw error data spoken | Call | Error call, review transcript | No codes/keys spoken | ☐ Pass | transcript |
