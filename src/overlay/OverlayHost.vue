<!-- OverlayHost.vue -->
<script setup lang="ts">
import { reactive, computed } from 'vue';
import Bus from './OverlayBus';
import OverlayInstance from './OverlayInstance.vue';
import type { OverlayOptions, OverlayRef } from './overly.types';

interface LiveInstance {
  id: string;
  component: any;
  overlayRef: OverlayRef;
  options: OverlayOptions;
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
  delete map[payload.id]
});
</script>

<template>
  <Teleport to="body">
    <OverlayInstance v-for="inst in instances" :key="inst.id" :inst="inst" />
  </Teleport>
</template>