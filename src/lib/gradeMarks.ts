/**
 * Where Matdo Grade draws its marks, ported from the iOS app so the sample
 * pages on the website look like the app's own result screen.
 *
 *  - Worksheets follow MarkLayout.swift: every ✓ / ✗ is 4 % of the page height,
 *    and the marks in one column share a margin just left of that column's
 *    leftmost answer box.
 *  - Essays follow EssayPageCanvas in EssayResultView.swift: one round badge in
 *    the left margin per paragraph note or spelling fix, pushed down the page
 *    just far enough that neighbours never overlap.
 *
 * Boxes come from the app's saved grade as fractions of the page, origin top
 * left. Everything returned is in the page image's own pixel space.
 */

export type Box = readonly [x: number, y: number, width: number, height: number];
export type Placed = { x: number; y: number; size: number };

const FONT_FRACTION = 0.04;
const GAP_FRACTION = 0.28;
const COLUMN_TOLERANCE = 0.18;
// The app measures SF Pro Heavy ✓ / ✗; these are close enough for layout.
const GLYPH_WIDTH = 0.8;
const GLYPH_HEIGHT = 1.2;

export function placeMarks(boxes: readonly Box[], W: number, H: number): Placed[] {
  const size = H * FONT_FRACTION;
  const gap = size * GAP_FRACTION;
  const halfW = (size * GLYPH_WIDTH) / 2;
  const halfH = (size * GLYPH_HEIGHT) / 2;
  const px = boxes.map(([x, y, w, h]) => ({ x: x * W, y: y * H, w: w * W, h: h * H }));
  const centreY = (b: (typeof px)[number]) =>
    Math.min(Math.max(b.y + b.h / 2, halfH), Math.max(halfH, H - halfH));

  // Cluster into columns by left edge, so a two-column page keeps two margins.
  const columns: number[][] = [];
  for (const i of px.map((_, i) => i).sort((a, b) => px[a].x - px[b].x)) {
    const last = columns[columns.length - 1];
    if (last && px[i].x - Math.min(...last.map((j) => px[j].x)) <= COLUMN_TOLERANCE * W) last.push(i);
    else columns.push([i]);
  }

  const placed: (Placed | undefined)[] = new Array(px.length);
  for (const column of columns) {
    const x = Math.min(...column.map((j) => px[j].x)) - gap - halfW;
    if (x - halfW < 0) continue; // no room in the margin: placed one by one below
    for (const j of column) placed[j] = { x, y: centreY(px[j]), size };
  }

  return placed.map((p, i) => {
    if (p) return p;
    const b = px[i];
    let x = b.x - gap - halfW;
    if (x - halfW < 0 && b.x + b.w + gap + 2 * halfW <= W) x = b.x + b.w + gap + halfW;
    x = Math.min(Math.max(x, halfW), Math.max(halfW, W - halfW));
    return { x, y: centreY(b), size };
  });
}

/** Stroked ✓ / ✗ centred on (0, 0) — paths rather than text, which not every font has. */
export function markPaths(result: "correct" | "incorrect", s: number): string[] {
  const p = (x: number, y: number) => `${(x * s).toFixed(1)} ${(y * s).toFixed(1)}`;
  return result === "correct"
    ? [`M${p(-0.4, 0.02)} L${p(-0.1, 0.32)} L${p(0.42, -0.36)}`]
    : [`M${p(-0.3, -0.3)} L${p(0.3, 0.3)}`, `M${p(0.3, -0.3)} L${p(-0.3, 0.3)}`];
}

/**
 * Margin badges for an essay page, in the order the boxes were given. Like the
 * app, pass paragraph notes first and spelling fixes after; the badges are then
 * sorted down the page and spaced out.
 */
export function placeEssayNotes(boxes: readonly Box[], W: number, H: number): Placed[] {
  const size = H * 0.028;
  const spacing = size * 1.85;
  const margin = size * 1.1;
  const order = boxes
    .map(([x, y, , h], i) => ({ i, x: Math.max(margin * 0.6, x * W - margin), y: (y + Math.min(h, 0.04) / 2) * H }))
    .sort((a, b) => a.y - b.y);

  const placed: Placed[] = new Array(boxes.length);
  let lastY = -Infinity;
  for (const c of order) {
    const y = Math.max(c.y, lastY + spacing);
    lastY = y;
    placed[c.i] = { x: c.x, y, size };
  }
  return placed;
}
