<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface Props {
  modelValue: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  label?: string;
  error?: string;
  icon?: string;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <div class="flex flex-col gap-1.5 sm:gap-2">
    <label v-if="label" class="text-xs sm:text-sm font-medium text-heading">
      {{ label }}
    </label>
    <div class="relative">
      <Icon
        v-if="icon"
        :icon="icon"
        class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-body"
      />
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :class="[
          'w-full rounded-lg border bg-input text-heading',
          'placeholder:text-body transition-all',
          'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'text-sm sm:text-base',
          'py-2 sm:py-2.5',
          icon ? 'pl-9 sm:pl-10 pr-3 sm:pr-4' : 'px-3 sm:px-4',
          error ? 'border-destructive focus:ring-destructive/50' : 'border-border hover:border-muted',
        ]"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <p v-if="error" class="text-destructive text-xs sm:text-sm">
      {{ error }}
    </p>
  </div>
</template>
