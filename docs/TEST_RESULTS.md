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
| TC-004 | Reference read naturally | Covered in demo video | [Loom demo](https://www.loom.com/share/a227ccdad81945b5abc511efccc75fcd) |
| TC-007 | Missing phone | Pass (HTTP 400, MISSING_FIELD) | [server-log-happy-path.txt](../screenshots/server-log-happy-path.txt) |
| TC-008 | Invalid phone | Pass (HTTP 400, INVALID_FORMAT) | [server-log-happy-path.txt](../screenshots/server-log-happy-path.txt) |
| TC-009 | Idempotency | Pass (same reference returned twice) | [server-log-happy-path.txt](../screenshots/server-log-happy-path.txt) |
| TC-003 | Early-trigger prevention | Not run | No verified result |
| TC-005 | Failure handling | Not run. Failure handling is verified at endpoint level only. | Endpoint failure mode exists; no completed Retell test claimed |
| TC-006 | Failure / retry scenario | Not run. Failure handling is verified at endpoint level only. | Endpoint failure mode exists; no completed Retell test claimed |
| TC-010 | Timeout / delayed response | Not run. Failure handling is verified at endpoint level only. | Endpoint delay mode exists; no completed Retell test claimed |

## Supporting Evidence

- [Function configuration and prompt screenshots](../screenshots/)
- [Happy-path server log](../screenshots/server-log-happy-path.txt)
- [Loom demo](https://www.loom.com/share/a227ccdad81945b5abc511efccc75fcd)

## Scope and Limitations

The endpoint includes a simulated HTTP 503 mode and a delayed-response mode. These modes exist for testing, but TC-005, TC-006, and TC-010 were not run as completed Retell tests. They remain marked **Not run**.

The mock server returns simulated booking references. It does not integrate with a real calendar or CRM. Idempotency is stored in memory, and endpoint authentication is not implemented.

Test statuses reflect the evidence currently documented in this repository. No unchecked PASS/FAIL placeholders are used.
