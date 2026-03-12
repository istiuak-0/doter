<script setup lang="ts">
interface Props {
  class?: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="rounded-xl border border-border bg-card text-card-foreground shadow-xl mx-2 sm:mx-0"
    :class="class"
  >
    <slot />
  </div>
</template>
