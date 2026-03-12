<script setup lang="ts">
import LoadingDots from '@/components/LoadingDots.vue'

interface Props {
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
  className?: string
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false,
  loading: false,
  className: '',
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'btn-primary w-full text-sm sm:text-base py-2 sm:py-2.5 min-h-[44px] sm:min-h-[48px]',
      loading ? 'loading' : '',
      disabled || loading ? 'cursor-not-allowed opacity-50' : '',
      className,
    ]"
  >
    <LoadingDots v-if="loading" />
    <span v-else>
      <slot />
    </span>
  </button>
</template>

<style scoped>
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 0.5rem;
  background-color: #5aaeff;
  color: #0a0e1a;
  padding: 0.5rem 1.5rem;
  font-size: 0.875rem;
  transition: all 0.15s ease;
  cursor: pointer;
  border: none;
  box-shadow: 0 0 20px rgba(90, 174, 255, 0.3);
}

.btn-primary:hover:not(:disabled) {
  background-color: #4a9aef;
  box-shadow: 0 0 25px rgba(90, 174, 255, 0.4);
}

.btn-primary:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  box-shadow: none;
}

.btn-primary.loading {
  opacity: 1;
  box-shadow: 0 0 20px rgba(90, 174, 255, 0.3);
  pointer-events: none;
}

@media (max-width: 640px) {
  .btn-primary {
    padding: 0.625rem 1rem;
  }
}

@media (max-width: 360px) {
  .btn-primary {
    padding: 0.5rem 0.75rem;
    font-size: 0.8125rem;
  }
}
</style>
