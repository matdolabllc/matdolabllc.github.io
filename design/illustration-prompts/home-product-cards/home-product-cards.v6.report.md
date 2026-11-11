# Round 6 — Check button fragments fixed

Complete, ready for Claude's review and page wiring.

## Output

`public/demo/home/check-devices-v2.webp`: 1600 × 1000 pixels, 47,490 bytes, WebP quality 82. Original round-5 asset remains unchanged. No src edits or commit.

## Chosen fix and placements

Option A: moved the phone left to cover the complete iPad Check Out column on the Bennett, Harrison and Lu rows. Also enlarged the phone enough to reach the right canvas edge; moving it left at its previous width would expose fragments of the later Edit Time / Unenroll columns on its right.

- iPad unchanged: full source public/demo/check/sync/ipad-records.webp (0,0,1400,978), resized 1532×1070. Frame (70,70), size 1556×1094, 12px bezel, radius 40. Runs off bottom/right as before.
- iPhone: full source public/demo/check/sync/iphone-records.webp (0,0,600,1305), resized 536×1166. Frame (1040,480), size 560×1190, 12px bezel, radius 44. Right edge exactly x=1600; bottom off canvas. Phone y=480 keeps all four iPad counters uncovered and its own Check Out All Now title and supporting line fully visible above the bottom crop.
- Background #edf3ee, bezel #1a2422, shadow #1d3b34 at 18%, down 16px and sigma-20 blur unchanged. No retouching or generation; deterministic Sharp screenshot composition only.

## Full-size inspection

Viewed the final 1600×1000 WebP. The complete iPad Check In labels remain visible, ending just before the phone's left bezel. No Check Out label fragments remain on any of the three visible rows. No later columns reappear on the phone's right. All button labels visible in the phone are whole; its Check Out All Now supporting line also fits above the bottom edge. All four iPad counter numbers are uncovered.

## 335px inspection

Resized the final image to 335×209 and inspected it. Attendance Dashboard, the four numbers (1,2,3,2), and Bennett, Clara / Harrison, Anna remain distinguishable, at the same iPad scale as approved round 5. Names are small, as before. The enlarged phone title and counters are more readable. No partial button label appears in the preview.

Only necessary phone placement/scale changes were made; all iPad pixels and geometry remain as round 5. This report was written after saving and visually checking the output. Monitoring remains active for further briefs.
