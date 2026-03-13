<script setup lang="ts">
import { obtainCtx, obtain } from 'iocraft'
import { Icon } from '@iconify/vue'
import Logo from '@/components/Logo.vue'
import { SidebarService } from '@/services/Sidebar.service'
import { OverlayRef } from '@/overlay/OverlayRef'

const overlay = obtainCtx(OverlayRef)
const { fileTreeData } = obtain(SidebarService)
</script>

<template>
  <div class="w-72 border border-border bg-card rounded-xl shadow-2xl">
    <div class="flex flex-col h-full overflow-hidden">
      <div class="flex items-center justify-center px-4 py-4 border-b border-border">
        <Logo />
      </div>

      <div class="flex-1 overflow-y-auto p-4">
        <ul class="space-y-1">
          <li v-for="node in fileTreeData" :key="node.id">
            <button v-if="node.type === 'folder'"
              class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-body hover:text-primary hover:bg-primary/10 transition-all">
              <Icon icon="mdi:folder" class="w-5 h-5 flex-shrink-0" />
              <span class="text-sm font-medium truncate">{{ node.name }}</span>
              <Icon icon="mdi:chevron-right" class="w-4 h-4 ml-auto text-muted" />
            </button>

            <button v-if="node.type === 'file'"
              class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-body hover:text-primary hover:bg-primary/10 transition-all">
              <Icon icon="mdi:file-document" class="w-5 h-5 flex-shrink-0 text-primary" />
              <span class="text-sm truncate">{{ node.name }}</span>
            </button>
          </li>
        </ul>
      </div>

      <div class="border-t border-border p-4">
        <button
          class="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-border text-body hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all">
          <Icon icon="mdi:plus" class="w-5 h-5" />
          <span class="text-sm font-medium">New Note</span>
        </button>
      </div>
    </div>
  </div>
</template>