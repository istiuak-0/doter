import { overlayBus } from "./overlay.bus"


export class OverlayRef {
  constructor(public readonly id: string) {}

  close(result?: any) {
    overlayBus.emit({ type: 'close', id: this.id, result })
  }

  on(event: 'close', handler: (result?: any) => void) {
    return overlayBus.on((e) => {
      if (e.type === 'close' && e.id === this.id) handler(e.result)
    })
  }
}