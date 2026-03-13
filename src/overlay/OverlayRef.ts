import { attach } from 'iocraft'
import type { OverlayOptions } from './overly.types'

@attach()
export class OverlayRef {
  id!: string
  options!: OverlayOptions
  private closeHandlers = new Set<(data?: unknown) => void>()

  on(event: 'close', handler: (data?: unknown) => void) {
    this.closeHandlers.add(handler)
  }

  off(event: 'close', handler: (data?: unknown) => void) {
    this.closeHandlers.delete(handler)
  }

  close(data?: unknown) {
    this.closeHandlers.forEach((h) => h(data))
    this.closeHandlers.clear()
  }
}
