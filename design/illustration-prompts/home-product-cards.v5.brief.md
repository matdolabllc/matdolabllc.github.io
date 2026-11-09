# Device pictures, round 5: readable Check, new Grade feedback (brief for Codex)

An independent review of the home page said two things about the "Works on the iPad and iPhone
you already have" section:

- **Check:** the dashboard in `check-card.webp` is too small to read at card size (about
  540 px wide on desktop, 335 px on a phone).
- **Grade:** `grade-devices.webp` repeats the worksheet the visitor has just used in the demo
  above, so it adds nothing. It should show something new: Matdo Grade's **written feedback**.

Make two new images. **Don't overwrite** the round-2 and round-4 files. Same hard rules as
always: real screenshot pixels only, with nothing generated, redrawn, inpainted or retouched.
Don't edit `src/` and don't commit.

## Shared spec (same as the earlier rounds)

| | |
|---|---|
| Size | 1600 × 1000, WebP quality ~82, under 200 KB |
| Frames | bezel `#1a2422`, 12 px; iPad radius 40, iPhone radius 44; screen corners 12 px smaller |
| Shadow | `#1d3b34` at 18% opacity, 16 px down, about 40 px visual blur |
| Text | none added |
| Check | shrink each result to **335 px** wide and look; anything named as "must read" below must still be readable there |

## Image A: `public/demo/home/check-devices.webp` (background `#edf3ee`)

**Goal:** a close-up you can actually read, not the whole dashboard shrunk down.

- **iPad:**
  - Source: `public/demo/check/sync/ipad-records.webp` (1400 × 978, landscape).
  - Show only its **top-left part**: about x = 0 → 1060, y = 0 → 760 in source pixels. That
    covers the status bar, "Records / Add New / Export", "Attendance Dashboard", the date, the
    four counters, "Check Out All Now", and the first 2–3 name rows.
  - Scale that region to about **1160 px wide**, about 1.1×. The earlier image was about
    0.86×.
  - Place the frame at left ≈ 70, top ≈ 70. Let the frame and screen run off the **bottom and
    right** edges of the canvas, as if we're looking at the top-left corner of a larger iPad.
    Only the top and left frame edges are visible.
- **iPhone:**
  - Source: `public/demo/check/sync/iphone-records.webp` (600 × 1305).
  - Scale the full screen to about **400 px wide**.
  - Place it at left ≈ 1130, top ≈ 210, overlapping the iPad, with its bottom running off
    the canvas.
- **Must read at 335 px:**
  - "Attendance Dashboard";
  - the four counter numbers (1, 2, 3, 2);
  - at least two names (for example "Bennett, Clara").

## Image B: `public/demo/home/grade-feedback.webp` (background `#f3eede`)

**Goal:** show what makes Grade valuable, the written feedback on a child's writing, with math
marks on the second device.

- **iPad (portrait):**
  - Source: `design/screenshots/grade-ipad-detail-essay.png` (1668 × 2420, captured by Claude
    from the real app on the iPad simulator).
  - It shows the essay **feedback sheet**: "Assessed against", "What Leo writes",
    "Evaluation", and "Paragraph by paragraph".
  - Crop vertically to about source y = 700 → 2000 (the feedback sheet plus a strip of the
    essay above and below it). Keep the full width.
  - Scale so the iPad frame is about **900 px tall**. Place it centre-left at top ≈ 50, and
    let it run off the bottom if needed.
- **iPhone:**
  - Source: `public/demo/screens/grade-marks.webp` (600 × 1304, the real graded math worksheet).
  - About **330 px wide**, overlapping the iPad's lower-right corner, top ≈ 230.
- **Must read at 335 px:** the headings "Evaluation" and "Paragraph by paragraph", and the ✓/✗
  marks on the iPhone. The body text can be small, but its lines should look like real
  sentences, not noise.
- **Privacy:** the student's first name "Leo" appears in the sheet's title and in the feedback
  text. That's acceptable, because the website already shows this essay's feedback with the
  same name. **Don't** include the handwritten "Name: Leo" line from the top of the essay page;
  the crop above already excludes it. Say in the report whether any of it is still visible.

## Report back

Write `design/illustration-prompts/home-product-cards.v5.report.md` **last**, after both images
are saved. Use the same sections as before:

1. The outputs, with pixel size and file size.
2. The exact crops and placements.
3. Whether any image generation was used.
4. The 335 px "must read" check for each image.
5. Anything you did differently from this brief.
