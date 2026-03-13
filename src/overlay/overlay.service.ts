import { attach } from "iocraft";
import { ref } from "vue";
import { markRaw } from "vue";
import type { Component } from "vue";
import Bus from "./OverlayBus";
import type { OverlayOptions, OverlayRef } from "./overly.types";

@attach()
export class OverlayService {
  activeCount = ref(0);

  open(component: Component, options: OverlayOptions = {}): OverlayRef {
    const id = `overlay-${crypto.randomUUID()}`;
    const closeHandlers = new Set<(data?: unknown) => void>();

    const overlayRef: OverlayRef = {
      id,
      options,

      on(event, handler) {
        if (event === "close") closeHandlers.add(handler);
      },

      off(event, handler) {
        if (event === "close") closeHandlers.delete(handler);
      },

      close: (data?: unknown) => {
        Bus.emit("overlay:close", { id, data });
        closeHandlers.forEach((h) => h(data));
        closeHandlers.clear();
        this.activeCount.value++;
      },
    };

    Bus.emit("overlay:open", {
      id,
      component: markRaw(component),
      options,
      overlayRef,
    });

    this.activeCount.value++;
    return overlayRef;
  }
}
