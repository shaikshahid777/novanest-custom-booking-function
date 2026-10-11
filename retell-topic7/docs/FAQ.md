# Topic 7 FAQ – Answers

## Section 1: Custom Functions & LLM Triggering
**Q1.** A custom function is a tool registered on a Retell agent. When called, Retell sends an HTTP request to an external endpoint during the live call; the endpoint performs an action (create record, check availability, send message) and returns a result the agent can speak.
**Q2.** The LLM reads the function's description and decides which conversation moment warrants the call. Vague descriptions cause early, late or missed calls, so the description is the main control over trigger accuracy.
**Q3.** `create_booking_request`. It fires after Stage 2 (contact capture) and Stage 3 (time windows + service type) are complete and the caller confirms they are ready to proceed; it submits the booking and returns a reference.
**Q4.** Required: caller_first_name, caller_last_name, caller_phone (10 digits), caller_email, service_type (Buyer Consultation / Seller Consultation / Investment Review), preferred_window_1 (with timezone). Optional: preferred_window_2, preferred_window_3.

## Section 2: Function Configuration
**Q5.** Name `create_booking_request`; trigger description with "do not call before…" conditions; POST; mock endpoint URL; Args Only; timeout 10 s; Speak During ON; Speak After ON; JSON-schema parameters.
**Q6.** Args Only sends just the parameter object at the top level of the body (no name/call/args wrapper). It keeps the payload simple for webhooks, n8n, Make and mock endpoints.
**Q7.** The agent speaks a holding message while the endpoint processes, avoiding dead air. Message: "Let me go ahead and submit that booking request for you now."
**Q8.** The agent reads the result to the caller immediately after execution without waiting for the caller to prompt – the booking reference on success, or the failure message on error.

## Section 3: Request, Response & Failure Handling
**Q9.** 200 with `{"status":"success","booking_reference":"NNB-20260624-4821","message":"Booking request received. A coordinator will confirm your slot within 2 business hours."}`. The agent reads the reference in a natural sentence and says a coordinator will confirm within 2 business hours, without reading JSON keys.
**Q10.** (1) 400 `MISSING_FIELD` – e.g. "caller_phone is required." (2) 503 `SERVICE_UNAVAILABLE` – "Booking service is temporarily unavailable. Please try again shortly." (Also 400 `INVALID_FORMAT` for bad formats, and timeout = no response.)
**Q11.** "I wasn't able to submit the request right now, but your details have been noted and our team will follow up shortly to confirm your slot." No error codes or field names are read aloud.
**Q12.** Retell retries up to 2 times on failure/timeout (request timeout 2 minutes by default; 10 s configured here). If all retries fail the call ends with no result and the prompt fallback applies. The endpoint is idempotent so retries don't create duplicates.

## Section 4: API Contract, Testing & Risks
**Q13.** A spec written before building the endpoint: URL, HTTP method, every input parameter with type and validation rule, success response structure, every failure response with code and message, and retry behavior (plus caller-facing language).
**Q14.** TC-001 trigger timing/happy path; TC-002 correct parameters at top level; TC-003 no early trigger; TC-004 reference spoken naturally; TC-005 503 handling; TC-006 timeout/retry handling; TC-007 missing-field 400; TC-008 invalid-phone 400; TC-009 idempotency; TC-010 no raw error data heard.
**Q15.** RSK-001 Premature trigger → add explicit "Do not call before…" conditions and verify with TC-003. RSK-002 Endpoint latency → keep mock under 5 s in testing, and use the speak-during message to fill gaps in production.
