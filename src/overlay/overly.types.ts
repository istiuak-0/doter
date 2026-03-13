import type { Component } from "vue";
import type { OverlayRef } from "./overlay-ref.service";

export interface OverlayOptions {
  top?: number;
  left?: number;
  anchor?: Element | null;
  data?: unknown;
}

export interface LiveInstance {
  id: string;
  component: Component;
  overlayRef: OverlayRef;
  options: OverlayOptions;
}

// Bus Events

export interface OverlayOpenEvent {
  id: string;
  component: Component;
  options: OverlayOptions;
  overlayRef: OverlayRef;
}

export interface OverlayBusEvents {
  "overlay:open": OverlayOpenEvent;
  "overlay:close": { id: string; data?: unknown };
}

export type Handler<T> = (event: T) => void;