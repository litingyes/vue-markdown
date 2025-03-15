<script setup lang="ts">
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toVNode } from 'mdast-util-to-vnode'
import { computed } from 'vue'

defineOptions({
  name: 'VueMarkdown',
})

const props = withDefaults(defineProps<{
  md: string
}>(), {
  md: '',
})

const vNode = computed(() => toVNode(fromMarkdown(props.md)))
</script>

<template>
  <div class="vue-markdown">
    <component :is="vNode" />
  </div>
</template>

<style lang="scss">
.vue-markdown {
}
</style>
