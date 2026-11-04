// 校验 i18n 三处同步：i18n-map.mjs ↔ 磁盘文件 ↔ 两侧边栏
// 用法：npm run check:i18n
// 退出码非 0 表示有不同步项（漏登记、文件缺失、侧边栏漏项/死链）。
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { routePairs } from '../docs/.vitepress/config/i18n-map.mjs'
import { zhThemeConfig } from '../docs/.vitepress/config/zh.mjs'
import { enThemeConfig } from '../docs/.vitepress/config/en.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DOCS = path.join(ROOT, 'docs')

// locale 专属页面：中英各有一份，但不是「对偶翻译」，不进 routePairs
const LOCALE_ONLY = new Set(['/', '/en/', '/时间线', '/en/timeline', '/team', '/en/team'])

function routeOf(file) {
  const rel = path.relative(DOCS, file).replace(/\\/g, '/').replace(/\.md$/, '')
  return '/' + rel.replace(/(^|\/)index$/, '$1')
}

function fileFor(route) {
  const p = route.replace(/^\//, '')
  const md = p === '' ? 'index.md' : p.endsWith('/') ? p + 'index.md' : p + '.md'
  return path.join(DOCS, md)
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, acc)
    else if (entry.name.endsWith('.md')) acc.push(full)
  }
  return acc
}

function flattenLinks(sidebar) {
  const links = []
  const visit = (items) => {
    for (const item of items || []) {
      if (item.link) links.push(item.link)
      if (item.items) visit(item.items)
    }
  }
  for (const value of Object.values(sidebar || {})) visit(value)
  return links
}

const errors = []
const warnings = []

// 1) 对照表双向完整 + 文件存在
const zhPairRoutes = new Set()
const enPairRoutes = new Set()
for (const { zh, en } of routePairs) {
  if (zhPairRoutes.has(zh)) errors.push(`重复的中文路由: ${zh}`)
  if (enPairRoutes.has(en)) errors.push(`重复的英文路由: ${en}`)
  zhPairRoutes.add(zh)
  enPairRoutes.add(en)
  if (!fs.existsSync(fileFor(zh))) errors.push(`中文文件不存在: ${zh} (${path.relative(ROOT, fileFor(zh))})`)
  if (!fs.existsSync(fileFor(en))) errors.push(`英文文件不存在: ${en} (${path.relative(ROOT, fileFor(en))})`)
}

// 2) 磁盘上的页面都必须登记（否则语言切换会掉回首页）
const zhFiles = walk(DOCS).filter((f) => !f.startsWith(path.join(DOCS, 'en') + path.sep))
const enFiles = walk(path.join(DOCS, 'en'))
for (const file of zhFiles) {
  const route = routeOf(file)
  if (!zhPairRoutes.has(route) && !LOCALE_ONLY.has(route)) errors.push(`未登记的中文页面: ${route}`)
}
for (const file of enFiles) {
  const route = routeOf(file)
  if (!enPairRoutes.has(route) && !LOCALE_ONLY.has(route)) errors.push(`未登记的英文页面: ${route}`)
}

// 3) 侧边栏：不漏项、不死链
const sides = [
  { name: 'zh', links: flattenLinks(zhThemeConfig.sidebar), pairRoutes: zhPairRoutes, own: new Set(['/知识/', '/记录/', '/老博客/']) },
  { name: 'en', links: flattenLinks(enThemeConfig.sidebar), pairRoutes: enPairRoutes, own: new Set(['/en/knowledge/', '/en/records/', '/en/archive/']) },
]
for (const side of sides) {
  const seen = new Set(side.links)
  for (const link of side.links) {
    if (!fs.existsSync(fileFor(link))) errors.push(`${side.name} 侧边栏死链: ${link}`)
  }
  for (const route of side.pairRoutes) {
    if (LOCALE_ONLY.has(route)) continue
    if (side.own.has(route)) continue // 栏目首页由分组链接承担
    if (!seen.has(route)) warnings.push(`${side.name} 侧边栏未覆盖: ${route}`)
  }
}

// 4) 简报
const report = [
  `[check:i18n] pairs=${routePairs.length} zhMd=${zhFiles.length} enMd=${enFiles.length}`,
  ...errors.map((e) => `  ✗ ${e}`),
  ...warnings.slice(0, 20).map((w) => `  ! ${w}`),
]
console.log(report.join('\n'))
if (warnings.length > 20) console.log(`  ! ... 另有 ${warnings.length - 20} 条`)
if (errors.length) {
  console.error(`\n${errors.length} 个错误`)
  process.exit(1)
}
console.log('OK')
