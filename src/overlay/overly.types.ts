import type { Component, Ref } from 'vue';

export type AnchorPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'right';

export interface OverlayPosition {
  /** Absolute viewport coords — used when no anchor is given */
  x?: number;
  y?: number;
  /** Anchor element — overlay positions relative to this */
  anchor?: Element | null;
  /** Where to place relative to anchor (default: 'bottom-start') */
  placement?: AnchorPlacement;
  /** Offset in px from the computed position */
  offset?: { x?: number; y?: number };
}

export interface OverlayOptions {
  // ── positioning ─────────────────────────────────
  position?: OverlayPosition;

  // ── behaviour ───────────────────────────────────
  backdrop?: boolean;          // default false
  closeOnBackdrop?: boolean;   // default true
  closeOnEsc?: boolean;        // default true
  zIndex?: number;             // default managed by host

  // ── data passed to the component ────────────────
  data?: unknown;

  // ── lifecycle ───────────────────────────────────
  onClose?: (result: OverlayCloseResult) => void;
  onOpen?: () => void;
}

export interface OverlayCloseResult {
  data?: unknown;
  trigger: 'api' | 'backdrop' | 'esc' | 'component';
}

// ── OverlayRef — the context object injected into rendered components ──

export interface OverlayRef {
  readonly id: string;
  readonly options: OverlayOptions;
  readonly data: unknown;
  readonly isVisible: Ref<boolean>;
  /** The root element of the overlay container (available after mount) */
  readonly el: Ref<HTMLElement | null>;
  /** Close and pass a result back to onClose() */
  close(data?: unknown, trigger?: OverlayCloseResult['trigger']): void;
  /** Patch options while the overlay is open (e.g. reposition) */
  update(patch: Partial<OverlayOptions>): void;
}

// ── What travels on the bus ──

export interface BusOpenPayload {
  id: string;
  component: Component;
  options: OverlayOptions;
}

export interface BusClosePayload {
  id: string;
  data?: unknown;
  trigger: OverlayCloseResult['trigger'];
}

export interface BusUpdatePayload {
  id: string;
  patch: Partial<OverlayOptions>;
}