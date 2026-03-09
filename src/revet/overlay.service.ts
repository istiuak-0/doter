import { attach } from "iocraft"
import type { Component } from "vue"
import { OverlayRef } from "./overlay.ref"
import { overlayBus } from "./overlay.bus"


export interface DialogOptions {
  data?: Record<string, any>
  closeOnEscape?: boolean
  closeOnBackdrop?: boolean
  persistent?: boolean
  onBeforeClose?: () => boolean | Promise<boolean>
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  draggable?: boolean
  resizable?: boolean
  keepInViewport?: boolean
  enterAnimation?: string
  leaveAnimation?: string
  appendTo?: string | HTMLElement
  ariaLabelledBy?: string
}

@attach()
export class OverlayService {
  dialog(component: Component, options: DialogOptions = {}): OverlayRef {
    const id = crypto.randomUUID()

    overlayBus.emit({
      type: 'open',
      instance: { id, component, options }
    })

    return new OverlayRef(id)
  }
}