<script setup lang="ts">
import { computed, reactive } from 'vue'
import Bus from './overlay-bus'
import OverlayInstance from './OverlayInstance.vue'
import { LiveInstance } from './overly.types'

const map = reactive<Record<string, LiveInstance>>({})
const instances = computed(() => Object.values(map))

Bus.on('overlay:open', (payload) => {
  map[payload.id] = payload
})

Bus.on('overlay:close', ({ id }) => {
  delete map[id]
})
</script>

<template>
  <Teleport to="body">
    <OverlayInstance v-for="inst in instances" :key="inst.id" :inst="inst" />
  </Teleport>
</template>