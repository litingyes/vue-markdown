<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { darkTheme, NConfigProvider } from 'naive-ui'
import { computed, provide } from 'vue'
import Container from './Container.vue'
import Header from './Header.vue'

const isDark = useDark()
const toggleTheme = useToggle(isDark)
provide('context', {
  isDark,
  toggleTheme,
})

const theme = computed(() => isDark.value ? darkTheme : null)
</script>

<template>
  <NConfigProvider :theme="theme">
    <div class="w-screen h-screen p-4 flex flex-col gap-4 bg-white dark:bg-black text-neutral-800 dark:text-neutral-200">
      <Header />
      <Container class="h-[calc(100vh-32px-52px-16px)]" />
    </div>
  </NConfigProvider>
</template>
