"""Soften the busy room behind the How it works illustrations.

Keeps the people, the homework and the device sharp (hand-placed ellipses on
the cropped 800x600 frame) and blurs and fades everything else (plants,
frames, shelves, lamp, mugs) into the section's band colour, #f3eede.
Usage: python soften.py <src_dir> <out_dir>
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

BAND = (243, 238, 222)
JOBS = {
    # crop box in the source, then shapes kept sharp in the 800x600 output
    "capture": ((50, 10, 790, 565), [
        ("e", (325, -30, 590, 250)),   # mother's head
        ("e", (295, 170, 735, 450)),   # mother's arms and phone
        ("e", (110, 115, 345, 330)),   # boy's head
        ("e", (55, 250, 360, 470)),    # boy's body
        ("e", (130, 400, 660, 640)),   # worksheet and pencil
    ]),
    "review": ((60, 40, 800, 595), [
        ("e", (270, 0, 560, 430)),     # mother
        ("e", (115, 105, 340, 320)),   # boy's head
        ("e", (35, 250, 385, 470)),    # boy's body
        ("e", (430, 240, 800, 510)),   # tablet
        ("e", (40, 390, 460, 580)),    # notebook
    ]),
}

src, out = Path(sys.argv[1]), Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
for name, (box, shapes) in JOBS.items():
    im = Image.open(src / f"{name}.webp").convert("RGB").crop(box).resize((800, 600), Image.LANCZOS)
    back = im.filter(ImageFilter.GaussianBlur(14))
    back = Image.blend(back, Image.new("RGB", im.size, BAND), 0.72)
    mask = Image.new("L", im.size, 0)
    d = ImageDraw.Draw(mask)
    for _, xy in shapes:
        d.ellipse(xy, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(28))
    soft = Image.composite(im, back, mask)
    soft.save(out / f"{name}-soft.webp", "WEBP", quality=86, method=6)
    print(name, (out / f"{name}-soft.webp").stat().st_size)
