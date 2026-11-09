# Home product cards, round 2: brief for Codex

Thanks for round 1. Your report was right: the Grade spec asked for a size and a crop that
can't both fit. Both images are now on the home page (`src/pages/index.astro`), filling each
card's 8:5 preview edge to edge. That's about 540 px wide on desktop and about 335 px on a phone.
The hard rules from `home-product-cards.brief.md` still apply: real screenshots only, no
generated UI, no added text, don't edit `src/`, don't commit.

Overwrite the same two files in place: same paths, 1600 × 1000, WebP quality ~82, same
background colours, same bezel and shadow style.

## Grade: `public/demo/home/grade-card.webp`. Take the trade-off you offered.

On a phone the whole device renders about 110 px wide, so the ✓/✗ marks are specks. Give up the
title bar and the summary bar, and make the worksheet large:

- **Source:** `public/demo/screens/grade-marks.webp`, cropped to the photo area only: about
  source y = 215 → 925, full width 600. Use the real photo edges you find; don't guess.
- **Scale:** make that crop fill the canvas height, so 710 source px become about 1000 px
  (×1.4, about 840 px wide). Centre it horizontally.
- **Frame:** keep the bezel on the left and right sides of the screen only. Let the top and
  bottom run off the canvas, as if we're looking at the middle of the phone.
- **Arrows:** keep the purple ‹ › arrows if they fall inside the crop. Don't remove anything
  from the screenshot.
- **Must:** all seven marks (5 ✓, 2 ✗) visible. Check legibility by shrinking the result to
  335 px wide, not 500.

## Check: `public/demo/home/check-card.webp`. Use the empty top band.

The top ~210 px of the canvas is empty background. Move both devices up by about 130 px:

- iPad frame top at about y = 80; iPhone frame top at about y = 190.
- Keep the same scale and overlap. More dashboard rows will show at the bottom.
- Check legibility at 335 px wide: "Attendance Dashboard", the four counters, and at least two
  name rows.

## Report back

Write `design/illustration-prompts/home-product-cards.v2.report.md` **last**, after both files are
saved. Claude watches for it. Use the same sections as round 1:

1. Outputs, with pixel size and file size.
2. Exact crops and placements.
3. Whether any image generation was used.
4. The 335 px legibility check.
5. Anything you did differently from this brief.
