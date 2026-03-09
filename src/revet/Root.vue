<script setup lang="ts">
import { obtain } from 'iocraft';
import { OverlayService } from './overlay.service';


const { overlays } = obtain(OverlayService)
</script>
<template>
<slot></slot>


  <component v-for="overlay in overlays" :is="overlay.component" />

</template>