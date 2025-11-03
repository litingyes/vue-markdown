<script setup lang="ts">
import { watchThrottled } from '@vueuse/core'
import { NButton, NIcon, NInput, NScrollbar, NSelect, NSlider } from 'naive-ui'
import { computed, inject, nextTick, ref, type Ref } from 'vue'
import readme from '../../../README.md?raw'
import { VueMarkdown } from '../../vue-markdown/src/index'
import IconGithub from './icons/github.vue'
import IconMoon from './icons/moon.vue'
import IconSun from './icons/sun.vue'
import codeLanguages from './templates/code-languages.md?raw'

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
    label: 'README',
    value: 'readme',
  },
  {
    label: 'Code languages',
    value: 'code-languages',
  },
]
function onSelectTemplate(value: string) {
  switch (value) {
    case 'readme': {
      mdStr.value = readme.replace('./playground/public/logo.svg', 'logo.svg')
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

function enableTransitions() {
  return 'startViewTransition' in document
    && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}
async function toToggleTheme({ clientX: x, clientY: y }: MouseEvent) {
  if (!enableTransitions()) {
    toggleTheme()
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  await document.startViewTransition(async () => {
    toggleTheme()
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
}
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
        <NButton quaternary circle @click="toToggleTheme">
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
          placeholder="Markdown content to render"
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

<style lang="scss">
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}
</style>
