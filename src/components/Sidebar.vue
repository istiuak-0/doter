<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import Logo from './Logo.vue'

const fileTreeData = ref([
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    children: [
      { id: '1-1', name: 'Notes.md', type: 'file' },
      { id: '1-2', name: 'Ideas.md', type: 'file' },
    ],
  },
  {
    id: '2',
    name: 'Personal',
    type: 'folder',
    children: [
      { id: '2-1', name: 'Journal.md', type: 'file' },
      { id: '2-2', name: 'Goals.md', type: 'file' },
    ],
  },
  { id: '3', name: 'README.md', type: 'file' },
])
</script>
<template>
  <div
    class="w-72 border border-border bg-card rounded-xl shadow-2xl overflow-hidden flex flex-col"
    style="height: calc(100vh - 84px)"
  >
    <div class="flex items-center justify-center px-4 py-4 border-b border-border shrink-0">
      <Logo />
    </div>

    <div class="flex-1 overflow-y-auto p-4">
      <ul class="space-y-1 list-none m-0 p-0">
        <li v-for="node in fileTreeData" :key="node.id" class="m-0 p-0">
          <button
            v-if="node.type === 'folder'"
            class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-body hover:text-primary hover:bg-primary/10 transition-all"
          >
            <Icon icon="mdi:folder" class="w-5 h-5 shrink-0" />
            <span class="text-sm font-medium truncate">{{ node.name }}</span>
            <Icon icon="mdi:chevron-right" class="w-4 h-4 ml-auto text-muted shrink-0" />
          </button>

          <button
            v-if="node.type === 'file'"
            class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-body hover:text-primary hover:bg-primary/10 transition-all"
          >
            <Icon icon="mdi:file-document" class="w-5 h-5 shrink-0 text-primary" />
            <span class="text-sm truncate">{{ node.name }}</span>
          </button>
        </li>
      </ul>
    </div>

    <div class="border-t border-border p-4 shrink-0">
      <button
        class="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-border text-body hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all"
      >
        <Icon icon="mdi:plus" class="w-5 h-5 shrink-0" />
        <span class="text-sm font-medium">New Note</span>
      </button>
    </div>
  </div>
</template>
