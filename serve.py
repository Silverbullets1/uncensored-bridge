#!/usr/bin/env python3
"""Threaded static server for Uncensored Bridge — handles parallel browser
requests (index.html + app.js + presets.json + streaming) without blocking."""
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = int(os.environ.get("PORT", "8080"))
ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".js": "application/javascript",
        ".json": "application/json",
        ".svg": "image/svg+xml",
        ".webmanifest": "application/manifest+json",
    }

    def log_message(self, fmt, *args):
        pass  # quiet


if __name__ == "__main__":
    os.chdir(ROOT)
    httpd = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    print(f"Serving Uncensored Bridge on 0.0.0.0:{PORT}")
    httpd.serve_forever()
