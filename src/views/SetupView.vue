<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import Card from '@/components/Card.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import Logo from '@/components/Logo.vue';

const route = useRouter()

const email = ref("");
const password = ref("");
const storageType = ref<"local" | "drive" | "github">("local");
const loading = ref(false);

function handleSubmit() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    route.push('/main')
  }, 4000);
}

</script>

<template>
  <div class="bg-gradient-main min-h-screen flex items-center justify-center p-3 sm:p-4 lg:p-8">
    <Card class="w-full max-w-md mx-auto">
      <!-- Header -->
      <div class="px-5 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6">
        <div class="flex justify-center mb-4 sm:mb-6">
          <Logo />
        </div>
        <div class="text-center">
          <h1 class="text-xl sm:text-2xl font-semibold text-heading mb-1 sm:mb-2">
            Welcome to Doter
          </h1>
          <p class="text-xs sm:text-sm text-body">
            Set up your note storage and get started
          </p>
        </div>
      </div>

      <!-- Form -->
      <div class="px-5 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-5">
          <!-- Storage Type Selection -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-heading">Storage Type</label>
            <div class="grid grid-cols-3 gap-2">
              <button type="button" @click="storageType = 'local'" :class="[
                'flex flex-col items-center gap-1 sm:gap-1.5 rounded-lg border p-2 sm:p-3 transition-all min-w-[64px] sm:min-w-[72px]',
                storageType === 'local'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-body hover:border-muted hover:bg-muted/50',
              ]">
                <Icon icon="mdi:harddisk"
                  :class="['w-5 h-5 sm:w-6 sm:h-6', storageType === 'local' ? 'text-primary' : '']" />
                <span class="text-[10px] sm:text-xs font-medium">Local</span>
              </button>

              <button type="button" @click="storageType = 'drive'" :class="[
                'flex flex-col items-center gap-1 sm:gap-1.5 rounded-lg border p-2 sm:p-3 transition-all min-w-[64px] sm:min-w-[72px]',
                storageType === 'drive'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-body hover:border-muted hover:bg-muted/50',
              ]">
                <Icon icon="mdi:google-drive"
                  :class="['w-5 h-5 sm:w-6 sm:h-6', storageType === 'drive' ? 'text-primary' : '']" />
                <span class="text-[10px] sm:text-xs font-medium">Drive</span>
              </button>

              <button type="button" @click="storageType = 'github'" :class="[
                'flex flex-col items-center gap-1 sm:gap-1.5 rounded-lg border p-2 sm:p-3 transition-all min-w-[64px] sm:min-w-[72px]',
                storageType === 'github'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-body hover:border-muted hover:bg-muted/50',
              ]">
                <Icon icon="mdi:github"
                  :class="['w-5 h-5 sm:w-6 sm:h-6', storageType === 'github' ? 'text-primary' : '']" />
                <span class="text-[10px] sm:text-xs font-medium">GitHub</span>
              </button>
            </div>
          </div>

          <!-- Email Input -->
          <Input v-model="email" type="email" label="Email Address" placeholder="name@example.com" icon="mdi:email" />

          <!-- Password Input -->
          <Input v-model="password" type="password" label="Password" placeholder="Enter your password"
            icon="mdi:lock" />

          <!-- Submit Button -->
          <Button type="submit" :loading="loading" className="w-full mt-2 sm:mt-4">
            Continue
          </Button>
        </form>
      </div>
    </Card>
  </div>
</template>
