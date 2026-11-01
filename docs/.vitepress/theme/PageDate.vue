<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

// 展示 frontmatter 里手写的文章日期（date: YYYY-MM-DD）
const { frontmatter } = useData()

const text = computed(() => {
  const raw = frontmatter.value.date
  if (!raw) return ''
  const d = raw instanceof Date ? raw : new Date(raw)
  if (Number.isNaN(d.getTime())) return ''
  // 取 UTC 分量，避免时区导致日期偏移一天
  return `${d.getUTCFullYear()}年${d.getUTCMonth() + 1}月${d.getUTCDate()}日`
})
</script>

<template>
  <p v-if="text" class="page-date">发布于 {{ text }}</p>
</template>

<style scoped>
.page-date {
  margin: -0.5rem 0 1rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}
</style>
