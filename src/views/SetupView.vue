<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Card from '@/components/Card.vue'
import Button from '@/components/Button.vue'
import Logo from '@/components/Logo.vue'
import { obtain } from 'iocraft'
import { SetupService } from '@/services/Setup.service'

const { handleSubmit, storageType, loading } = obtain(SetupService)
</script>
<template>
  <div class="bg-gradient-main min-h-screen flex items-center justify-center p-4">
    <Card class="w-full max-w-md mx-auto">
      <div class="px-6 pt-8 pb-6">
        <div class="flex justify-center mb-6">
          <Logo />
        </div>
        <div class="text-center">
          <h1 class="text-xl font-semibold text-heading mb-2">Welcome to Doter</h1>
          <p class="text-sm text-body">Set up your note storage and get started</p>
        </div>
      </div>

      <div class="px-6 pb-8">
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-heading">Storage Type</label>
            <div class="grid grid-cols-3 gap-2">
              <button type="button" @click="storageType = 'local'" :class="[
                'flex flex-col items-center gap-1.5 rounded-lg border p-3 transition-all',
                storageType === 'local'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-body hover:border-muted hover:bg-muted/50',
              ]">
                <Icon icon="mdi:harddisk" class="w-6 h-6" />
                <span class="text-xs font-medium">Local</span>
              </button>
            </div>
          </div>

          <Button type="submit" :loading="loading" className="w-full mt-4">
            Continue
          </Button>
        </form>
      </div>
    </Card>
  </div>
</template>