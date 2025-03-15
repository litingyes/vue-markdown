<script setup lang="ts">
import { ref } from 'vue';
import {VueMarkdown} from '../../src';

const mdStr = ref('')
</script>

<template>
<div class="playground">
  <div class="container">
    <textarea v-model="mdStr" />
    <VueMarkdown :md="mdStr" />
  </div>
</div>
</template>

<style lang="scss">
body {
  margin: 0;
}

* {
  box-sizing: border-box;
}

.playground {
  height: 100vh;

  .container {
    height: 100%;
    padding: 16px;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 24px;
  }
}
</style>
