# Home page product-card images — brief for Codex

Two new images for the product cards at the top of the home page (`src/pages/index.astro`, the
`.product-preview` boxes). Today those cards show a nearly empty kiosk screen (Check) and two
phones shrunk to 144 px wide, where the grading marks can't be seen (Grade).

## Hard rule: real screens only

Build both images **by compositing the app's real screenshots** that are already in this repo.
Do not generate, redraw, or invent any app UI, text, names, numbers, or marks. Image generation
may be used only for the plain device frames and soft shadows, if at all. Everything shown on a
device screen must be a pixel crop of the source file named below.

## Shared spec (both images)

| | |
|---|---|
| Size | 1600 × 1000 px (8:5), exported as WebP, quality ~82, under 180 KB |
| Background | Full-bleed flat colour, no gradient, no texture. Check `#edf3ee`, Grade `#f3eede` |
| Device frame | Same style on both: near-black bezel `#1a2422`, rounded corners, thin; no buttons, no notch drawn on top of the screenshot's own notch |
| Shadow | One soft drop shadow under each device, `rgb(29 59 52 / 0.18)`, ~40 px blur, ~16 px down |
| Angle | Flat, straight-on. No perspective tilt, no 3-D |
| Text | None added. No captions, logos, badges, or arrows |
| Safe area | Keep important content at least 80 px inside every edge; the card crops slightly on phones |

## Image 1: Check card → `public/demo/home/check-card.webp`

**Message:** a busy, real front desk on iPad, also on iPhone.

- **Main device:** an iPad (landscape) showing `public/demo/check/sync/ipad-records.webp`
  (1400 × 978; the Attendance Dashboard). Make it about 1200 px wide, left of centre, with its
  bottom edge running off the bottom of the canvas by about 15%. That makes the rows bigger than
  the full screen would allow.
- **Second device:** an iPhone showing `public/demo/check/sync/iphone-records.webp` (600 × 1305),
  about 330 px wide. It overlaps the iPad's lower-right corner and also runs off the bottom edge.
  It says "the same records on every device."
- At display size (about 500 px wide), these must still be readable: "Attendance Dashboard", the
  four coloured counters (In Class, Already Done, Not Present, Unenrolled), and at least two name
  rows with times.
- `public/demo/check/tour/records.webp` is the identical iPad screenshot; either file works.

## Image 2: Grade card → `public/demo/home/grade-card.webp`

**Message:** a photo of paper homework, marked right and wrong. The marks must be obvious.

- **Single device:** an iPhone showing `public/demo/screens/grade-marks.webp` (600 × 1304; the
  "Graded" screen with green ✓ and orange ✗ on a decimals worksheet).
- Scale the phone up so it is about 760 px wide, centred horizontally. Crop it with the canvas:
  - **Top:** show the top of the phone, including the "Graded" title bar.
  - **Bottom:** let the canvas cut it off just below the "✓ 5 ✗ 2 · 7 graded" summary bar,
    near y ≈ 1060 of the source.
  - That way the worksheet and its marks fill most of the image.
- At display size, the ✓ and ✗ marks must be clearly visible and distinguishable. Check this by
  shrinking the result to 500 px wide.
- The worksheet shows no student name. Keep it that way: crop out anything that could identify a
  child.

## Hand-back

Put both files at the paths above and leave the old images in place. Do not edit any file under
`src/`, and do not commit.

**Report back** by writing `design/illustration-prompts/home-product-cards.report.md` **last**,
after both images are saved. Claude watches for that file. It should cover:

1. The two output paths, each with its pixel size and file size.
2. The exact source files and crop rectangles used, as x, y, w, h in source pixels.
3. Whether any image generation was used, and for what. It should be frames or shadows only.
4. Whether the ✓/✗ marks and the Check names are legible at 500 px wide, and how you checked.
5. Anything you couldn't do, or did differently from this brief, and why.

Claude will then switch
`src/pages/index.astro` to the new files, remove the card padding and border so the images run
edge to edge, and update the alt text:

- Check: "Matdo Check's attendance dashboard on iPad, with the same records on iPhone"
- Grade: "A photographed math worksheet in Matdo Grade, marked with green checks and orange crosses"
