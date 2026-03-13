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

  private refs = new Map<string, OverlayRef>();
  private toggleMap = new Map<Component, string>();

  open(component: Component, options: OverlayOptions = {}): OverlayRef {
    const overlayRef = obtainNew(OverlayRef);
    overlayRef.id = `overlay-${crypto.randomUUID()}`;
    overlayRef.options = options;

    const emit = overlayRef.close.bind(overlayRef);

    overlayRef.close = (data?: unknown) => {
      Bus.emit("overlay:close", { id: overlayRef.id, data });
      emit(data);
      this.refs.delete(overlayRef.id);
      this.activeCount.value--;
    };

    this.refs.set(overlayRef.id, overlayRef);
    Bus.emit("overlay:open", {
      id: overlayRef.id,
      component: markRaw(component),
      options,
      overlayRef,
    });

    this.activeCount.value++;
    return overlayRef;
  }

  toggle(component: Component, options: OverlayOptions = {}): OverlayRef | null {
    const existingId = this.toggleMap.get(component);
    if (existingId && this.refs.has(existingId)) {
      this.refs.get(existingId)!.close();
      this.toggleMap.delete(component);
      return null;
    }
    const ref = this.open(component, options);
    this.toggleMap.set(component, ref.id);
    return ref;
  }
}


