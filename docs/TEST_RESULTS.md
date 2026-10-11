# Test Results — NovaNest Custom Booking Function

**Assessment:** Retell AI Topic 7, Lesson 5 — Custom Function Calling for Real Business Actions  
**Agent:** NovaNest Consultation Booking Agent  
**Function:** `create_booking_request`

## Status Definitions

- **Pass:** The expected result is confirmed by the available evidence.
- **Covered in demo video:** The scenario is covered in the recorded demo; it is not upgraded to an independently verified pass.
- **Not run:** The test was not run as a completed Retell test.

## Results

| Test ID | Scenario | Status | Evidence |
|---|---|---|---|
| TC-001 | Happy path | Covered in demo video | [Loom demo](https://www.loom.com/share/a227ccdad81945b5abc511efccc75fcd) |
| TC-002 | Parameters at top level | Pass (server log) | [server-log-happy-path.txt](../screenshots/server-log-happy-path.txt) |
| TC-003 | Early trigger prevention | Not run | No verified result |
| TC-004 | Reference read naturally | Covered in demo video | [Loom demo](https://www.loom.com/share/a227ccdad81945b5abc511efccc75fcd) |
| TC-005 | 503 handling | Not run | No verified result |
| TC-006 | Timeout and retry handling | Not run | No verified result |
| TC-007 | Missing phone | Pass (HTTP 400, MISSING_FIELD) | [PowerShell endpoint test screenshot](../screenshots/Screenshot%202026-10-10%20214519.png) |
| TC-008 | Invalid phone | Pass (HTTP 400, INVALID_FORMAT) | [PowerShell endpoint test screenshot](../screenshots/Screenshot%202026-10-10%20214519.png) |
| TC-009 | Idempotency | Pass (same reference returned twice) | [PowerShell endpoint test screenshot](../screenshots/Screenshot%202026-10-10%20214519.png) |
| TC-010 | No raw error data spoken to the caller | Not run | No verified result |

## Supporting Evidence

- [Function configuration and prompt screenshots](../screenshots/)
- [Happy-path server log](../screenshots/server-log-happy-path.txt)
- [Loom demo](https://www.loom.com/share/a227ccdad81945b5abc511efccc75fcd)

## Scope and Limitations

The endpoint includes a simulated HTTP 503 mode (`?mode=503`) and a delayed-response mode (`?mode=delay`). Failure handling is verified at endpoint level only; no Retell failure test was run. TC-005, TC-006, and TC-010 remain marked **Not run**.

The mock server returns simulated booking references. It does not integrate with a real calendar or CRM. Idempotency is stored in memory, and endpoint authentication is not implemented.

Test statuses reflect the evidence currently documented in this repository.
