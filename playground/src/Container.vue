<script setup lang="ts">
import { watchThrottled } from '@vueuse/core'
import { NButton, NIcon, NInput, NScrollbar, NSelect, NSlider } from 'naive-ui'
import { computed, inject, nextTick, ref, type Ref } from 'vue'
import { VueMarkdown } from '../../src'
import IconGithub from './icons/github.vue'
import IconMoon from './icons/moon.vue'
import IconSun from './icons/sun.vue'
import codeLanguages from './templates/code-languages.md?raw'
import fullMarkdown from './templates/full-markdown.md?raw'

defineOptions({
  name: 'PlaygroundContainer',
})

const leftRef = ref()
const rightRef = ref()

const mdStr = ref('')
watchThrottled(mdStr, () => {
  nextTick(() => {
    requestAnimationFrame(() => {
      leftRef.value?.scrollBy({
        top: Number.MAX_SAFE_INTEGER,
        behavior: 'smooth',
      })
      rightRef.value?.scrollBy({
        top: Number.MAX_SAFE_INTEGER,
        behavior: 'smooth',
      })
    })
  })
})

const templates = [
  {
    label: 'Full markdown',
    value: 'full-markdown',
  },
  {
    label: 'Code languages',
    value: 'code-languages',
  },
]
function onSelectTemplate(value: string) {
  switch (value) {
    case 'full-markdown': {
      mdStr.value = fullMarkdown
      rerun()
      break
    }
    case 'code-languages': {
      mdStr.value = codeLanguages
      rerun()
      break
    }
    default: {
      mdStr.value = ''
      break
    }
  }
}

const timeId = ref<ReturnType<typeof setInterval>>()
const ms = ref(10)
function rerun() {
  if (timeId.value) {
    clearInterval(timeId.value)

    timeId.value = undefined

    return
  }

  const str = mdStr.value
  let index = 0

  mdStr.value = ''
  timeId.value = setInterval(() => {
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

const { isDark, toggleTheme } = inject<{
  isDark: Ref<boolean>
  toggleTheme: () => void
}>('context')!
</script>

<template>
  <div class=" flex-1 flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <div class="flex gap-4">
        <NButton type="primary" :quaternary="loading" :disabled="!mdStr.trim()" @click="rerun">
          {{ loading ? 'Stop' : 'Rerun' }}
        </NButton>
        <NSelect class="w-56" :disabled="loading" :options="templates" :consistent-menu-width="false" placeholder="Select markdown template" clearable @update:value="onSelectTemplate" />
        <div>
          <div class="flex items-center justify-between gap-2">
            <label class="text-sm text-neutral-600 dark:text-neutral-400">Stream speed</label>
            <div class="text-xs text-neutral-500">
              {{ Math.round(1000 / ms) }} characters / min
            </div>
          </div>
          <NSlider
            v-model:value="ms"
            class="w-56"
            :min="1"
            :max="50"
            :step="1"
            :disabled="loading"
            :tooltip="false"
          />
        </div>
      </div>
      <div class="flex items-center">
        <NButton quaternary circle @click="toggleTheme()">
          <template #icon>
            <NIcon>
              <IconMoon v-if="isDark" />
              <IconSun v-else />
            </NIcon>
          </template>
        </NButton>
        <a href="https://github.com/litingyes/vue-markdown.git" target="_blank">
          <NButton quaternary circle>
            <template #icon>
              <NIcon>
                <IconGithub />
              </NIcon>
            </template>
          </NButton>
        </a>
      </div>
    </div>
    <div class="flex-1 grid grid-cols-2 gap-6 h-[calc(100%-38px-16px)]">
      <NScrollbar ref="leftRef" class="h-full pr-3">
        <NInput
          v-model:value="mdStr"
          type="textarea"
          placeholder="MarkDown content to render"
          :disabled="loading"
          :autosize="{ minRows: 20 }"
          autofocus
        />
      </NScrollbar>
      <NScrollbar ref="rightRef" class="h-full pr-3">
        <VueMarkdown :md="mdStr" />
      </NScrollbar>
    </div>
  </div>
</template>
