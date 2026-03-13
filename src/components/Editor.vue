<script setup lang="ts">
import EditorJS from '@editorjs/editorjs'

let editor = new EditorJS({
  holder: 'editor-holder',
  placeholder: 'Start writing...',
  minHeight: 200,
  autofocus:true,
  hideToolbar:true,
  tools:{

  }
})
</script>

<template>
  <div id="editor-holder"></div>
</template>
