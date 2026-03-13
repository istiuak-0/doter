import type { OverlayPosition, AnchorPlacement } from "./overly.types";

export function computePosition(
  el: HTMLElement,
  pos: OverlayPosition,
): { x: number; y: number } {
  const anchor = pos.anchor!;
  const rect = anchor.getBoundingClientRect();
  const ow = el.offsetWidth;
  const oh = el.offsetHeight;
  const ox = pos.offset?.x ?? 0;
  const oy = pos.offset?.y ?? 8; // 8px gap default

  const placement = pos.placement ?? "bottom-start";

  const map: Record<AnchorPlacement, { x: number; y: number }> = {
    top: { x: rect.left + rect.width / 2 - ow / 2, y: rect.top - oh - oy },
    "top-start": { x: rect.left, y: rect.top - oh - oy },
    "top-end": { x: rect.right - ow, y: rect.top - oh - oy },
    bottom: { x: rect.left + rect.width / 2 - ow / 2, y: rect.bottom + oy },
    "bottom-start": { x: rect.left, y: rect.bottom + oy },
    "bottom-end": { x: rect.right - ow, y: rect.bottom + oy },
    left: { x: rect.left - ow - ox, y: rect.top + rect.height / 2 - oh / 2 },
    right: { x: rect.right + ox, y: rect.top + rect.height / 2 - oh / 2 },
  };

  const { x, y } = map[placement];
  return {
    x: x + (pos.offset?.x ?? 0),
    y: y + (pos.offset?.y ?? 0),
  };
}
