<script setup lang="ts">
import { exposeCtx } from 'iocraft'
import { onUnmounted } from 'vue'
import { LiveInstance } from './overly.types';

const props = defineProps<{ inst: LiveInstance }>()

exposeCtx(props.inst.overlayRef)

let observer: ResizeObserver | null = null

function onMount(el: HTMLElement | null) {
  if (!el || !props.inst.options.anchor) return

  const { anchor, top = 0, left = 0 } = props.inst.options

  const applyPosition = () => {
    const rect = anchor.getBoundingClientRect()
    el.style.top = `${rect.bottom + top}px`
    el.style.left = `${rect.left + left}px`
  }

  observer = new ResizeObserver(applyPosition)
  observer.observe(anchor)
  observer.observe(el)
  applyPosition()
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