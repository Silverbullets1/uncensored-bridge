FROM ollama/ollama:latest
# Expose Ollama API; set OLLAMA_ORIGINS=* via render.yaml env for browser CORS.
EXPOSE 11434
CMD ["ollama", "serve"]
