<template>
  <Teleport to="body">
    <template v-for="inst in instances" :key="inst.id">
      <!-- backdrop -->
      <div
        v-if="inst.options.backdrop && inst.visible"
        class="overlay-backdrop"
        @click="onBackdrop(inst)"
      />

      <!-- container — positioned by JS after mount -->
      <div
        :ref="el => onContainerMount(el as HTMLElement, inst)"
        class="overlay-container"
        :style="inst.style"
        :data-overlay-id="inst.id"
      >
        <component :is="inst.component" />
      </div>
    </template>
  </Teleport>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { exposeCtx } from 'iocraft';
import Bus from './OverlayBus';
import { computePosition } from './positionUtil';
import type { OverlayOptions } from './overly.types';

interface LiveInstance {
  id: string;
  component: any;
  options: OverlayOptions;
  overlayRef: any;
  visible: boolean;
  style: Record<string, string>;
}

const map = reactive<Record<string, LiveInstance>>({});
const instances = computed(() => Object.values(map));

// ── Bus handlers ──────────────────────────────────────────────────────

const onOpen = (payload: any) => {
  map[payload.id] = {
    id:         payload.id,
    component:  payload.component,
    options:    payload.options,
    overlayRef: payload.overlayRef,
    visible:    true,
    style:      resolveInitialStyle(payload.options),
  };
};

const onClose = (payload: any) => {
  const inst = map[payload.id];
  if (!inst) return;
  inst.visible = false;
  inst.overlayRef.isVisible.value = false;
  inst.options.onClose?.({ data: payload.data, trigger: payload.trigger });
  // defer removal so leave transitions can play
  setTimeout(() => delete map[payload.id], 300);
};

const onUpdate = (payload: any) => {
  const inst = map[payload.id];
  if (!inst) return;
  Object.assign(inst.options, payload.patch);
  if (payload.patch.position) {
    inst.style = resolveInitialStyle(inst.options);
  }
};

const onCloseAll = () => {
  Object.values(map).forEach(inst =>
    Bus.emit('overlay:close', { id: inst.id, trigger: 'api' })
  );
};

onMounted(() => {
  Bus.on('overlay:open',     onOpen);
  Bus.on('overlay:close',    onClose);
  Bus.on('overlay:update',   onUpdate);
  Bus.on('overlay:closeAll', onCloseAll);

  // global esc handler
  window.addEventListener('keydown', onKeydown);
});
onBeforeUnmount(() => {
  Bus.off('overlay:open',     onOpen);
  Bus.off('overlay:close',    onClose);
  Bus.off('overlay:update',   onUpdate);
  Bus.off('overlay:closeAll', onCloseAll);
  window.removeEventListener('keydown', onKeydown);
});

// ── Container mount — exposeCtx + anchor positioning ─────────────────

async function onContainerMount(el: HTMLElement | null, inst: LiveInstance) {
  if (!el) return;

  // wire the el ref so obtainCtx can read it
  inst.overlayRef.el.value = el;

  // provide the overlayRef into the component's context tree
  exposeCtx(inst.overlayRef);

  // if anchor-based positioning, compute after DOM is ready
  await nextTick();
  if (inst.options.position?.anchor) {
    const pos = computePosition(el, inst.options.position);
    el.style.left = `${pos.x}px`;
    el.style.top  = `${pos.y}px`;
  }
}

// ── Positioning helpers ───────────────────────────────────────────────

function resolveInitialStyle(options: OverlayOptions): Record<string, string> {
  const pos = options.position ?? {};
  const style: Record<string, string> = {
    position: 'fixed',
    zIndex: String(options.zIndex ?? 1000),
  };

  // anchor mode — JS will correct after mount; start offscreen
  if (pos.anchor) {
    style.left = '-9999px';
    style.top  = '-9999px';
    return style;
  }

  // explicit coords
  if (pos.x != null) style.left = `${pos.x}px`;
  if (pos.y != null) style.top  = `${pos.y}px`;

  return style;
}

function onBackdrop(inst: LiveInstance) {
  if (inst.options.closeOnBackdrop !== false) {
    Bus.emit('overlay:close', { id: inst.id, trigger: 'backdrop' });
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key !== 'Escape') return;
  // close topmost (highest zIndex) that allows esc
  const top = Object.values(map)
    .filter(i => i.options.closeOnEsc !== false)
    .at(-1);
  if (top) Bus.emit('overlay:close', { id: top.id, trigger: 'esc' });
}
</script>

<style scoped>
.overlay-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.4);
  z-index: 999;
}
.overlay-container {
  position: fixed;
}
</style>