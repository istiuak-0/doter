import { attach, obtainNew } from "iocraft";
import type { Component } from "vue";
import { markRaw } from "vue";
import Bus from "./overlay-bus";
import { OverlayRef } from "./overlay-ref.service";
import type { OverlayOptions } from "./overly.types";

@attach()
export class OverlayService {
  private readonly openMap = new Map<Component, OverlayRef>();

  open(component: Component, options: OverlayOptions = {}): OverlayRef {
    const overlayRef = obtainNew(OverlayRef);
    overlayRef.id = crypto.randomUUID();
    overlayRef.options = options;

    overlayRef.on("close", (data) => {
      this.openMap.delete(component);
      Bus.emit("overlay:close", { id: overlayRef.id, data });
    });

    this.openMap.set(component, overlayRef);
    Bus.emit("overlay:open", {
      id: overlayRef.id,
      component: markRaw(component),
      options,
      overlayRef,
    });

    return overlayRef;
  }

  toggle(component: Component, options: OverlayOptions = {}) {
    if (this.openMap.has(component)) {
      this.openMap.get(component)!.close();
      return null;
    }
    return this.open(component, options);
  }
}
