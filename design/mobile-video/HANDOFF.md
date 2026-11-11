# Matdo Grade mobile video handoff

## Request to give the next session

Build and integrate a portrait mobile version of the Matdo Grade introduction video on `/grade`. The current widescreen film is too small to comfortably watch on a phone. Use the existing story, artwork, app screenshots, and audio where practical, and recompose scenes so app details and captions are readable in portrait viewing. Preserve the existing desktop film and desktop website layout exactly.

This brief concerns the Grade introduction film. Matdo Check and its tutorial videos are outside this request.

## Workspace and current state

- Repository: `C:\Users\stanchan\Documents\GitHub-Matdo\matdolabllc.github.io`
- Stack: Astro, with static output for GitHub Pages.
- Local preview: `http://127.0.0.1:4321/grade`
- Commands: `npm run dev`, `npm run build`.
- There are existing uncommitted mobile layout changes. Preserve them and inspect the working tree before editing. Other sessions may also have changes in progress; do not revert, overwrite, or commit unrelated work.
- Desktop layout is frozen. Existing mobile refinements use a maximum width of **760 CSS pixels**.
- On phones, subject cards now show **four per row**, and feature cards show **two per row**. Preserve these choices.

## Proposed video specification

The previous session recommended this direction; use it as the starting production brief:

| Item | Target |
| --- | --- |
| Shape | 4:5 portrait |
| Master resolution | 1080 × 1350 pixels |
| Duration | Approximately the current one-minute film; retain a coherent story |
| Frame rate | Consistent frame rate; 30 fps is a reasonable export default |
| Primary playback file | MP4 with H.264 video; AAC audio if an audio track is present |
| Additional playback file | WebM fallback, consistent with the existing site |
| Poster | A matching 4:5 image that reads clearly at phone size |
| Captions | English WebVTT synchronized with the final edit |

At a 350-pixel display width, a 16:9 video is about 197 pixels tall, while 4:5 is about 438 pixels tall. The goal is to use that space for larger, legible content.

## Existing files to inspect

Paths below are relative to the repository root.

| Path | Role |
| --- | --- |
| `src/pages/grade.astro` | Grade page, hero video sources, poster, and caption track |
| `src/components/ProductHero.astro` | Shared hero component; currently gives `.demo-video` a 16:9 aspect ratio |
| `src/pages/check.astro` | Also uses the shared hero; preserve its behavior |
| `src/styles/global.css` | Shared theme and mobile breakpoint refinements |
| `public/demo/matdo-grade-film.mp4` | Existing desktop film, 1280 × 720 |
| `public/demo/matdo-grade-film.webm` | Existing desktop WebM |
| `public/demo/matdo-grade-film-poster.jpg` | Existing desktop poster |
| `public/demo/matdo-grade-film.vtt` | Current narration/caption reference |
| `public/demo/screens/grade-home.webp` | App home-screen reference |
| `public/demo/screens/grade-marks.webp` | App grading-screen reference |
| `public/demo/grade/` | Real homework examples and illustrations |
| `public/demo/grade/features/` | Existing feature illustrations |
| `public/demo/grade/subjects/` | Existing subject illustrations |
| `public/logos/matdo-grade-mark.png` | Grade product mark |
| `src/data/gradedSamples.ts` | Real example content and grading results |
| `src/pages/privacy/grade.astro` | Current privacy wording |

The desktop assets currently use the query string `?v=20261004-v4`. Leave those assets and their version references intact.

No Grade film production script was identified in this repository during this handoff. Inspect available sources and tools before assuming an editable project exists. If source artwork or a production project is missing, reuse available material where quality allows and clearly identify any missing inputs.

## Story and visual direction

Use the existing film and caption file as references for the sequence:

1. A parent faces homework without an answer key.
2. Photograph homework with Matdo Grade.
3. See answers that need another look.
4. Examine the correct answer and worked explanation.
5. Help the child understand and do the work independently.
6. Show the supported subject range.
7. Retain accurate privacy and free-trial messaging.
8. Close with the Grade mark and “For parents. By parents.”

Preserve the cream, forest-green, sage, and gold visual language and the warm family illustrations.

Recompose each shot for portrait space. Make the relevant app control or homework correction the focal point. Use one action per shot, generous text size, and enough time to read. Review captions at actual 320–430 CSS-pixel phone widths. Allow clear space for native playback controls and caption overlays.

Avoid stretching landscape footage or applying one fixed center crop to the whole film. Preserve faces, app controls, and meaningful homework marks. Rebuild compositions from source assets when cropping would lose information. Reuse existing audio where it matches the revised timing.

Keep all product and privacy claims consistent with the current site. The existing captions include privacy statements; check them against the current Grade privacy page before carrying them into the new edit. Do not invent capabilities, guarantees, or pricing.

## Deliverables

Create separate mobile assets; suggested names:

- `public/demo/matdo-grade-film-mobile.mp4`
- `public/demo/matdo-grade-film-mobile.webm`
- `public/demo/matdo-grade-film-mobile-poster.jpg`
- `public/demo/matdo-grade-film-mobile.vtt`

Save any production script, timeline, or editable composition created for the film in the repository, with a short explanation of how to regenerate the outputs and what dependencies it needs. Keep generated scratch files out of the final change.

## Website integration

- Show the portrait film at widths **760px and below**. Use the existing desktop film above that breakpoint.
- Make the mobile player use a 4:5 aspect ratio and the available content width.
- Scope changes to the Grade video. If the shared `ProductHero` needs an optional setting, preserve its existing default behavior and the Check page.
- Select the correct video, poster, captions, and fallback link together.
- Avoid downloading or autoplaying both mobile and desktop videos. Check source selection in the browser network panel.
- Preserve accessible labeling and the existing `controls`, `muted`, `autoplay`, `loop`, and `playsinline` behavior where supported. Test fullscreen playback.
- Handle rotation or breakpoint changes sensibly without unexpected audio or disruptive repeated restarts.
- Give new mobile assets a distinct cache version if using the existing query-string convention.
- Keep the desktop layout, film, poster, controls, captions, and surrounding spacing unchanged.

## Acceptance checks

- Preview the actual mobile film at 320, 360, 390, and 430 CSS-pixel widths, plus a phone in landscape orientation.
- Check that faces, controls, homework marks, and captions remain visible and readable throughout the film.
- Test playback, pause, seeking, fullscreen, inline playback, poster loading, and captions. Check iPhone Safari and Android Chrome when available; distinguish real-device checks from emulation.
- Verify there is no page-level horizontal overflow and that the player maintains 4:5 on mobile.
- Confirm the desktop video and page layout remain unchanged at 1024 and 1440 pixels.
- Confirm only the selected version loads; inspect requests, console errors, and media decoding failures.
- Run `npm run build` and `git diff --check`.
- Leave a phone-sized local preview open for review, ideally around 390 × 844 pixels.
- Report which assets were created, the final duration and file sizes, checks performed, and any unresolved limitations.

Create and preview the work locally. Publishing, pushing, and deployment are separate steps that this brief does not request.
