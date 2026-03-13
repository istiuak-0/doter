import { Handler, OverlayBusEvents } from "./overly.types";

type EventKey = keyof OverlayBusEvents;

class OverlayBus {
  private readonly handlers = {
    "overlay:open": [] as Handler<any>[],
    "overlay:close": [] as Handler<any>[],
  };

  on<K extends EventKey>(key: K, fn: Handler<OverlayBusEvents[K]>): void {
    this.handlers[key].push(fn);
  }

  off<K extends EventKey>(key: K, fn: Handler<OverlayBusEvents[K]>): void {
    const list = this.handlers[key];
    const idx = list.indexOf(fn);
    if (idx !== -1) list.splice(idx, 1);
  }

  emit<K extends EventKey>(key: K, payload: OverlayBusEvents[K]): void {
    [...this.handlers[key]].forEach((fn) => fn(payload));
  }
}

export default new OverlayBus();
