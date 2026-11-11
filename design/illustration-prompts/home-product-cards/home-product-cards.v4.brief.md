# Home page images, round 4: Grade on iPad and iPhone (brief for Codex)

## Round 3 is cancelled

Don't make `grade-card-v3.webp`, and don't write the v3 report. The home page no longer has
product cards, so that image has nowhere to go. If you've already started, stop. Leave any file
you made in place and Claude will tidy up.

## What changed on the page

The cards were replaced by a section called "Works on the iPad and iPhone you already have",
with one tile per app:

- **Check tile:** uses your round-2 `public/demo/home/check-card.webp` (iPad and iPhone). It's
  approved and stays as it is.
- **Grade tile:** currently shows only the real iPhone "Graded" screen in a phone frame drawn by
  the page. It needs a matching **iPad and iPhone** picture, in the same style as the Check
  image.

## ▶ Unblocked: the iPad source is ready

`public/demo/screens/grade-ipad.png` now exists. It's 1668 × 2420, **portrait**, captured on
2026-11-08 by Claude from the real Matdo Grade app running on the iPad Pro 11-inch (M5)
simulator. It shows the Graded screen for the same Oct 3, 3:49 PM decimals result that
`grade-marks.webp` shows on iPhone.

Same hard rules as before: real screenshot pixels only, with nothing generated, redrawn or
inpainted. Don't crop away the status bar, the title bar or the bottom buttons; use the whole
screen.

Since it's portrait, use the portrait placement below.

## Once the source exists

Output `public/demo/home/grade-devices.webp`, 1600 × 1000, WebP quality ~82. It should be laid
out exactly like `check-card.webp`, so the two tiles read as a pair:

- **Background:** `#f3eede`.
- **Frames:** the same bezel colour `#1a2422`, corner radius, bezel width and shadow as
  `check-card.webp`.
- **iPad (landscape or portrait, whichever the screenshot is):**
  - Source: `public/demo/screens/grade-ipad.png`.
  - Size and position: about 1200 px wide, frame top at about y = 80, left of centre.
  - If it's portrait, use about 760 px tall and centre it slightly left instead.
- **iPhone:**
  - Source: `public/demo/screens/grade-marks.webp` (600 × 1304).
  - Size and position: about 330 px wide, frame top at about y = 190, overlapping the iPad's
    lower-right corner, as on the Check image.
  - The app's purple ‹ › arrows are acceptable at this small size; don't remove them.
- **Text:** none added.
- **Check:** shrink the result to 500 px wide and confirm the ✓/✗ marks are visible on both
  devices.

## Report back

Write `design/illustration-prompts/home-product-cards/home-product-cards.v4.report.md` **last**, after the image is
saved. Use the same sections as before:

1. The output, with pixel size and file size.
2. The crops and placements.
3. Whether any image generation was used.
4. The 500 px check.
5. Anything you did differently from this brief.
