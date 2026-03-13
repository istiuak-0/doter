import { attach } from 'iocraft';
import { ref } from 'vue';
import { markRaw } from 'vue';
import type { Component } from 'vue';
import Bus from './OverlayBus';
import type { OverlayOptions, OverlayRef, OverlayCloseResult } from './overly.types';

let _seq = 0;

@attach()
export class OverlayService {
  activeCount = ref(0);

  open(component: Component, options: OverlayOptions = {}): OverlayRef {
    const id = `overlay_${++_seq}`;

    const isVisible = ref(true);
    const el = ref<HTMLElement | null>(null);

    // The ref object that gets provided into the rendered component
    const overlayRef: OverlayRef = {
      id,
      options,
      data: options.data,
      isVisible,
      el,

      close(data?: unknown, trigger: OverlayCloseResult['trigger'] = 'component') {
        Bus.emit('overlay:close', { id, data, trigger });
      },

      update(patch: Partial<OverlayOptions>) {
        Bus.emit('overlay:update', { id, patch });
        // merge locally too so the ref stays fresh
        Object.assign(options, patch);
      },
    };

    Bus.emit('overlay:open', {
      id,
      component: markRaw(component),
      options,
      overlayRef,   // host will exposeCtx with this
    });

    this.activeCount.value++;
    return overlayRef;
  }

  close(id: string, data?: unknown) {
    Bus.emit('overlay:close', { id, data, trigger: 'api' });
  }

  closeAll() {
    Bus.emit('overlay:closeAll', {});
  }
}