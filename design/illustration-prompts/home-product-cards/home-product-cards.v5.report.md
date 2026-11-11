# Round 5 — outputs ready; legibility review needed

Both requested new assets are saved. Earlier images remain unchanged. No src edits or commit.

## Outputs

| Output | Pixels | Bytes |
|---|---|---|
| public/demo/home/check-devices.webp | 1600 × 1000 | 47,072 |
| public/demo/home/grade-feedback.webp | 1600 × 1000 | 107,000 |

WebP quality 82, specified flat backgrounds, 12px #1a2422 bezel, radii 40/44, screenshot masks 28/32, shadow #1d3b34 at 18%, down 16px, Sharp blur sigma 20.

## Exact sources and placements

Check iPad: public/demo/check/sync/ipad-records.webp, full (0,0,1400,978), resized to 1532×1070, frame (70,70,1556,1094). Canvas clips bottom and right. This uses the requested approximately 1.1× screenshot scale, but preserves the original full width before canvas clipping so all four counter numbers remain present. The suggested x=0–1060 source crop would remove the fourth counter.

Check iPhone: public/demo/check/sync/iphone-records.webp, full (0,0,600,1305), resized 400×870, frame (1130,500,424,894), canvas clips bottom. Moved down from y=210 to avoid covering the fourth dashboard counter.

Grade iPad: design/screenshots/grade-ipad-detail-essay.png, exact crop (0,700,1668,1300), resized 1124×876, frame (70,50,1148,900). Shows the full-width feedback region and essay strips. Handwritten Name: Leo line is completely excluded. First name in actual feedback remains as authorized.

Grade iPhone: public/demo/screens/grade-marks.webp, full (0,0,600,1304), resized 330×717, frame (1130,230,354,741). Purple arrows retained. Small overlap at iPad right edge.

## Image generation

None. All screen pixels are real screenshot crops/resizes, composed deterministically with Sharp. No text, UI, or marks generated or retouched.

## 335px inspection

Created and visually inspected 335×209 previews of both final WebPs.

Check: Attendance Dashboard, all four numbers (1,2,3,2), Bennett, Clara and Harrison, Anna are distinguishable, though the names remain small. Enlarging more would require losing dashboard content or changing the 8:5 composition.

Grade: the green checks and orange crosses are visible on the phone, but tiny. The feedback remains structured real text; however, Evaluation and Paragraph by paragraph are too small for comfortable reading at 335px. I do NOT consider this must-read requirement fully satisfied. Keeping the full 1668px source width in a roughly 1124px screen gives these small source headings only a few pixels of height after downscaling the entire image to 335px.

## Differences and next review

Check deviations (full source width, lower phone) preserve the four counters that the suggested crop/overlap would otherwise hide. Grade follows the proposed crop and 900px frame height, but that geometry conflicts with the must-read target at 335px. Please review and choose whether the next round may crop much tighter to Evaluation/Paragraph by paragraph, or whether larger page display dimensions are preferable. Both assets are available for browser review; do not treat this report as a claim that all legibility targets passed.

Stanley requested continuous checking for future rounds. A five-minute recurring check is now active in this Codex chat, so new briefs will be picked up without another manual prompt. Write future briefs and their named report paths in this directory. This report was written last, after both assets were saved and inspected.
