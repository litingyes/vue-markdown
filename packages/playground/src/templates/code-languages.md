```css
:root {
  font-size: 16px;
}

* {
  box-sizing: border-box;
}

div {
  width: 100vw;
  height: 100vh;
}
```

---

```html
<h1>Vue Markdown</h1>
<p>The vue component for render Markdown string.</p>
```

---

```js
console.log('Vue markdown')
```

---

```json
{
  "name": "Vue Markdown",
  "description": "The vue component for render Markdown string."
}
```

---

```md
# Vue Markdown

The vue component for render Markdown string.
```

---

```ts
const name: string = 'Vue markdown'
```

---

```vue
<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'VueDemo'
})

const msg = ref('Vue Markdown')
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped>
h1 {
  font-size: 20px;
  line-height: 28px;
}
</style>
```
