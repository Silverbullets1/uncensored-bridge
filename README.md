# 🔓 Uncensored Bridge

**Your Model · Your Hardware · We Host Nothing.**

A 100% client-side web UI that connects **directly from your browser** to **your own Ollama** instance (local or cloud). No backend, no database, no logs, no censorship filter.

> Bring Your Own Model. We just connect.

---

## ✨ Why this instead of Open WebUI / LibreChat?

| Feature | Uncensored Bridge | Open WebUI | LibreChat |
|---------|-------------------|------------|-----------|
| Backend server needed | ❌ None | ✅ Docker | ✅ Node |
| Can admin read your chats? | ❌ Impossible (no server) | ⚠️ Yes by default | ⚠️ Yes |
| Hosting cost to you | $0 (static) | Server cost | Server cost |
| Uncensored models | ✅ Built-in presets | Manual | Manual |
| Mobile (PWA) | ✅ Add to Home Screen | ⚠️ Web only | ⚠️ Web only |
| Your compute / RAM | ✅ Yours | Server's | Server's |

**Unique angle:** privacy by *architecture*. Because there is no server, nobody — not even us — can log, read, or censor your conversations.

---

## 🚀 Quick Start (3 ways)

### Option A — Local Ollama (Desktop, Chrome/Edge/Firefox)

```bash
# 1. Install Ollama → https://ollama.com/download
# 2. Allow browser CORS (required!)
export OLLAMA_ORIGINS="*"      # Linux/Mac
# Windows (PowerShell):
$env:OLLAMA_ORIGINS="*"
# 3. Start + pull an uncensored model
ollama pull qwen3-4b-65k       # or any abliterated/dolphin model
ollama serve                   # if not already running
# 4. Open the tool (local file or your deployed URL) → Connect → Chat 🔥
```

> ⚠️ **Safari / iPhone:** `localhost` over HTTP from an HTTPS page is **blocked** by WebKit. Use Option B (cloud) or the iOS tunnel trick below.

---

### Option B — Free Cloud Ollama (Render / Railway) — works on iPhone ✅

One-click deploy your own Ollama to a free tier (RAM-limited → use 1B–4B models):

- **Render:** use `render.yaml` in this repo → connect GitHub → deploy. You get a `https://your-ollama.onrender.com`.
- **Railway:** `railway up` with the included `Dockerfile`.
- Point the tool's **Endpoint** at that URL (must be HTTPS for iOS).

> Free tiers ~512MB–2GB RAM → stick to `llama3.2:1b`, `qwen3:4b-abliterated`, or `dolphin-2.9`.

---

### Option C — iOS / iPhone with your HOME Ollama (HTTPS tunnel)

Expose your local Ollama over HTTPS so iPhone Safari can reach it:

```bash
# On your desktop (where Ollama runs):
ollama serve
cloudflared tunnel --url http://localhost:11434
# Copy the https://*.trycloudflare.com URL → paste into the tool on your phone.
```

Then open the tool on iPhone → **Add to Home Screen** → it behaves like a native app.

---

## 🧠 Recommended Uncensored Models

Abliterated models remove refusal behavior but can lose a little quality. For best results use **Dolphin fine-tunes** or **abliterated Qwen3**:

```bash
ollama pull qwen3-4b-65k            # fast, uncensored (used by presets)
ollama pull dolphin-llama3:8b       # stronger, trained uncensored
ollama pull llama3.2:1b             # tiny, for free cloud tiers
```

Presets shipped: **Lucifer (Hinglish)**, **Dolphin**, **Uncensored Coder**, **Roleplay**.

---

## 🔧 Deploy the Tool Yourself (optional)

It's just static files. Host anywhere free:

- **Vercel / Netlify / GitHub Pages:** push this repo → auto-deploys.
- **Your VPS:** `python3 -m http.server 8080` in this folder.

No environment variables, no secrets.

---

## 💎 Freemium (roadmap)

| Tier | Price | Includes |
|------|-------|----------|
| **Free** (forever) | $0 | BYO model, chat, presets, voice, PWA |
| **Pro** (future) | $5 / device | Premium personas, multi-Ollama swarm, browser tool-use, cloud sync |

Free tier is **serverless by design** and will never be paywalled — that is the core privacy promise. Pro adds convenience features via a hosted license endpoint.

---

## 🛡️ Privacy

- Zero backend. All requests go **browser → your Ollama**.
- No analytics, no cookies, no storage of chat content on our side.
- Your Ollama URL + key live only in your browser's localStorage.

---

## 📄 License

MIT — see [LICENSE](LICENSE).
