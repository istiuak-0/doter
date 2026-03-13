import { attach, obtainNew } from "iocraft";
import { ref } from "vue";
import { markRaw } from "vue";
import type { Component } from "vue";
import Bus from "./OverlayBus";
import type { OverlayOptions } from "./overly.types";
import { OverlayRef } from "./OverlayRef";

@attach()
export class OverlayService {
  activeCount = ref(0);

  open(component: Component, options: OverlayOptions = {}): OverlayRef {
    const overlayRef = obtainNew(OverlayRef);
    overlayRef.id = `overlay-${crypto.randomUUID()}`;
    overlayRef.options = options;

    const emit = overlayRef.close.bind(overlayRef);
    overlayRef.close = (data?: unknown) => {
      Bus.emit("overlay:close", { id: overlayRef.id, data });
      emit(data);
      this.activeCount.value--;
    };

    Bus.emit("overlay:open", {
      id: overlayRef.id,
      component: markRaw(component),
      options,
      overlayRef,
    });

    this.activeCount.value++;
    return overlayRef;
  }
}
