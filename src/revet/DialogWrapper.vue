<!-- DialogWrapper.vue -->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { overlayBus, type OverlayInstance } from './overlay.bus';
import { exposeCtx, obtainNew } from 'iocraft';
import { OverlayContext } from './overlay.ctx';


const props = defineProps<{ overlay: OverlayInstance }>()
const emit = defineEmits<{ close: [result?: any] }>()

// create a fresh OverlayContext instance for this specific dialog
const ctx = obtainNew(OverlayContext)
console.log(ctx);

ctx._init(
  props.overlay.id,
  props.overlay.options.data,
  (result) => {
    overlayBus.emit({ type: 'close', id: props.overlay.id, result })
  }
)

// expose it so any child component can obtainCtx(OverlayContext)
 exposeCtx(ctx)

// handle escape key
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.overlay.options.closeOnEscape !== false && !props.overlay.options.persistent) {
    ctx.close()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <!-- backdrop -->
  <div
    class="overlay-backdrop"
    @click="overlay.options.closeOnBackdrop !== false && !overlay.options.persistent && ctx.close()"
  />

  <!-- wrapper positions the box -->
  <div class="overlay-wrapper" :data-position="overlay.options.position ?? 'center'">
    <!-- the actual user component renders here, no props forced on it -->
    <component :is="overlay.component" />
  </div>
</template>