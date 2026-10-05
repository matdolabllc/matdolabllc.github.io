"""Render the link-preview cards in card.html to public/og/*.jpg (1200x630).

These are the og:image / twitter:image cards iMessage, Slack, etc. show when a
matdolab.com link is shared. Run from the repo root after `npm install`:

    python design/share-cards/render.py
"""
import os
import pathlib
import shutil
import subprocess
import tempfile

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parents[2]
TEMPLATE = ROOT / "design" / "share-cards" / "card.html"
OUT = ROOT / "public" / "og"
VARIANTS = ["grade", "check", "site"]
CHROME_CANDIDATES = [
    os.environ.get("CHROME", ""),
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    shutil.which("google-chrome") or "",
    shutil.which("chromium") or "",
]


def chrome() -> str:
    for c in CHROME_CANDIDATES:
        if c and pathlib.Path(c).exists():
            return c
    raise SystemExit("Chrome/Edge not found; set CHROME=/path/to/chrome")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    browser = chrome()
    with tempfile.TemporaryDirectory() as tmp:
        for v in VARIANTS:
            png = pathlib.Path(tmp) / f"{v}.png"
            subprocess.run(
                [
                    browser,
                    "--headless=new",
                    "--disable-gpu",
                    "--hide-scrollbars",
                    "--allow-file-access-from-files",
                    "--force-device-scale-factor=1",
                    "--window-size=1200,630",
                    "--virtual-time-budget=3000",
                    f"--screenshot={png}",
                    f"{TEMPLATE.as_uri()}?v={v}",
                ],
                check=True,
                capture_output=True,
            )
            img = Image.open(png).convert("RGB")
            assert img.size == (1200, 630), img.size
            dest = OUT / f"{v}.jpg"
            img.save(dest, "JPEG", quality=88, optimize=True, progressive=True)
            print(f"{dest.relative_to(ROOT)}  {dest.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
