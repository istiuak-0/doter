<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
  class?: string;
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false,
  loading: false,
  class: '',
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="btn-primary w-full text-sm sm:text-base py-2 sm:py-2.5 min-h-[44px] sm:min-h-[48px]"
    :class="class"
  >
    <span v-if="loading" class="flex items-center justify-center gap-2">
      <span class="loading-dot"></span>
      <span class="loading-dot delay-1"></span>
      <span class="loading-dot delay-2"></span>
    </span>
    <span :class="{ 'opacity-0': loading }">
      <slot />
    </span>
  </button>
</template>
