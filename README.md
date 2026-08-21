<div align="center">

# 🔓 Uncensored Bridge

### *Your Model · Your Hardware · We Host Nothing.*

**A 100% client-side chat UI that connects your browser straight to your own Ollama.**
**No backend. No database. No logs. No censorship. No limits.**

[![MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Static](https://img.shields.io/badge/type-100%25%20static-blue.svg)](.)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](.)

</div>

---

## 🚀 Why Uncensored Bridge?

Big AI chat apps **read your chats**, **censor your prompts**, and **rent you compute** you already own.
Uncensored Bridge flips the model:

| | 🔓 This Tool | Open WebUI | LibreChat |
|--|-------------|------------|-----------|
| Backend server | ❌ None | ✅ Docker | ✅ Node |
| Can anyone read your chats? | ❌ **Impossible** (no server) | ⚠️ Admins can | ⚠️ Admins can |
| Your RAM / CPU used | ✅ Yours | Server's | Server's |
| Censorship | ❌ None | Manual | Manual |
| Mobile (PWA) | ✅ Native-like | ⚠️ Web | ⚠️ Web |
| Cost to run | **$0 forever** | Server bill | Server bill |

> 🔑 **Unique by architecture:** because there is literally no server, nobody — not us, not any admin — can log, read, or filter what you type. Privacy isn't a setting here. It's impossible to break.

---

## ✨ Features

- 🔥 **Uncensored when pointed at an uncensored model** — ships with Hinglish "Lucifer", Dolphin, Coder & Roleplay presets (pick an abliterated/dolphin model to go fully uncensored)
- 🧠 **Bring Any Model** — point it at your Ollama, pick any model you pulled
- 📱 **PWA** — "Add to Home Screen" on iOS/Android, feels like a native app
- 🎤 **Voice input** — speak to your model (WebSpeech)
- 💡 **Thinking display** — watch Qwen3 reason in real time
- 💎 **Freemium ready** — free forever; Pro license hooks built in for future tiers
- 🛡️ **Zero telemetry** — no analytics, no cookies, no storage of your chats

---

## 📖 FULL WALKTHROUGH (new user, start to finish)

### Scenario 1 — You just want to USE it (hosted by someone)
```
1. Open the demo UI in any browser (no signup, client-only): https://sage-dragon-13a69a.netlify.app
   → tap ⚙ (gear) → change Endpoint to YOUR OWN Ollama (e.g. http://your-ip:11434 or http://localhost:11434) → Connect
2. Tap ⚙ (top-left gear) → Settings
3. Endpoint is auto-filled (/api/ollama on hosted versions)
4. Tap "Connect"
5. Model dropdown populates → pick one (e.g. sadiq-bd/llama3.2-1b-uncensored)
6. Optional: pick a Persona (Lucifer / Dolphin / Coder / RP)
7. Type a message → Send → chat 🔥
```
No install, no signup. iPhone: open in Safari → Share → "Add to Home Screen".

### Scenario 2 — Deploy YOUR OWN (recommended for privacy)

**Step A: Get Ollama running (your machine or free cloud)**
```bash
# Local (desktop):
ollama.com/download
export OLLAMA_ORIGINS="*"        # allow browser to talk to it
ollama pull sadiq-bd/llama3.2-1b-uncensored   # uncensored by default
ollama serve

# OR free cloud (Render: use included render.yaml / Railway: Dockerfile)
# → you get an HTTPS URL like https://you.onrender.com
```

**Step B: Deploy the tool (pick one):**

**Netlify (best, HTTPS works on iPhone):**
1. Fork `github.com/Silverbullets1/uncensored-bridge`
2. netlify.com → Add new site → Import from Git → your fork
3. Build command: *(blank)* · Publish dir: `.`
4. Site settings → Environment variables → Add:
   - Key: `OLLAMA_URL`
   - Value: `https://your-ollama-url`  ← YOUR Ollama (HTTPS)
5. Deploys → Trigger deploy
6. Open `https://yoursite.netlify.app` → tool auto-uses `/api/ollama` ✅

**Vercel:**
1. Import repo → Framework `Other` · Build *(blank)* · Output `.`
2. Add env `OLLAMA_URL` = your Ollama HTTPS URL
3. Deploy → tool auto-uses `/api/ollama`

**GitHub Pages / any static host:**
1. Enable Pages on your fork
2. Open tool → ⚙ → set Endpoint = your Ollama URL (HTTPS for iPhone)
3. Plain HTTP Ollama? Open tool over HTTP too (mixed-content block on HTTPS)

**Your own VPS (host the UI only — do NOT serve models publicly):**
```bash
cd uncensored-bridge && python3 serve.py
# open http://your-ip:8080 → set Endpoint = YOUR OWN Ollama URL
# Run Ollama on localhost:11434 on THIS same machine, or point to your
# PRIVATE Ollama. ⚠️ Never expose :11434 to 0.0.0.0 — anyone can burn your GPU/compute.
```

**Step C:** Open your deployed tool → Connect → pick model → chat 🔥

### Scenario 3 — Local dev (tool + Ollama both local)
```bash
ollama serve
# another terminal:
cd uncensored-bridge && python3 serve.py
# open http://localhost:8080 → auto endpoint localhost:11434 → Connect
```

---

## 🔧 How It Works (architecture)

```
┌─────────────┐      fetch       ┌──────────────┐
│  Your Browser │ ──────────────▶ │  Your Ollama  │
│  (the tool)   │  (client-only)  │  (your model) │
└─────────────┘                  └──────────────┘
       │
       │  if hosted on HTTPS (Netlify/Vercel):
       │  /api/ollama/*  ──▶ serverless proxy ──▶ your Ollama URL
       │  (proxy reads OLLAMA_URL env, forwards request)
       └─  no logs, no storage, request passthrough only
```

- **The tool is 100% static** — HTML/CSS/JS only, no server code bundled.
- **The optional proxy** (`api/ollama.js`) is a thin pass-through. It reads `OLLAMA_URL` from **your** deploy's env vars. We never see your traffic.
- **Your endpoint + license** live only in your browser's `localStorage`.

---

## ❓ Troubleshooting

| Problem | Fix |
|---------|-----|
| `failed` on Connect (HTTPS tool) | `OLLAMA_URL` env not set, or it's HTTP — use HTTPS Ollama / tunnel |
| `failed` on Connect (local tool over HTTPS page) | Safari/iOS blocks localhost HTTP — use cloud Ollama or tunnel |
| Models don't load / slow first response | Model cold-loading on CPU (~20s). Wait, or set `OLLAMA_KEEP_ALIVE=-1` |
| `fetch failed` from proxy | `OLLAMA_URL` env missing/wrong on your deploy |
| Voice button missing | Browser lacks WebSpeech (use Chrome/Edge/Safari) |
| Mixed-content error | Tool HTTPS but Ollama HTTP — wrap with proxy or use HTTP tool |

---

## 🧠 Best Uncensored Models

```bash
ollama pull qwen3:4b-abliterated     # fast, uncensored
ollama pull dolphin-llama3:8b        # stronger, trained uncensored
ollama pull sadiq-bd/llama3.2-1b-uncensored   # tiny + uncensored, for free cloud tiers
```

---

## 💎 Freemium Roadmap

| Tier | Price | Includes |
|------|-------|----------|
| **Free** (forever) | $0 | BYO model · chat · presets · voice · PWA |
| **Pro** (future) | $5 / device | Premium personas · multi-Ollama swarm · browser tool-use · cloud sync |

Free tier stays serverless and **never paywalled** — that is the core privacy promise. Pro adds convenience only.

---

## 🛡️ Privacy

- Zero backend. Every request goes **browser → your Ollama** (or your proxy → your Ollama).
- No analytics, no cookies, no server-side storage of conversations.
- The proxy function stores **nothing** — it forwards and forgets.

---

## 🤝 Contributing

PRs welcome! Add a persona, a UI tweak, a deploy template. Keep it **client-only**.

## 📄 License

[MIT](LICENSE) © Silverbullets1

---

Developed by [**Entouraged.sam**](https://github.com/LegendGod01)
