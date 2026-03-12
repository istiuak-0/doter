<script setup lang="ts">
import ButtonGroup from '@/components/ButtonGroup.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-main">
    <Sidebar />

    <div class="fixed top-4 left-2 z-50 sm:left-4 sm:top-4">
      <ButtonGroup />
    </div>

    <main class="p-4 sm:p-6 lg:p-8">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col items-center justify-center py-12 sm:py-20">
          <div
            class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6"
          >
            <Icon icon="mdi:file-document-outline" class="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
          </div>
          <h1 class="text-xl sm:text-2xl font-semibold text-heading mb-2 text-center">
            Welcome to Doter
          </h1>
          <p class="text-sm sm:text-base text-body text-center max-w-md">
            Your notes will appear here. Select or create a note to start editing.
          </p>
        </div>

        <Show />
      </div>
    </main>
  </div>
</template>
