// Vercel Serverless Function — proxies /api/* to your VPS Ollama over HTTPS.
// This avoids mixed-content (Vercel HTTPS → function HTTPS → Ollama HTTP internal).
export const config = { runtime: "nodejs18.x" };

const OLLAMA = process.env.OLLAMA_URL || "http://152.67.14.127:11434";

export default async function handler(req, res) {
  // CORS — allow the tool (any origin, since it's client-only)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();

  try {
    const target = OLLAMA + (req.url.replace(/^\/api\/ollama/, "") || "/");
    const body = req.method === "POST" ? JSON.stringify(req.body) : undefined;

    const r = await fetch(target, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body,
    });

    // Stream if Ollama streams (chat), else pass JSON
    const ct = r.headers.get("content-type") || "";
    if (ct.includes("application/json") && !ct.includes("stream")) {
      const data = await r.json();
      return res.status(200).json(data);
    }
    res.setHeader("Content-Type", ct || "application/json");
    const reader = r.body.getReader();
    const decoder = new TextDecoder();
    res.setHeader("Cache-Control", "no-cache");
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value, { stream: true }));
    }
    res.end();
  } catch (e) {
    return res.status(502).json({ error: String(e), hint: "Ollama down? VPS reachable?" });
  }
}
