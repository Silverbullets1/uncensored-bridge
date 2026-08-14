/* === Uncensored Bridge — client-only, talks to YOUR Ollama === */
const PRO_FEATURES = false;
const $ = (s) => document.querySelector(s);

const state = {
  endpoint: (location.hostname.endsWith(".vercel.app") || location.hostname.endsWith(".netlify.app") || location.hostname === "silverbullets1.github.io")
    ? "/api/ollama" : "http://localhost:11434",
  model: "", system: "",
  temp: 0.8, messages: [], thinking: false, connected: false, pro: false,
};

/* ---------- UI helpers ---------- */
function openSide() { $("#sidebar").classList.add("open"); $("#scrim").classList.add("show"); }
function closeSide() { $("#sidebar").classList.remove("open"); $("#scrim").classList.remove("show"); }
function banner(msg, ok) {
  const b = $("#banner");
  b.textContent = msg; b.hidden = false;
  b.className = "banner" + (ok ? " ok" : "");
  if (ok) setTimeout(() => { b.hidden = true; }, 4000);
}
function setConn(on, text) {
  $("#connDot").className = "dot " + (on ? "on" : "off");
  $("#connText").textContent = text;
  $("#topStatus").textContent = text;
}

/* ---------- Connection ---------- */
async function connect() {
  state.endpoint = $("#endpoint").value.trim().replace(/\/+$/, "");
  setConn(false, "connecting…");
  try {
    const res = await fetch(`${state.endpoint}/api/tags`, { mode: "cors" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    const models = (data.models || []).map((m) => m.name);
    if (!models.length) throw new Error("no models — run: ollama pull qwen3-4b-65k");
    const sel = $("#model");
    sel.innerHTML = models.map((m) => `<option>${m}</option>`).join("");
    state.model = models[0];
    state.connected = true;
    setConn(true, `online · ${models.length} model(s)`);
    $("#topModel").textContent = state.model;
    banner("✅ Connected to " + state.model, true);
    closeSide();
  } catch (e) {
    setConn(false, "failed");
    banner("⚠️ " + e.message + " — Ollama running? CORS set (OLLAMA_ORIGINS=*)? iOS needs HTTPS tunnel.");
  }
}

/* ---------- Personas ---------- */
async function loadPresets() {
  try {
    const list = await (await fetch("presets.json")).json();
    const sel = $("#persona");
    sel.innerHTML = '<option value="">— none —</option>' +
      list.map((p) => `<option value="${p.id}">${p.name}</option>`).join("");
    sel.onchange = () => {
      const p = list.find((x) => x.id === sel.value);
      if (p) {
        $("#system").value = p.system; state.system = p.system;
        if (p.model && [...$("#model").options].some(o => o.value === p.model)) {
          $("#model").value = p.model; state.model = p.model;
        }
      }
    };
  } catch (e) { console.warn("presets load failed", e); }
}

/* ---------- Chat ---------- */
function addMsg(role, content, thinking) {
  const wrap = document.createElement("div");
  wrap.className = `msg ${role === "user" ? "user" : "bot"}`;
  wrap.innerHTML = `<div class="avatar">${role === "user" ? "🙂" : "🔥"}</div><div class="bubble"></div>`;
  const bubble = wrap.querySelector(".bubble");
  if (thinking) {
    const t = document.createElement("div");
    t.className = "think"; t.textContent = thinking; bubble.appendChild(t);
  }
  bubble.appendChild(document.createTextNode(content));
  const box = $("#messages");
  if (box.querySelector(".empty")) box.innerHTML = "";
  box.appendChild(wrap);
  box.scrollTop = box.scrollHeight;
  return bubble;
}

async function send() {
  const input = $("#input");
  const text = input.value.trim();
  if (!text || !state.connected || !state.model) {
    banner(state.connected ? "Pick a model first." : "Connect your Ollama first (⚙).");
    return;
  }
  input.value = ""; autosize();
  addMsg("user", text);
  state.messages.push({ role: "user", content: text });

  const bubble = addMsg("bot", "");
  const thinkEl = document.createElement("div");
  thinkEl.className = "think"; thinkEl.textContent = "Loading model… (first load ~20s on CPU)";
  bubble.appendChild(thinkEl);

  const payload = {
    model: state.model,
    messages: [
      ...(state.system ? [{ role: "system", content: state.system }] : []),
      ...state.messages,
    ],
    stream: true, options: { temperature: state.temp },
  };

  let content = "", thinking = "";
  try {
    const res = await fetch(`${state.endpoint}/api/chat`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      mode: "cors", body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("HTTP " + (res.status || "fail"));
    const reader = res.body.getReader(); const dec = new TextDecoder(); let buf = "";
    thinkEl.textContent = "…";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n"); buf = lines.pop();
      for (const line of lines) {
        if (!line.trim()) continue;
        const chunk = JSON.parse(line);
        const msg = chunk.message || {};
        if (msg.thinking) { thinking += msg.thinking; thinkEl.textContent = thinking; }
        if (msg.content) { content += msg.content; bubble.textContent = content; thinkEl.style.display = "none"; }
      }
      $("#messages").scrollTop = $("#messages").scrollHeight;
    }
    thinkEl.style.display = thinking ? "block" : "none";
    state.messages.push({ role: "assistant", content });
  } catch (e) {
    thinkEl.style.display = "none";
    bubble.textContent = "⚠️ Error: " + e.message +
      "\n\nCheck: Ollama running? CORS set (OLLAMA_ORIGINS=*)? On iOS use HTTPS tunnel.";
  }
}

/* ---------- Voice ---------- */
function initVoice() {
  const mic = $("#micBtn");
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { mic.style.display = "none"; return; }
  const rec = new SR(); rec.continuous = false; rec.interimResults = false; rec.lang = "en-US";
  let on = false;
  mic.onclick = () => { if (on) { rec.stop(); return; } on = true; mic.classList.add("rec"); rec.start(); };
  rec.onresult = (e) => { $("#input").value += e.results[0][0].transcript; autosize(); };
  rec.onend = () => { on = false; mic.classList.remove("rec"); };
}

/* ---------- License ---------- */
function activateLicense() {
  const key = $("#license").value.trim(); const hint = $("#proState");
  if (!key) { hint.textContent = "Enter a key to unlock Pro."; return; }
  if (key.startsWith("UBRIDGE-")) { state.pro = true; hint.textContent = "✅ Pro active (local preview)."; }
  else hint.textContent = "Invalid key format (expected UBRIDGE-…).";
}

/* ---------- autosize input ---------- */
function autosize() {
  const t = $("#input"); t.style.height = "auto"; t.style.height = Math.min(t.scrollHeight, 120) + "px";
}

/* ---------- Wire up ---------- */
window.addEventListener("DOMContentLoaded", () => {
  // auto-set endpoint field based on where the tool is hosted
  const autoEp = (location.hostname.endsWith(".vercel.app") || location.hostname.endsWith(".netlify.app") || location.hostname === "silverbullets1.github.io")
    ? "/api/ollama" : "http://localhost:11434";
  $("#endpoint").value = autoEp;
  state.endpoint = autoEp;
  loadPresets(); initVoice();
  $("#connectBtn").onclick = connect;
  $("#sendBtn").onclick = send;
  $("#openSide").onclick = openSide;
  $("#openSide2").onclick = openSide;
  $("#closeSide").onclick = closeSide;
  $("#scrim").onclick = closeSide;
  $("#newChat").onclick = () => {
    state.messages = [];
    $("#messages").innerHTML = '<div class="empty"><div class="orb">🔥</div><h2>New Chat</h2><p>Connected to your Ollama. Ask anything — uncensored.</p></div>';
  };
  $("#input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  });
  $("#input").addEventListener("input", autosize);
  $("#temp").oninput = (e) => { state.temp = parseFloat(e.target.value); $("#tempVal").textContent = e.target.value; };
  $("#system").oninput = (e) => { state.system = e.target.value; };
  $("#model").onchange = (e) => { state.model = e.target.value; $("#topModel").textContent = e.target.value; };
  $("#licenseBtn").onclick = activateLicense;
});
