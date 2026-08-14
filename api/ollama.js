// Netlify Serverless Function — proxies /api/ollama/* to VPS Ollama (HTTPS→HTTP internal)
const OLLAMA = process.env.OLLAMA_URL || "http://152.67.14.127:11434";

exports.handler = async (event) => {
  const path = event.path.replace(/^\/api\/ollama/, "") || "/";
  const target = OLLAMA + path;
  const method = event.httpMethod;

  if (method === "OPTIONS") {
    return { statusCode: 204, headers: { "Access-Control-Allow-Origin": "*" } };
  }

  try {
    const body = method === "POST" ? event.body : undefined;
    const r = await fetch(target, {
      method,
      headers: { "Content-Type": "application/json" },
      body,
    });

    const ct = r.headers.get("content-type") || "";
    if (ct.includes("application/json") && !ct.includes("stream")) {
      const data = await r.json();
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
    }

    // Stream (chat)
    const reader = r.body.getReader();
    const decoder = new TextDecoder();
    let out = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      out += decoder.decode(value, { stream: true });
    }
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": ct || "application/json",
      },
      body: out,
    };
  } catch (e) {
    return {
      statusCode: 502,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: String(e) }),
    };
  }
};
