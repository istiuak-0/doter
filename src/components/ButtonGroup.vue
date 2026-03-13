<script setup lang="ts">
import { ref } from 'vue'
import { obtain } from 'iocraft'
import { Icon } from '@iconify/vue'
import Sidebar from '@/components/Sidebar.vue'
import type { OverlayRef } from '@/overlay/overly.types'
import { OverlayService } from '@/overlay/overlay.service'

const overlay = obtain(OverlayService)
const toggleBtn = ref<HTMLElement | null>(null)
let sidebarRef: OverlayRef | null = null

function toggleSidebar() {
  if (sidebarRef) {
    sidebarRef.close()
    sidebarRef = null
    return
  }
  sidebarRef = overlay.open(Sidebar, {
    anchor: toggleBtn.value!,
    top: 8,
  })
  sidebarRef.on('close', () => {
    sidebarRef = null
  })
}
</script>

<template>
  <div class="inline-flex rounded-lg border border-border bg-card -space-x-px" role="group">
    <button
      ref="toggleBtn"
      type="button"
      class="text-body hover:bg-muted hover:text-heading font-medium rounded-l-lg text-sm px-3 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
      aria-label="Toggle Sidebar"
      @click="toggleSidebar"
    >
      <Icon icon="lucide:folder-open" class="w-5 h-5" />
    </button>

    <button
      type="button"
      class="text-body hover:bg-muted hover:text-heading font-medium rounded-r-lg text-sm px-3 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
      aria-label="Settings"
    >
      <Icon icon="lucide:settings" class="w-5 h-5" />
    </button>
  </div>
</template>