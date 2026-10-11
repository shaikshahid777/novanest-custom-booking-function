# Retell Dashboard Configuration – `create_booking_request`

| Setting | Value |
|---|---|
| Name | `create_booking_request` |
| Description (LLM trigger) | Call this function after all required booking fields have been collected and confirmed, including first name, last name, phone, email, service type, and at least one preferred time window. Do not call before the caller has confirmed they are ready to proceed. Do not call if any required field is still missing. |
| HTTP Method | POST |
| Endpoint URL | webhook.site URL, or `https://<ngrok-or-render-url>/create_booking_request` |
| Payload: Args Only | **ON** |
| Timeout | 10 seconds |
| Speak During Execution | ON – "Let me go ahead and submit that booking request for you now." |
| Speak After Execution | ON |
| Parameters | paste `config/create_booking_request.schema.json` |
