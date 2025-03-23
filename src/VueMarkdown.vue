<script setup lang="ts">
import type { HighlighterCore, LanguageRegistration, ThemeRegistration } from 'shiki'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { gfmFromMarkdown } from 'mdast-util-gfm'
import { toVNode } from 'mdast-util-to-vnode'
import { gfm } from 'micromark-extension-gfm'
import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import css from 'shiki/langs/css.mjs'
import html from 'shiki/langs/html.mjs'
import javascript from 'shiki/langs/javascript.mjs'
import json from 'shiki/langs/json.mjs'
import markdown from 'shiki/langs/markdown.mjs'
import typescript from 'shiki/langs/typescript.mjs'
import vue from 'shiki/langs/vue.mjs'
import catppuccinLatte from 'shiki/themes/catppuccin-latte.mjs'
import catppuccinMocha from 'shiki/themes/catppuccin-mocha.mjs'
import { computed, provide } from 'vue'
import CodeBlock from './nodes/CodeBlock.vue'
import { VUE_MARKDOWN_CONTEXT_KEY } from './utils'

defineOptions({
  name: 'VueMarkdown',
})

const props = withDefaults(defineProps<VueMarkdownProps>(), {
  md: '',
  shiki: () => ({
    themes: {
      light: catppuccinLatte,
      dark: catppuccinMocha,
    },
    langs: [
      css,
      html,
      javascript,
      json,
      markdown,
      typescript,
      vue,
    ],
  }),
})
interface VueMarkdownProps {
  md: string
  shiki?: {
    themes?: Record<string, ThemeRegistration>
    langs?: LanguageRegistration[][]
  }
}
const vNode = computed(() => {
  const ast = fromMarkdown(props.md, {
    extensions: [gfm()],
    mdastExtensions: [gfmFromMarkdown()],
  })

  return toVNode(ast, {
    components: {
      code: CodeBlock,
    },
  })
})

const highlighter = createHighlighterCoreSync({
  engine: createJavaScriptRegexEngine(),
  themes: Object.values(props.shiki.themes ?? {}),
  langs: props.shiki?.langs ?? [],
})

export interface VUE_MARKDOWN_CONTEXT {
  shiki: {
    highlighter: HighlighterCore
    themes: Required<VueMarkdownProps>['shiki']['themes']
    langs: Required<VueMarkdownProps>['shiki']['langs']
  }
}
provide<VUE_MARKDOWN_CONTEXT>(VUE_MARKDOWN_CONTEXT_KEY, {
  shiki: {
    highlighter,
    themes: props.shiki.themes,
    langs: props.shiki.langs,
  },
})
</script>

<template>
  <div class="vue-markdown">
    <component :is="vNode" />
  </div>
</template>

<style lang="scss">
:root {
  --vue-markdown-font-size: 16px;
  --vue-markdown-heading-font-weight: 600;
}

.vue-markdown {
  & > div > *:first-child {
    margin-top: 0;
  }

  font-size: var(--vue-markdown-font-size, 16px);
  line-height: 1.5;

  p {
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: var(--vue-markdown-heading-font-weight, 600);
    margin: 0;
    margin-top: 12px;
  }
  h1 {
    margin-top: 32px;
    font-size: calc(var(--vue-markdown-font-size) * 1.75);
    line-height: 1.75;
  }
  h2 {
    font-size: calc(var(--vue-markdown-font-size) * 1.5);
  }
  h3 {
    font-size: calc(var(--vue-markdown-font-size) * 1.25);
  }
  h4 {
    font-size: calc(var(--vue-markdown-font-size) * 1.125);
  }
  h5 {
    font-size: calc(var(--vue-markdown-font-size) * 1);
  }
  h6 {
    font-size: calc(var(--vue-markdown-font-size) * 0.875);
  }

  blockquote {
    margin: 0;
    padding-left: 12px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      height: 100%;
      width: 4px;
      background: #d1d5db;
      border-radius: 9999px;
    }
  }

  a {
    color: #3b82f6;
    transition: color ease-out 0.3s;

    &:hover {
      color: #2563eb;
      text-decoration: underline;
    }
  }

  hr {
    border-width: 0;
    border-top-width: 1px;
    border-color: #d1d5db;
    margin: 16px 0;
  }

  pre {
    padding: 16px;
    background: oklch(0.928 0.006 264.531);
    border-radius: 8px;
  }
  code:not(pre > code) {
    background: #e2e8f0;
    padding: 2px 4px;
    border-radius: 4px;
    white-space: nowrap;
    margin: 0 4px;
    box-shadow:
      0 1px 3px 0 rgb(0 0 0 / 0.1),
      0 1px 2px -1px rgb(0 0 0 / 0.1);
  }

  table {
    border-collapse: collapse;
    border: 1px solid #94a3b8;
    margin: 24px 0;
  }
  th,
  td {
    padding: 4px 8px;
    border: 1px solid #94a3b8;
  }

  img {
    max-width: 40%;
  }

  strong {
    font-weight: 600;
  }
  s {
    text-decoration: line-through;
  }
}

.dark .vue-markdown {
  blockquote {
    &::before {
      background: #374151;
    }
  }

  a {
    &:hover {
      color: #60a5fa;
    }
  }

  hr {
    border-color: #374151;
  }

  code:not(pre > code) {
    background: #1e293b;
  }

  table,
  th,
  td {
    border-color: #475569;
  }
}
</style>
