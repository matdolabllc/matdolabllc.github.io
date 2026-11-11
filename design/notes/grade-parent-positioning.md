# Grade parent positioning: local review handoff

Prepared on `codex/grade-parent-positioning`; the user authorized committing and publishing the approved website revision to main.

## Delivered P0

- Hero title: “Matdo Grade”. Supporting copy uses “your student’s finished homework” as requested. Supporting founder line remains “For Parents. By Parents.”
- Primary CTA opens a real graded example. The App Store badge is currently inactive, so the page explicitly states download availability instead of advertising a browser upload flow.
- Real decimal worksheet is the default example, with original/annotated pages and an enlarged answer comparison using the existing Detailed-mode output for question 12.
- Reading plus passage is the next example; context pages and an answer without a located mark are explained. Existing sample detail and multipage controls remain available.
- Three workflow steps explain capture, review, and another attempt. Review guidance distinguishes a worked explanation from knowledge of a child’s reasoning.
- Eight accessible FAQ disclosures cover answer keys, multipage/context, handwriting, reviewing uncertain results, subjects, teachers, deletion and processing.
- Existing fonts, palette, subject cards, pricing and original desktop advertisement at every width are preserved. Shared hero changes are conditional on the new headline prop.

## Claim checks

| Claim | Existing evidence | Limit reflected in copy |
| --- | --- | --- |
| No answer key or assignment setup | Native capture and `GeminiService.swift` grading flow | Questions, instructions and reference material must be included. |
| Handwriting and page marks | Native result models, `MarkValidation.swift`, `AutoAnnotatedResultView.swift`; existing worksheet fixture | Marks require known positions; unplaced answers remain in details. |
| Multipage and context pages | `GeminiService.swift` multipage flow; four-page reading fixture | Readable, complete context matters; context pages consume units. |
| Answers and worked explanations | Existing graded sample rows; question 12 correct steps | A possible error explanation does not establish the child’s actual reasoning. |
| Another attempt | Review and paper revision are already possible | `Regrade.swift` uses the same capture and charges a new grade; automatic correction tracking is not claimed. |
| Local deletion and Google processing | Existing Grade privacy policy and Previous Grading flow | Backups, exports and downstream handling are separate from local deletion. |

Samples are existing Matdo outputs, not testimonials or an accuracy benchmark. No exclusivity or universal accuracy claims were added.

## Validation

- Production Astro build passed after the final anchor-spacing fix.
- Browser preview checked at 320, 360, 390, 430, 768, 1024 and 1440 pixel viewport overrides: no document horizontal overflow; sample panes stack on phones and remain side by side on larger screens.
- Original desktop WebM selected on phone and desktop. Video markup and pricing data match the pre-change source; no media assets were modified.
- Primary example anchor clears fixed navigation. Keyboard Enter opens sample details, question details and FAQ disclosure.
- Four-page reading navigation works; question 10 remains accessible in details without an on-page mark.
- Matdo Check production hero/title/video geometry matches the baseline at 1440 pixels. No warning/error console logs observed during these checks.
- Mobile checks used browser viewport emulation, not physical iOS devices. Native app behavior was inspected but not changed or retested.
- Screenshots are under the app workspace: `output/build/grade-positioning/` (desktop hero/example, mobile hero/example/worked answer).
- Production preview: http://127.0.0.1:4322/grade. The pre-existing development server on 4321 was left running.

## Separate P1 follow-up

Native result reliability should be a separate patch. `MarkResult.swift` currently maps unknown/empty values to incorrect; an explicit review-needed state requires a supported data contract and end-to-end handling, not a relabelled spelling mark. Existing unplaced-result presentation already preserves grading details. A correction comparison flow would need explicit capture/history semantics; Re-grade must not be presented as tracking corrected paper automatically.

Files changed: `src/pages/grade.astro`, `src/components/ProductHero.astro`, `GradedSamples.astro`, `GradeFeatures.astro`; new `GradeWorkflow.astro` and `GradeFAQ.astro`, plus this handoff.

## Illustrated workflow revision

Three generated illustrations replace the text-heavy workflow cards, with short captions and expandable review tips. Assets: `public/demo/grade/workflow/capture.webp`, `review.webp`, `retry.webp`, each 800 by 600, approximately 80 KB. These are illustrative scenes, not actual app screenshots; authentic grading examples remain in the preceding section. Built-in image generation was used with the existing parent-iPad illustration as a style reference.

Prompt set: matching warm watercolor/gouache storybook scenes in cream, sage, teal and gold; the same mother in a cream sweater and student in a green hoodie. Capture: photograph completed paper homework with a phone. Review: compare tablet grading marks and a worked answer with the paper. Retry: student revises the original paper while the parent supports. Targeted edits filled the initial worksheet answers and ensured 9 times 5 equals 45, with the incorrect 54 crossed out rather than marked correct.

Orientation revision: all physical worksheet handwriting faces the student rather than the viewer. The capture phone is tilted toward the table with the rear camera facing the worksheet and the screen facing the parent; tablet demonstrations remain viewer-facing. Targeted built-in image edits preserve the original people, palette and scene. Replaced assets retain 800 by 600 optimized WebP output.

Final user edits: section heading is “How it works”; introduction is “Take a photo of the finished homework; see the marks on the iPad.” Review tips are three bullets in a disclosure; the workflow Re-grade sentence was removed. Build and diff checks passed before publication.
