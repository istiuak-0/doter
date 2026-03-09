<!-- RevetRoot.vue -->
<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import DialogWrapper from './DialogWrapper.vue'
import { overlayBus, type OverlayInstance } from './overlay.bus'

const overlays = ref<OverlayInstance[]>([])

const cleanup = overlayBus.on((event) => {
  if (event.type === 'open') {
    overlays.value.push(event.instance)
  }
  if (event.type === 'close') {
    overlays.value = overlays.value.filter(o => o.id !== event.id)
  }
})

onUnmounted(cleanup)
</script>

<template>
  <slot />   <!-- your app -->

  <teleport to="body">
    <DialogWrapper
      v-for="overlay in overlays"
      :key="overlay.id"
      :overlay="overlay"
    />
  </teleport>
</template>