# Vue Markdown

The vue component for render MarkDown string

## What is this?

This is a Vue.js component focused on MarkDown string rendering, which is based on [mdast-util-to-vnode](https://github.com/litingyes/mdast-util-to-vnode) to parse MarkDown string and render by Vue.js.

## When should I use this?

- Rendering MarkDown strings with Vue.js
- Streaming MarkDown strings (usually in AI Chat)

## Install

```base
npm install vue-markdown-x
```

## Use

```vue
<script setup>
import { ref } from 'vue'
import { VueMarkdown } from 'vue-markdown-x'

const mdStr = ref('')
</script>

<template>
  <VueMarkdown :md="mdStr" />
</template>
```

### VueMarkdown Props

#### md

MarkDown string to render.

```ts
// default: ''
type md = string
```

#### shiki

options of shiki for render code block.

```ts
interface shiki {
  // default: { light: catppuccinLatte, dark: catppuccinMocha }
  themes?: Record<string, ThemeRegistration>

  // default: [css,html,javascript,json,markdown,typescript,vue]
  langs?: LanguageRegistration[][]
}
```

### VueMarkdown Css Variables

```css
:root {
  /* basic font-size, and heading's font-size is scaled based on this value. */
  --vue-markdown-font-size: 16px;

  /* font-weight for heading */
  --vue-markdown-heading-font-weight: 600;
}
```
