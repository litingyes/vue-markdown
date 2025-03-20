<template>
  <div class="container">
    <div class="actions">
      <NSlider v-model:value="ms"
               :min="10" :max="300" :step="10" :disabled="loading"
               :format-tooltip="number => `Stream speed: ${number} ms per letter`" />
      <NButton :loading="loading" :disabled="!mdStr?.trim().length" @click="rerun">Rerun</NButton>
    </div>
    <div class="render">
      <NInput v-model:value="mdStr" type="textarea" :disabled="loading" />
      <VueMarkdown :md="mdStr" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { VueMarkdown } from '../../src';
import { NButton, NSlider, NInput } from 'naive-ui'

defineOptions({
  name: 'PlaygroundContainer'
})

const mdStr = ref('')

const timeId = ref<NodeJS.Timeout>()
const ms = ref(100)
const rerun = () => {
  if (timeId.value) {
    clearInterval(timeId.value)

    timeId.value = undefined
  }

  const str = mdStr.value
  let index = 0

  mdStr.value = ''
  timeId.value = setInterval(() => {
    console.log('setInterval')
    if (index >= str.length) {
      clearInterval(timeId.value)
      timeId.value = undefined
      return
    }

    mdStr.value += str[index]
    index++
  }, ms.value)
}

const loading = computed(() => !!timeId.value)
</script>

<style lang="scss" scoped>
.container {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.actions {
  display: flex;
  gap: 16px;

  .n-slider {
    max-width: 200px;
    display: flex;
    align-items: center;
  }
}

.render {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
</style>