<script setup lang="ts">
import type { VUE_MARKDOWN_CONTEXT } from '../VueMarkdown.vue'
import { useClipboard, useElementHover } from '@vueuse/core'
import { computed, inject, ref } from 'vue'
import IconCopied from '../icons/copied.vue'
import IconCopy from '../icons/copy.vue'
import { VUE_MARKDOWN_CONTEXT_KEY } from '../utils'

defineOptions({
  name: 'VueMarkdownCodeBlock',
})

const props = withDefaults(defineProps<{
  value: string
  lang?: string
  meta?: string
}>(), {
  lang: 'text',
})

const context = inject<VUE_MARKDOWN_CONTEXT>(VUE_MARKDOWN_CONTEXT_KEY)
const htmlStr = computed(() => {
  const lang = context?.shiki.langs?.flat()?.some(item => item.name === props.lang || item.aliases?.includes(props.lang)) ? props.lang : 'text'

  const themes = Object.entries(context?.shiki?.themes ?? {}).reduce<Record<string, string>>((themes, [themeKey, themeConfig]) => {
    themes[themeKey as string] = themeConfig.name!

    return themes
  }, {})

  return context?.shiki?.highlighter?.codeToHtml(props.value, {
    lang,
    themes,
  })
})

const containerRef = ref<HTMLDivElement>()
const isHover = useElementHover(containerRef)

const { copy, copied } = useClipboard({
  source: props.value,
})
</script>

<template>
  <div ref="containerRef" class="vue-markdown-code-block">
    <div v-html="htmlStr" />
    <div class="vue-markdown-code-block__decorate">
      <div v-if="isHover || copied">
        <button class="vue-markdown-code-block__copy" :disabled="copied" @click="copy(value)">
          <IconCopied v-if="copied" />
          <IconCopy v-else />
        </button>
      </div>
      <div v-else class="vue-markdown-code-block__lang">
        {{ lang }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.vue-markdown-code-block {
  position: relative;
  margin: 24px 0;

  &__decorate {
    position: absolute;
    top: 8px;
    right: 16px;
  }

  &__lang {
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    color: #525252;
  }

  &__copy {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    width: 24px;
    height: 24px;
    color: #525252;
    background: #f3f4f6;
    box-shadow:
      0 1px 3px 0 rgb(0 0 0 / 0.1),
      0 1px 2px -1px rgb(0 0 0 / 0.1);
  }

  .shiki {
    margin: 0;
    padding: 24px;
    white-space: pre-wrap;
  }
}

html.dark .vue-markdown-code-block .shiki,
html.dark .vue-markdown-code-block .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}
</style>
