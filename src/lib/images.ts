/** Path to the smaller (800px) variant used in grids/cards, vs. the full-size original used in the hero and lightbox. */
export function thumbSrc(src: string): string {
  return src.replace(/(\.\w+)$/, '-thumb$1');
}
