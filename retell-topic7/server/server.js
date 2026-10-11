// Mock endpoint for Retell custom function: create_booking_request (zero dependencies)
// Run: node server/server.js   (PORT env optional, default 3000)
// Expose publicly for Retell: npx ngrok http 3000 (or deploy to Render/Railway)
// Test modes (append to URL): ?mode=503 -> forces 503 | ?mode=delay -> responds after 15s (timeout test)
const http = require("http");
const crypto = require("crypto");

const PORT = process.env.PORT || 3000;
const SERVICES = ["Buyer Consultation", "Seller Consultation", "Investment Review"];
const REQUIRED = ["caller_first_name", "caller_last_name", "caller_phone", "caller_email", "service_type", "preferred_window_1"];
const ALL = REQUIRED.concat(["preferred_window_2", "preferred_window_3"]);
const store = new Map(); // idempotency: payload hash -> booking_reference

const send = (res, code, body) => { res.writeHead(code, { "Content-Type": "application/json" }); res.end(JSON.stringify(body)); };
const err = (res, code, errCode, message) => send(res, code, { status: "error", code: errCode, message });

function validate(p) {
  for (const f of REQUIRED) {
    if (p[f] === undefined || p[f] === null || String(p[f]).trim() === "")
      return { code: "MISSING_FIELD", message: `${f} is required.` };
  }
  if (!/^\d{10}$/.test(String(p.caller_phone))) return { code: "INVALID_FORMAT", message: "caller_phone must be 10 digits." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(p.caller_email))) return { code: "INVALID_FORMAT", message: "caller_email must contain '@' and a domain." };
  if (!SERVICES.includes(p.service_type)) return { code: "INVALID_FORMAT", message: `service_type must be one of: ${SERVICES.join(", ")}.` };
  return null;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === "GET" && url.pathname === "/health") return send(res, 200, { status: "ok" });
  if (req.method !== "POST" || url.pathname !== "/create_booking_request") return err(res, 404, "NOT_FOUND", "Use POST /create_booking_request");

  let raw = "";
  req.on("data", (c) => (raw += c));
  req.on("end", () => {
    const mode = url.searchParams.get("mode");
    console.log(new Date().toISOString(), "REQUEST", mode || "", raw);
    if (mode === "503") return err(res, 503, "SERVICE_UNAVAILABLE", "Booking service is temporarily unavailable. Please try again shortly.");
    if (mode === "delay") return setTimeout(() => send(res, 200, { status: "success" }), 15000);

    let body;
    try { body = JSON.parse(raw || "{}"); } catch { return err(res, 400, "INVALID_FORMAT", "Body must be valid JSON."); }
    const p = body.args && typeof body.args === "object" ? body.args : body; // args-only or wrapped

    const bad = validate(p);
    if (bad) return err(res, 400, bad.code, bad.message);

    const key = crypto.createHash("sha256").update(JSON.stringify(ALL.map((k) => String(p[k] ?? "").trim()))).digest("hex");
    if (!store.has(key)) {
      const d = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const n = (parseInt(key.slice(0, 8), 16) % 9000) + 1000;
      store.set(key, `NNB-${d}-${n}`);
      console.log("NEW BOOKING", store.get(key));
    } else console.log("DUPLICATE (retry) -> same reference", store.get(key));

    send(res, 200, { status: "success", booking_reference: store.get(key), message: "Booking request received. A coordinator will confirm your slot within 2 business hours." });
  });
});
server.listen(PORT, () => console.log(`Mock endpoint listening on :${PORT}`));
