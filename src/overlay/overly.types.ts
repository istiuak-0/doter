import type { Component, Ref } from "vue";

export interface OverlayOptions {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  anchor?: Element | null;
  data?: unknown;
}

export interface OverlayRef {
  readonly id: string;
  readonly options: OverlayOptions;
  on(event: "close", handler: (data?: unknown) => void): void;
  off(event: "close", handler: (data?: unknown) => void): void;
  close(data?: unknown): void;
}
