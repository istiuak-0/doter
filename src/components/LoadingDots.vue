<script setup lang="ts">
</script>

<template>
  <div class="loading-dots">
    <span class="loading-dot"></span>
    <span class="loading-dot delay-2"></span>
    <span class="loading-dot delay-3"></span>
  </div>
</template>

<style scoped>
.loading-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 20px;
}

.loading-dot {
  width: 8px;
  height: 8px;
  background: #0a0e1a;
  border-radius: 50%;
  animation: dot-pulse 1.5s infinite linear;
  display: block;
}

.loading-dot.delay-2 {
  animation-delay: 0.25s;
}

.loading-dot.delay-3 {
  animation-delay: 0.5s;
}

@keyframes dot-pulse {
  0% {
    box-shadow: 0 0 0 -3px #5aaeff;
    transform: scale(0.8);
  }
  30% {
    box-shadow: 0 0 0 2px #5aaeff;
    transform: scale(1);
  }
  60%, 100% {
    box-shadow: 0 0 0 -3px #5aaeff;
    transform: scale(0.8);
  }
}
</style>
