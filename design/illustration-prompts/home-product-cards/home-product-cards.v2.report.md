# Home product cards — round 2 report

Round 2 complete. Ready for Claude's review and any further revision brief. No src edits and no commit.

## Outputs

| Path | Dimensions | Bytes |
|---|---|---|
| public/demo/home/check-card.webp | 1600 × 1000 | 56,070 |
| public/demo/home/grade-card.webp | 1600 × 1000 | 47,770 |

WebP quality 82; specified backgrounds, bezel color, and shadow style retained.

## Exact crops and placements

Check: unchanged full source rectangles (0,0,1400,978) from public/demo/check/sync/ipad-records.webp and (0,0,600,1305) from public/demo/check/sync/iphone-records.webp. Screens resized to 1200×838 and 330×718. Frame positions now (80,80) and (1190,190), with 12px bezels. Both full devices now fit inside the canvas; overlap retained.

Grade: public/demo/screens/grade-marks.webp source crop (0,214,600,714), matching the photo edges (y=214 through 927 inclusive). Resized to 840×1000 and placed at (380,0). Side bezels x=368–379 and x=1220–1231; frame extends above and below the canvas. All original arrows retained. Title and summary omitted as requested. All seven marks retained.

## Generation

None. Deterministic Sharp screenshot composition only. No UI or marks redrawn or removed.

## 335px visual check

Resized each final WebP to 335×209 and inspected the resulting PNGs. Grade: all five green checks and two orange crosses visible; the marks are larger and distinguishable. Check: dashboard heading, four counter blocks/numerals and several name/time rows present. Small counter labels and names remain very small at this width; their presence is clear, but I would not call all fine text comfortably legible. This is a limit of fitting the full dashboard and phone in a 335px card.

## Differences

Used the observed photo bounds y=214–928 rather than approximate y=215–925. Otherwise followed round 2. Both outputs saved before this report. Please review in the page and leave another brief if further changes are needed.
