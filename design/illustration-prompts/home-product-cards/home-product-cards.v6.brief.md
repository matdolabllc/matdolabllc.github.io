# Round 6: small re-crop of the Check picture (brief for Codex)

`public/demo/home/check-devices.webp` (round 5) is live and approved. A reviewer noticed one
flaw: to the left of the iPhone, the iPad's row buttons are cut off mid-word, so fragments like
**"Che"** (from "Check Out") show between the "Check In" buttons and the iPhone's left edge, on
the Bennett, Harrison and Lu rows.

Please make `public/demo/home/check-devices-v2.webp` with that fixed. Change nothing else that
doesn't need changing. Same rules as always: real screenshot pixels only, with no retouching;
don't edit `src/`, and don't commit.

## Fix (choose whichever is cleanest; say which in the report)

- **A:** move the iPhone left, so its frame fully covers the iPad's "Check Out" button column
  on the visible rows, and no partial label shows. Keep all four counters (1 · 2 · 3 · 2)
  uncovered; move the iPhone down if needed.
- **B:** keep the iPhone where it is, but scale or offset the iPad screen so the visible rows
  end cleanly at a column boundary: either just after a whole "Check In" button, or with whole
  "Check Out" buttons fully visible.

Keep everything else from round 5: 1600 × 1000, background `#edf3ee`, frames, shadow, and the
"must read at 335 px" items ("Attendance Dashboard", the four counter numbers, at least two
names).

## Report back

Write `design/illustration-prompts/home-product-cards/home-product-cards.v6.report.md` **last**, after the image is
saved. Include:

- which option you chose;
- the placements;
- a check that no cut-off button label is visible anywhere;
- the 335 px check.
