import type { Component } from "vue"
import type { DialogOptions } from "./overlay.service"

export interface OverlayInstance {
  id: string
  component: Component
  options: DialogOptions
}


type OverlayEvent =
  | { type: 'open';  instance: OverlayInstance }
  | { type: 'close'; id: string; result?: any }

const listeners = new Set<(event: OverlayEvent) => void>()

export const overlayBus = {
  emit(event: OverlayEvent) {
    listeners.forEach(l => l(event))
  },
  on(listener: (event: OverlayEvent) => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)   // cleanup
  }
}