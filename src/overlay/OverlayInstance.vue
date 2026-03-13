<!-- OverlayInstance.vue -->
<script setup lang="ts">
import { exposeCtx } from 'iocraft';
import type { OverlayOptions, OverlayRef } from './overly.types';

interface LiveInstance {
  id: string;
  component: any;
  overlayRef: OverlayRef;
  options: OverlayOptions;
  observer?: ResizeObserver;
}

const props = defineProps<{ inst: LiveInstance }>();

exposeCtx(props.inst.overlayRef);

function onMount(el: HTMLElement | null) {
  if (!el) return;
  if (props.inst.options.anchor) {
    const observer = new ResizeObserver(() => applyPosition(el, props.inst.options));
    observer.observe(props.inst.options.anchor);
    observer.observe(el);
    props.inst.observer = observer;
    applyPosition(el, props.inst.options);
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
  <div :ref="(el) => onMount(el as HTMLElement)" style="position: fixed; left: -9999px; top: -9999px">
    <component :is="inst.component" />
  </div>
</template>