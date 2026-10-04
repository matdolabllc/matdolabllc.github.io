# Matdo Grade portrait film

The locally integrated mobile advertisement is 60 seconds, 4:5, and 30 fps. The master is 1080 × 1350; website copies are 720 × 900. The original desktop media and shared ProductHero component are preserved.

## Playback assets

Files are in `public/demo/`, version `20261004-mobile-v1`:

| File | Size | Format |
| --- | ---: | --- |
| matdo-grade-film-mobile.mp4 | 3,020,714 bytes | H.264 High / AAC, fast start |
| matdo-grade-film-mobile.webm | 2,592,447 bytes | VP9 / Opus |
| matdo-grade-film-mobile-poster.jpg | 68,821 bytes | 4:5 opening image |
| matdo-grade-film-mobile.vtt | 1,034 bytes | English captions |

The master is saved locally in the advertisement repository at `Marketing/build/mobile-film/matdo-grade-film-mobile-master.mp4` (13,567,478 bytes). Generated masters, temporary audio, and preview images are excluded from Git.

## Edit and visual decisions

`render-mobile.cjs` is the editable canvas composition. `timeline-mobile.json` records timing, scene crops, source hashes, and copy. Family artwork is cropped separately for each scene, preserving faces and hands. The marked homework and Show Detail control use the real app screenshot. The correct-steps card appears at 22 seconds, after the explanation caption finishes. Mobile captions wrap naturally, with a smaller cue font below 360px. The worked-answer comparison is redrawn at a larger size with the same calculation: −6.3 + (−0.12) = −6.42.

Subject cards accumulate in reading order: Math at 36s, English at 38s, Science at 40s, and Essays at 42s. The portrait arrangement uses two columns so each card remains readable. Family shots have a small camera movement; cards flip in individually; concluding scenes use short dissolves. Key text sits above the native caption and control region.

The approved Voice A uses Kokoro `af_heart` at speed 0.94. The original procedural 120 BPM music and synthesized effects are retained and ducked under narration. Privacy narration now says “Saved on your device. We don’t store your homework.” The image also states that Google processes grading. This follows `src/pages/privacy/grade.astro`, sections 3, 4, and 7, and avoids implying homework is never processed outside the device. Paid-plan wording and the free-trial closing are preserved.

## Website integration

`src/components/GradeVideo.astro` owns one player and switches the video sources, poster, captions, and fallback link together. It selects the mobile version at 760 CSS pixels and below, and the unchanged desktop assets above that width. Sources initially have no URL, preventing both films from being downloaded at page load. Source changes preserve playback position, pause state, mute/volume, and caption preference; changes are deferred during fullscreen. A replaced caption track prevents old cues from lingering. The portrait aspect ratio is scoped to the Grade component. Check and the shared hero component were not edited for this task.

## Rebuild

Requirements:

- Node.js and `@napi-rs/canvas` (set `CODEX_NODE_MODULES` to the package directory if it is not at the bundled runtime path).
- FFmpeg/FFprobe on PATH with H.264, VP9, AAC, and Opus encoders. The default picture encoder is NVIDIA `h264_nvenc`; set `VIDEO_ENCODER=libx264` for software rendering.
- Python with packages from `requirements-narration.txt` and the previously selected Kokoro model files: `kokoro-v1.0.fp16.onnx` and `voices-v1.0.bin`. Models are local dependencies and are not copied into Git.
- The sibling advertisement checkout `matdo-grade/Marketing`: original anchor frames in `anchor-frames/direction-a/`, fonts, `assets/screens/marks.png`, and `build/film/source/compose_audio.py`. The product mark is in that checkout’s `MatdoGrade/Assets.xcassets/MatdoMark.imageset/`. The kitchen clean plate is saved here at `assets/kitchen.png`, so it does not depend on a scratch file.

From this directory, using the Python environment with the narration dependencies:

```powershell
$env:VIDEO_ENCODER = 'libx264' # Optional when NVIDIA encoding is unavailable.
python build-mobile.py --models C:\path\to\models --marketing C:\path\to\matdo-grade\Marketing --node C:\path\to\node.exe
```

The default work directory is ignored `design/mobile-video/build/`; the output directory is `public/demo/`. Override these with `--work` and `--output`. `render-mobile.cjs --preview` creates review stills and a phone-sized contact sheet. `export-mobile.py --input MASTER.mp4 --output DIRECTORY` re-exports an existing master and its adjacent VTT without synthesizing narration.

## Verification

`master-verification-mobile.json` records 1,800 frames, exactly 60 seconds, full decoding without errors, fast-start MP4 layout, −14.11 LUFS integrated audio, and −1.37 dB true peak. `web-verification-mobile.json` records both website formats passing resolution, duration, audio-rate, and full decoding checks. `browser-verification-mobile.json` records responsive playback checks in the Codex Chromium browser.

Phone-width checks cover 320, 360, 390, and 430 CSS pixels; landscape and desktop checks cover 844 × 390, 1024, and 1440. Review includes captions, pause/play, seeking, fullscreen, poster and fallback selection, selected-version requests, and page overflow. Desktop media hashes and shared hero source are checked against the starting copies. Website production build and whitespace checks are run after integration. Real iPhone Safari and Android Chrome devices are unavailable here; those checks remain a device validation step before publishing.
