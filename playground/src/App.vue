<script setup lang="ts">
import Header from './Header.vue';
import Container from './Container.vue'
import { NConfigProvider } from 'naive-ui'
</script>

<template>
  <NConfigProvider>
    <div class="playground">
      <Header />
      <Container />
    </div>
  </NConfigProvider>
</template>

<style lang="scss">
body {
  margin: 0;
}

* {
  box-sizing: border-box;
}
</style>

<style lang="scss">
.playground {
  width: 100vw;
  height: 100vh;
  padding: 16px;

  display: flex;
  flex-direction: column;
}
</style>
