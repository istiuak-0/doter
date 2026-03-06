<script setup lang="ts">
import LoadingDots from '@/components/LoadingDots.vue';

interface Props {
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false,
  loading: false,
  className: '',
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'btn-primary w-full text-sm sm:text-base py-2 sm:py-2.5 min-h-[44px] sm:min-h-[48px]',
      loading ? 'loading' : '',
      (disabled || loading) ? 'cursor-not-allowed opacity-50' : '',
      className
    ]"
  >
    <LoadingDots v-if="loading" />
    <span v-else>
      <slot />
    </span>
  </button>
</template>
