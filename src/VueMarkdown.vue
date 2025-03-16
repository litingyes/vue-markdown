<script setup lang="ts">
import { fromMarkdown } from 'mdast-util-from-markdown'
import { gfmFromMarkdown } from 'mdast-util-gfm'
import { toVNode } from 'mdast-util-to-vnode'
import { gfm } from 'micromark-extension-gfm'
import { computed } from 'vue'

defineOptions({
  name: 'VueMarkdown',
})

const props = withDefaults(defineProps<{
  md: string
}>(), {
  md: '',
})

// const vNode = computed(() => toVNode(fromMarkdown(props.md)))
const vNode = computed(() => {
  const ast = fromMarkdown(props.md, {
    extensions: [gfm()],
    mdastExtensions: [gfmFromMarkdown()],
  })

  return toVNode(ast)
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
      background: oklch(0.13 0.028 261.692);
      border-radius: 9999px;
    }
  }

  a {
    color: oklch(0.707 0.165 254.624);
    transition: color ease-out 0.3s;

    &:hover {
      color: oklch(0.623 0.214 259.815);
    }
  }

  hr {
    border-width: 0;
    border-top-width: 1px;
    border-color: oklch(0.872 0.01 258.338);
  }

  pre {
    padding: 16px;
    background: oklch(0.928 0.006 264.531);
    border-radius: 8px;
  }
  code:not(pre > code) {
    background: oklch(0.928 0.006 264.531);
    padding: 2px 4px;
    border-radius: 4px;
    white-space: nowrap;
    margin: 0 4px;
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
</style>
