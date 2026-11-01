<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import data from 'virtual:timeline-data'

// 数据由 config.mjs 里的 vp-timeline-data 插件在构建时扫描 frontmatter 生成
const sections = computed(() => [
  '全部',
  ...Array.from(new Set(data.map((d) => d.section))).sort(),
])

const active = ref('全部')

const items = computed(() =>
  active.value === '全部' ? data : data.filter((d) => d.section === active.value),
)

const years = computed(() => {
  const map = new Map()
  for (const it of items.value) {
    const y = it.date.slice(0, 4)
    if (!map.has(y)) map.set(y, [])
    map.get(y).push(it)
  }
  return Array.from(map, ([year, list]) => ({ year, list }))
})

function href(route) {
  const p = route.endsWith('/') ? route + 'index.html' : route + '.html'
  return withBase(p)
}

function monthDay(date) {
  const [, m, d] = date.split('-')
  return `${Number(m)} 月 ${Number(d)} 日`
}
</script>

<template>
  <div class="tl">
    <div class="tl-bar">
      <button
        v-for="s in sections"
        :key="s"
        class="tl-chip"
        :class="{ 'is-active': s === active }"
        @click="active = s"
      >
        {{ s }}
      </button>
      <span class="tl-count">{{ items.length }} 篇</span>
    </div>

    <section v-for="g in years" :key="g.year" class="tl-year">
      <h2 class="tl-year-label">{{ g.year }}</h2>
      <ul class="tl-list">
        <li v-for="it in g.list" :key="it.route" class="tl-item">
          <a class="tl-link" :href="href(it.route)">
            <time class="tl-date">{{ monthDay(it.date) }}</time>
            <span class="tl-title">{{ it.title }}</span>
            <span class="tl-tag">{{ it.section }}</span>
          </a>
        </li>
      </ul>
    </section>

    <p v-if="!items.length" class="tl-empty">暂无文章</p>
  </div>
</template>

<style scoped>
.tl {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 24px 64px;
}

/* 筛选条 */
.tl-bar {
  position: sticky;
  top: var(--vp-nav-height, 64px);
  z-index: 5;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  margin-bottom: 8px;
  background-color: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.tl-chip {
  padding: 4px 12px;
  font-size: 13px;
  line-height: 20px;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-default-soft);
  border-radius: 999px;
  transition: color 0.2s, background-color 0.2s;
}

.tl-chip:hover {
  color: var(--vp-c-text-1);
}

.tl-chip.is-active {
  color: var(--vp-c-white);
  background-color: var(--vp-c-brand-1);
}

.tl-count {
  margin-left: auto;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

/* 年份 */
.tl-year {
  margin-top: 32px;
}

.tl-year-label {
  margin: 0 0 8px;
  padding: 0;
  font-size: 26px;
  font-weight: 700;
  line-height: 34px;
  border: 0;
}

/* 时间轴 */
.tl-list {
  position: relative;
  margin: 0;
  padding: 0 0 0 20px;
  list-style: none;
  border-left: 2px solid var(--vp-c-divider);
}

.tl-item {
  position: relative;
}

.tl-item::before {
  content: '';
  position: absolute;
  top: 15px;
  left: -27px;
  width: 9px;
  height: 9px;
  background-color: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 50%;
  transition: background-color 0.2s;
}

.tl-item:hover::before {
  background-color: var(--vp-c-brand-1);
}

.tl-link {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.tl-link:hover {
  background-color: var(--vp-c-default-soft);
}

.tl-date {
  flex: none;
  width: 84px;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-3);
}

.tl-title {
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
  color: var(--vp-c-text-1);
}

.tl-link:hover .tl-title {
  color: var(--vp-c-brand-1);
}

.tl-tag {
  margin-left: auto;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.tl-empty {
  padding: 48px 0;
  text-align: center;
  color: var(--vp-c-text-3);
}

@media (max-width: 640px) {
  .tl-tag {
    display: none;
  }

  .tl-date {
    width: 72px;
  }
}
</style>
