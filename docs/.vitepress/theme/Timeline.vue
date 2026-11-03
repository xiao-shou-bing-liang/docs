<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import data from 'virtual:timeline-data'

// 数据由 config/timeline.mjs 里的 vp-timeline-data 插件在构建时扫描 frontmatter 生成（已按日期倒序）
const all = data

// 组件文案跟随当前页面所在语言（/en/ 下为英文）
const { lang } = useData()
const isEn = computed(() => lang.value.toLowerCase().startsWith('en'))

// 中英文章各一条时间线：英文页只看 /en/ 下的条目，中文页只看其余条目
const items = computed(() => all.filter((it) => (isEn.value ? it.lang === 'en' : it.lang !== 'en')))

const labels = computed(() =>
  isEn.value
    ? {
        heading: 'Timeline',
        sub: (n) => `Every post, newest first · ${n} in total`,
        empty: 'No posts yet.',
      }
    : {
        heading: '时间线',
        sub: (n) => `所有文章按发布日期倒序排列 · 共 ${n} 篇`,
        empty: '暂无文章',
      }
)

const dateFmt = computed(
  () => new Intl.DateTimeFormat(lang.value, { month: 'short', day: 'numeric', timeZone: 'UTC' })
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
  return withBase(route.endsWith('/') ? route + 'index.html' : route + '.html')
}

function monthDay(date) {
  const [y, m, d] = date.split('-').map(Number)
  if (!isEn.value) return `${m} 月 ${d} 日`
  return dateFmt.value.format(new Date(Date.UTC(y, m - 1, d)))
}
</script>

<template>
  <div class="tl">
    <header class="tl-header">
      <h1 class="tl-heading">{{ labels.heading }}</h1>
      <p class="tl-sub">{{ labels.sub(items.length) }}</p>
    </header>

    <!-- 页面里写在 <Timeline> ... </Timeline> 之间的说明文字（如英文页的 NOTE）
         放在这里才能跟着时间线一起居中，否则会顶到整页宽度 -->
    <div v-if="$slots.default" class="tl-intro">
      <slot />
    </div>

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

    <p v-if="!items.length" class="tl-empty">{{ labels.empty }}</p>
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

/* ---------------- 页面附带的说明（可选插槽） ---------------- */
.tl-intro {
  margin-top: 28px;
}

/* 说明块里的提示框自带上下 margin，居中容器内再收紧一点 */
.tl-intro :deep(.custom-block) {
  margin: 0;
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
  margin: 0;
  padding: 0;
  list-style: none;
}

.tl-item {
  position: relative;
  padding-left: 34px;
}

/* 轨道：每个条目自带一段，首尾相接天然无缝 */
.tl-item::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 5px;
  width: 2px;
  background-color: var(--vp-c-divider);
}

/* 圆点：圆心与轨道中心（6px）对齐 */
.tl-item::after {
  content: '';
  position: absolute;
  top: 15px;
  left: 0;
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  background-color: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 50%;
  transition: background-color 0.25s, transform 0.25s;
}

.tl-item:hover::after {
  background-color: var(--vp-c-brand-1);
  transform: scale(1.15);
}

/* 首项：轨道从圆点开始，不向上探出 */
.tl-list > .tl-item:first-child::before {
  top: 21px;
}

/* 末项：轨道到圆点结束，不向下探出 */
.tl-list > .tl-item:last-child::before {
  bottom: auto;
  height: 21px;
}

/* 该年只有一条时不需要轨道 */
.tl-list > .tl-item:first-child:last-child::before {
  display: none;
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
