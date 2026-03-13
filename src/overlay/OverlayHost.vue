<script setup lang="ts">
import { reactive, computed } from 'vue';
import { exposeCtx } from 'iocraft';
import Bus from './OverlayBus';
import type { OverlayOptions, OverlayRef } from './overly.types';

interface LiveInstance {
  id: string;
  component: any;
  overlayRef: OverlayRef;
  options: OverlayOptions;
  observer?: ResizeObserver;
}

const map = reactive<Record<string, LiveInstance>>({});
const instances = computed(() => Object.values(map));

Bus.on('overlay:open', (payload: any) => {
  map[payload.id] = {
    id: payload.id,
    component: payload.component,
    overlayRef: payload.overlayRef,
    options: payload.options,
  };
});

Bus.on('overlay:close', (payload: any) => {
  map[payload.id]?.observer?.disconnect();
  setTimeout(() => delete map[payload.id], 300);
});

function onMount(el: HTMLElement | null, inst: LiveInstance) {
  if (!el) return;
  exposeCtx(inst.overlayRef);
  if (inst.options.anchor) {
    const observer = new ResizeObserver(() => applyPosition(el, inst.options));
    observer.observe(inst.options.anchor);
    observer.observe(el);
    inst.observer = observer;
    applyPosition(el, inst.options);
  }
}

function applyPosition(el: HTMLElement, options: OverlayOptions) {
  const rect = options.anchor!.getBoundingClientRect();
  el.style.position = 'fixed';
  el.style.top = `${rect.bottom + (options.top ?? 0)}px`;
  el.style.left = `${rect.left + (options.left ?? 0)}px`;
}
</script>

<template>
  <Teleport to="body">
    <template v-for="inst in instances" :key="inst.id">
      <div :ref="(el) => onMount(el as HTMLElement, inst)">
        <component :is="inst.component" />
      </div>
    </template>
  </Teleport>
</template>