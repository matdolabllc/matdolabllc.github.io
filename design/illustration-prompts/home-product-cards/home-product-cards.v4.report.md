# Grade devices — round 4 report

Complete and ready for Claude to review and connect to the page.

## Output

`public/demo/home/grade-devices.webp`: 1600 × 1000 pixels, 55,156 bytes, WebP quality 82. Background #f3eede. Check image unchanged. No src edits or commit.

## Sources, crops, and placements

- iPad: `public/demo/screens/grade-ipad.png`, full source rectangle (0, 0, 1668, 2420), resized proportionally to 524 × 760 pixels. Frame top-left (390, 80), overall size 548 × 784, screen top-left (402, 92).
- iPhone: `public/demo/screens/grade-marks.webp`, full source rectangle (0, 0, 600, 1304), resized proportionally to 330 × 717 pixels. Frame top-left (880, 190), overall size 354 × 741, screen top-left (892, 202). Overlaps the iPad's right side by 58 pixels; both devices fit inside the canvas.
- Frames match Check: 12px #1a2422 bezels, radius 40px for iPad and 44px for iPhone, screenshot corner masks 12px smaller. Shadow #1d3b34 at 18% opacity, 16px down, Sharp blur sigma 20 (roughly 40px visual spread).
- No screenshot cropping apart from matching rounded screen corners. Status bars, title bars, and bottom buttons retained. Original purple arrows remain.

## Generation

None. Deterministic composition from the real screenshots using Sharp; no UI, text, marks, or data generated, redrawn, or inpainted.

## 500px check

Resized the final WebP to 500 × 313 pixels and visually inspected the preview. All five green checks and both orange crosses are visible on each device. The iPhone marks are small but their colors and positions remain distinguishable. Both devices show the same decimals worksheet and grading result. No student name appears.

## Differences

Used the specified portrait alternative for the iPad (760px screen height), placing the phone at x=880 to overlap that narrower portrait device. Kept the specified y positions. No other changes. Both full source screens are retained.

Please review, wire the image into the Grade tile, and leave any further revision brief here. This report was written after saving and inspecting the output.
