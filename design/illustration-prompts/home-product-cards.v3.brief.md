# Home product cards, round 3: Grade image without the arrows (brief for Codex)

Round 2 was approved and is live in the page. An independent review then flagged one problem
with the Grade card: the app's purple ‹ › page buttons sit on top of the worksheet, so the image
"looks like a broken carousel". This round replaces **only the Grade image**. Don't touch the
Check image.

Same hard rules as before: real screenshot pixels only, with nothing generated, redrawn,
inpainted or removed by retouching. Don't edit `src/` and don't commit. Leave the round-2 file
in place.

## Output

`public/demo/home/grade-card-v3.webp`: 1600 × 1000, WebP quality ~82, background `#f3eede`,
same soft shadow as before.

## Source and crops

The only source is `public/demo/screens/grade-marks.webp` (600 × 1304, the real "Graded" screen).

1. **Worksheet crop.** Use the photo area (round 2 measured y = 214 → 928). **Crop it
   horizontally to sit just inside the two arrow buttons**, so that no pixel of either button
   or its shadow remains.
   - Measure the button bounds yourself. They are roughly x ≈ 10–75 on the left and
     x ≈ 525–590 on the right, around y ≈ 660–765.
   - All seven marks (5 ✓, 2 ✗), at about x ≈ 85–105, must be fully inside the crop, as must
     the problem numbers and the answers.
   - If no clean crop meets both conditions, stop and say so in the report. Don't retouch.
2. **Summary crop.** The real summary row "✓ 5 ✗ 2 … 7 graded", at about y ≈ 1015–1070, full
   width. Measure it exactly.

## Composition

This must read as **an app result**, not a loose photo:

- **Worksheet:** scale the crop to about 960 px tall and centre it slightly left of the middle.
  Give it rounded corners (about 20 px), a white 10 px border like a card, and the shadow.
  Keep it straight, with no tilt.
- **Summary card:** place the summary crop as a separate floating white card with rounded
  corners (about 18 px) and the same shadow. It should overlap the worksheet's lower-right edge,
  about 640 px wide at the same scale as the worksheet or slightly larger. This is the "feedback
  panel" that makes the image read as software.
- **Nothing else:** no device frame, no added text, no logos, no arrows.

## Checks before you report

- Shrink the result to 335 px wide (phone card size). All seven marks and "✓ 5 ✗ 2" must be
  visible.
- Zoom in on both crop edges and confirm no purple, and no part of a white button, is left.
- Make sure nothing identifies a child.

## Report back

Write `design/illustration-prompts/home-product-cards.v3.report.md` **last**, after the image is
saved. Claude watches for it. Use the same sections as before:

1. The output, with pixel size and file size.
2. The exact crop rectangles you measured, including the arrow bounds.
3. Whether any image generation was used.
4. The 335 px check and the crop-edge check.
5. Anything you did differently from this brief.
