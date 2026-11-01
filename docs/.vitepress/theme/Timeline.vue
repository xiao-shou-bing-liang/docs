<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import data from 'virtual:timeline-data'

// 数据由 config.mjs 里的 vp-timeline-data 插件在构建时扫描 frontmatter 生成（已按日期倒序）
const items = data

const years = computed(() => {
  const map = new Map()
  for (const it of items) {
    const y = it.date.slice(0, 4)
    if (!map.has(y)) map.set(y, [])
    map.get(y).push(it)
  }
  return Array.from(map, ([year, list]) => ({ year, list }))
})

function href(route) {
  return withBase(route.endsWith('/') ? route + 'index.html' : route + '.html')
}

function monthDay(date) {
  const [, m, d] = date.split('-')
  return `${Number(m)} 月 ${Number(d)} 日`
}
</script>

<template>
  <div class="tl">
    <header class="tl-header">
      <h1 class="tl-heading">时间线</h1>
      <p class="tl-sub">所有文章按发布日期倒序排列 · 共 {{ items.length }} 篇</p>
    </header>

    <section v-for="g in years" :key="g.year" class="tl-year">
      <div class="tl-year-label">
        <span>{{ g.year }}</span>
      </div>

      <ul class="tl-list">
        <li v-for="it in g.list" :key="it.route" class="tl-item">
          <a class="tl-link" :href="href(it.route)">
            <time class="tl-date">{{ monthDay(it.date) }}</time>
            <span class="tl-title">{{ it.title }}</span>
          </a>
        </li>
      </ul>
    </section>

    <p v-if="!items.length" class="tl-empty">暂无文章</p>
  </div>
</template>

<style scoped>
.tl {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 24px 96px;
}

/* ---------------- 头部 ---------------- */
.tl-header {
  padding: 56px 0 8px;
  text-align: center;
}

.tl-heading {
  margin: 0;
  font-size: 42px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  background-image: linear-gradient(120deg, var(--vp-c-brand-1) 20%, var(--vp-c-brand-3));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.tl-sub {
  margin: 14px 0 0;
  font-size: 14px;
  line-height: 24px;
  color: var(--vp-c-text-2);
}

/* ---------------- 年份 ---------------- */
.tl-year {
  margin-top: 44px;
}

.tl-year-label {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 4px;
}

.tl-year-label span {
  font-size: 28px;
  font-weight: 800;
  line-height: 1.3;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-brand-1);
}

.tl-year-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background-image: linear-gradient(to right, var(--vp-c-divider), transparent);
}

/* ---------------- 轴 ---------------- */
.tl-list {
  position: relative;
  margin: 0;
  padding: 0 0 0 18px;
  list-style: none;
  border-left: 2px solid var(--vp-c-divider);
}

.tl-item {
  position: relative;
}

.tl-item::before {
  content: '';
  position: absolute;
  top: 16px;
  left: -26px;
  width: 8px;
  height: 8px;
  background-color: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 50%;
  transition: background-color 0.25s, transform 0.25s;
}

.tl-item:hover::before {
  background-color: var(--vp-c-brand-1);
  transform: scale(1.25);
}

.tl-link {
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 9px 12px;
  border-radius: 8px;
  transition: background-color 0.25s;
}

.tl-link:hover {
  background-color: var(--vp-c-default-soft);
}

.tl-date {
  flex: none;
  width: 82px;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-3);
  transition: color 0.25s;
}

.tl-item:hover .tl-date {
  color: var(--vp-c-text-2);
}

.tl-title {
  font-size: 15px;
  line-height: 24px;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.tl-link:hover .tl-title {
  color: var(--vp-c-brand-1);
}

.tl-empty {
  padding: 64px 0;
  text-align: center;
  color: var(--vp-c-text-3);
}

@media (max-width: 640px) {
  .tl {
    padding: 0 16px 64px;
  }

  .tl-header {
    padding-top: 32px;
  }

  .tl-heading {
    font-size: 32px;
  }

  .tl-date {
    width: 70px;
  }
}
</style>
