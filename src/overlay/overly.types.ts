import { OverlayRef } from './OverlayRef'

export interface OverlayOptions {
  top?: number
  left?: number
  bottom?: number
  right?: number
  anchor?: Element | null
  data?: unknown
}

export interface LiveInstance {
  id: string
  component: any
  overlayRef: OverlayRef
  options: OverlayOptions
}
