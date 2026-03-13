<!-- OverlayInstance.vue -->
<script setup lang="ts">
import { exposeCtx } from 'iocraft'
import type { LiveInstance, OverlayOptions } from './overly.types'
import { OverlayRef } from './OverlayRef'
import { onUnmounted } from 'vue'

const props = defineProps<{
  inst: LiveInstance
}>()

exposeCtx(props.inst.overlayRef)
let observer: ResizeObserver | null = null

function onMount(el: HTMLElement | null) {
  if (!el) return
  if (props.inst.options.anchor) {
    observer = new ResizeObserver(() => applyPosition(el, props.inst.options))
    observer.observe(props.inst.options.anchor)
    observer.observe(el)
    applyPosition(el, props.inst.options)
  }
}

function applyPosition(el: HTMLElement, options: OverlayOptions) {
  const rect = options.anchor!.getBoundingClientRect()
  el.style.position = 'fixed'
  el.style.top = `${rect.bottom + (options.top ?? 0)}px`
  el.style.left = `${rect.left + (options.left ?? 0)}px`
}

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div
    :ref="(el) => onMount(el as HTMLElement)"
    style="position: fixed; left: -9999px; top: -9999px"
  >
    <component :is="inst.component" />
  </div>
</template>
