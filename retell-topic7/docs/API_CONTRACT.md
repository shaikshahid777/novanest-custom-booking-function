# API Contract – `create_booking_request`

**URL:** `POST {BASE_URL}/create_booking_request` (mock: webhook.site / n8n / Make / this repo's server)
**Headers:** `Content-Type: application/json`  **Payload mode:** Args only
**Timeout:** 10 s. Retell retries up to 2× on failure/timeout. Response cap 15,000 chars.

## Request parameters
| Parameter | Type | Required | Validation |
|---|---|---|---|
| caller_first_name | string | Yes | Non-empty |
| caller_last_name | string | Yes | Non-empty |
| caller_phone | string | Yes | Exactly 10 digits |
| caller_email | string | Yes | Contains `@` and a domain |
| service_type | string | Yes | Buyer Consultation / Seller Consultation / Investment Review |
| preferred_window_1 | string | Yes | Non-empty, includes timezone |
| preferred_window_2 | string | No | String or empty |
| preferred_window_3 | string | No | String or empty |

## Example request
```json
{"caller_first_name":"Mia","caller_last_name":"Torres","caller_phone":"3125550247","caller_email":"mia.torres@email.com","service_type":"Buyer Consultation","preferred_window_1":"Tuesday June 24 at 10:00 AM CT","preferred_window_2":"Wednesday June 25 at 2:00 PM CT","preferred_window_3":""}
```

## Success – 200
```json
{"status":"success","booking_reference":"NNB-20260624-4821","message":"Booking request received. A coordinator will confirm your slot within 2 business hours."}
```

## Failures
| Scenario | HTTP | Body |
|---|---|---|
| Missing required field | 400 | `{"status":"error","code":"MISSING_FIELD","message":"caller_phone is required."}` |
| Invalid format | 400 | `{"status":"error","code":"INVALID_FORMAT","message":"caller_phone must be 10 digits."}` |
| Service unavailable | 503 | `{"status":"error","code":"SERVICE_UNAVAILABLE","message":"Booking service is temporarily unavailable. Please try again shortly."}` |
| Timeout | – | No response; Retell retries 2×, then ends call without result; agent uses fallback message |

## Retry & idempotency
Identical payloads (Retell retries) return the **same** `booking_reference`; no duplicate record is created.

## Caller-facing language
- Success: read reference naturally; coordinator confirms within 2 business hours.
- Error/timeout: system temporarily unavailable, details noted, team will follow up shortly.
- Never read raw codes, field names or JSON keys.
