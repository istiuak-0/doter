<!-- ConfirmDialog.vue — no props, just injects context -->
<script setup lang="ts">
import { OverlayContext } from '@/revet/overlay.ctx';
import { obtainCtx } from 'iocraft';



const ctx = obtainCtx(OverlayContext)
// ctx.data → { message: 'Are you sure?' }
// ctx.close(result) → closes and fires ref.on('close')

interface ConfirmDialogData {
  message: string;
}
</script>

<template>
  <div class="dialog-box">
    <p>{{ (ctx?.data as ConfirmDialogData)?.message }}</p>
    <button @click="ctx?.close(false)">Cancel</button>
    <button @click="ctx?.close(true)">Confirm</button>
  </div>
</template>

