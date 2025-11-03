<script setup lang="ts">
import pkgInfo from '../../vue-markdown/package.json'

defineOptions({
  name: 'PlaygroundHeader',
})
</script>

<template>
  <header class="flex flex-col items-center">
    <h1 class="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
      Vue Markdown
    </h1>
    <p class="text-sm text-neutral-600 dark:text-neutral-400">
      {{ pkgInfo.description }}
    </p>
  </header>
</template>
