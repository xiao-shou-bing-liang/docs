<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

// 展示 frontmatter 里手写的文章日期（date: YYYY-MM-DD），文案跟随页面语言
const { frontmatter, lang } = useData()

const isZh = computed(() => !lang.value.toLowerCase().startsWith('en'))

const text = computed(() => {
  const raw = frontmatter.value.date
  if (!raw) return ''
  const d = raw instanceof Date ? raw : new Date(raw)
  if (Number.isNaN(d.getTime())) return ''
  // 取 UTC 分量，避免时区导致日期偏移一天
  const y = d.getUTCFullYear()
  const m = d.getUTCMonth() + 1
  const day = d.getUTCDate()
  if (isZh.value) return `发布于 ${y}年${m}月${day}日`
  const fmt = new Intl.DateTimeFormat(lang.value, { dateStyle: 'long', timeZone: 'UTC' })
  return `Published on ${fmt.format(new Date(Date.UTC(y, m - 1, day)))}`
})
</script>

<template>
  <p v-if="text" class="page-date">{{ text }}</p>
</template>

<style scoped>
.page-date {
  margin: -0.5rem 0 1rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}
</style>
