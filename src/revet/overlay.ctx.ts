import { attach } from "iocraft"

@attach()
export class OverlayContext<T = any> {
  id!: string
  data!: T

  #close!: (result?: any) => void

  // called by DialogWrapper to wire it up before exposing
  _init(id: string, data: T, close: (result?: any) => void) {
    this.id = id
    this.data = data
    this.#close = close
  }

  close(result?: any) {
    this.#close(result)
  }
}