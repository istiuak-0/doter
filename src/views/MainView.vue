<script setup lang="ts">
import { Icon } from '@iconify/vue'
import ButtonGroup from '@/components/ButtonGroup.vue'
import Editor from '@/components/Editor.vue';
</script>

<template>
  <div class="min-h-screen bg-gradient-main">
    <div class="fixed top-4 z-50 left-4">
      <ButtonGroup />
    </div>

    <Editor />
  </div>
</template>
