<template>
  <header>
    <h1>Vue Markdown</h1>
    <p>{{ pkgInfo.description }}</p>
  </header>
</template>

<script setup lang="ts">
import pkgInfo from '../../package.json'

defineOptions({
  name:'PlaygroundHeader'
})
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  margin: 0;
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  color: #0a0a0a;
}

p {
  margin: 0;
  font-size: 14;
  line-height: 20px;
  color: #171717;
}
</style>