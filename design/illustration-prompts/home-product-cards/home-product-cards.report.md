# Home product cards — Codex report

Both assets are ready for Claude to review and connect to the home page. No `src/` files were edited and no commit was made.

| Output | Dimensions | Bytes |
|---|---|---|
| `public/demo/home/check-card.webp` | 1600 × 1000 | 50,682 |
| `public/demo/home/grade-card.webp` | 1600 × 1000 | 32,328 |

Both use WebP quality 82, the specified flat backgrounds, matching near-black rounded bezels, and soft shadows. No added captions or UI. All screen content is resized directly from the specified screenshots using Sharp, with no image generation or redrawing.

## Sources and crops

Source rectangles submitted to resizing (x, y, w, h):

- `public/demo/check/sync/ipad-records.webp`: (0, 0, 1400, 978), resized to 1200 × 838. Frame starts at (80, 210), with a 12 px bezel. Canvas clipping leaves the first 778 resized screen rows, equivalent to source y=0 through approximately 908. The overlapping phone also covers part of its lower right.
- `public/demo/check/sync/iphone-records.webp`: (0, 0, 600, 1305), resized to 330 × 718. Frame starts at (1190, 320), with a 12 px bezel. Canvas clipping leaves the first 668 resized screen rows, equivalent to source y=0 through approximately 1214.
- `public/demo/screens/grade-marks.webp`: (0, 0, 600, 1304), resized to 510 × 1108. Frame starts at (533, 80), with a 12 px bezel. Canvas clipping leaves the first 908 resized screen rows, equivalent to source y=0 through approximately 1069, immediately below the grading summary.

## Visual QA and deviation

Rendered both final WebPs to 500 × 313 PNG previews and inspected them visually. Check shows the title, four counters, and several name/time rows. The smallest counter labels remain small; names and times are distinguishable. Grade shows all five green checks and both orange crosses, with the summary at the bottom. Worksheet handwriting remains small at this display size, but the colored marks are distinguishable.

The Grade width and crop requirements conflict: a 760 px-wide screenshot puts source y=1060 more than 1340 px below its top. A 1000 px canvas cannot show that plus the title without distortion. I prioritized retaining the title, complete worksheet, all marks, and summary, using a 510 px screen width. Please review whether you prefer sacrificing the title/summary for a larger worksheet crop. No student name appears on the Grade worksheet. Check uses the existing repository demo names unchanged.

Old images remain in place. Ready for your page wiring, edge-to-edge styling, alt text updates, and browser review.
