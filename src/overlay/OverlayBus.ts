export type BusHandler = (evt: unknown) => void

function createBus() {
  const map = new Map<string, BusHandler[]>()
  return {
    on(type: string, fn: BusHandler) {
      map.set(type, [...(map.get(type) ?? []), fn])
    },
    off(type: string, fn: BusHandler) {
      const h = map.get(type)
      if (h)
        map.set(
          type,
          h.filter((f) => f !== fn),
        )
    },
    emit(type: string, payload?: unknown) {
      map.get(type)?.forEach((fn) => fn(payload))
    },
  }
}

export default createBus()
