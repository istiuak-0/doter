import { attach, obtainNew } from 'iocraft'
import { ref } from 'vue'
import { markRaw } from 'vue'
import type { Component } from 'vue'
import Bus from './OverlayBus'
import type { OverlayOptions } from './overly.types'
import { OverlayRef } from './OverlayRef'

@attach()
export class OverlayService {
  private openMap = new Map<Component, OverlayRef>()

  open(component: Component, options: OverlayOptions = {}): OverlayRef {
    const overlayRef = obtainNew(OverlayRef)
    overlayRef.id = `overlay-${crypto.randomUUID()}`
    overlayRef.options = options

    const emit = overlayRef.close.bind(overlayRef)
    overlayRef.close = (data?: unknown) => {
      this.openMap.delete(component)
      Bus.emit('overlay:close', { id: overlayRef.id, data })
      emit(data)
    }

    this.openMap.set(component, overlayRef)
    Bus.emit('overlay:open', {
      id: overlayRef.id,
      component: markRaw(component),
      options,
      overlayRef,
    })

    return overlayRef
  }

  toggle(component: Component, options: OverlayOptions = {}): OverlayRef | null {
    if (this.openMap.has(component)) {
      this.openMap.get(component)!.close()
      return null
    }
    return this.open(component, options)
  }

  get count() {
    return this.openMap.size
  }
}
