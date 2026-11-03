// 时间线数据：构建时扫描所有 md 的 frontmatter 日期，生成虚拟模块 `virtual:timeline-data`。
// 供 <Timeline /> 组件（theme/Timeline.vue）与 /en/timeline 页面使用。
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 本文件位于 docs/.vitepress/config/，站点源码根目录是上上层
const CONFIG_DIR = path.dirname(fileURLToPath(import.meta.url))
const SRC_DIR = path.resolve(CONFIG_DIR, '../..')

// 取正文里第一个真正的 H1（跳过 fenced code block 里的 # 注释）
function firstH1(body) {
  let inFence = false
  let fenceChar = ''
  for (const line of body.split(/\r?\n/)) {
    const fence = /^\s*(`{3,}|~{3,})/.exec(line)
    if (fence) {
      if (!inFence) {
        inFence = true
        fenceChar = fence[1][0]
      } else if (fence[1][0] === fenceChar) {
        inFence = false
      }
      continue
    }
    if (inFence) continue
    const h1 = /^#\s+(.+)$/.exec(line)
    if (h1) return h1[1].trim()
  }
  return ''
}

export function scanTimeline() {
  const items = []
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name === 'public' || entry.name.startsWith('.')) continue
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) { walk(full); continue }
      if (!entry.name.endsWith('.md')) continue

      const rel = path.relative(SRC_DIR, full).replace(/\\/g, '/')
      // 首页与友链不是文章，不进时间线
      if (rel === 'index.md' || rel === 'team.md') continue

      const text = fs.readFileSync(full, 'utf-8')
      const fmMatch = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)
      const fm = fmMatch ? fmMatch[1] : ''
      const date = (/^date:\s*(\d{4}-\d{2}-\d{2})/m.exec(fm) || [])[1]
      if (!date) continue

      const seg = rel.split('/')
      const isIndex = entry.name === 'index.md'
      // en/ 下是英文版文章，按语言分开，中英时间线各用各的
      const lang = seg[0] === 'en' ? 'en' : 'zh'

      const h1Title = firstH1(text.slice(fmMatch ? fmMatch[0].length : 0))

      // 「前言」类的分区落地页不算文章，不进时间线
      if (isIndex && (!h1Title || /^(前言|介绍|序|首页|index|preface)$/i.test(h1Title))) continue

      // 没有 H1 时用文件名（如《Linux基础》总集篇），比正文里的小标题更可信
      const base = path.basename(full, '.md')
      const fmTitle = (/^title:\s*(.+)$/m.exec(fm) || [])[1]
      let title = fmTitle || h1Title || base
      // H1 过短（如「学习」「计划」「关基」）时，文件名反而更能代表这篇文章
      if (!fmTitle && h1Title && h1Title.length < 4 && base.length > h1Title.length) {
        title = base
      }
      // day-01 这类标题单独看没有信息量，补上所属目录
      if (/^day[-_ ]?\d+$/i.test(title.trim()) && seg.length >= 2) {
        title = seg[seg.length - 2] + ' ' + title.trim()
      }

      // 目录页保留尾部斜杠，其余去掉 .md
      const route = '/' + rel.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1')
      const section = lang === 'en'
        ? (seg[1] || 'en')
        : (seg[0] === '老博客' && seg.length > 2 ? seg[1] : seg[0].replace(/\.md$/, ''))

      items.push({ date, title: title.trim(), route, section, lang })
    }
  }
  walk(SRC_DIR)
  return items.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
}

export function timelineDataPlugin() {
  const VIRTUAL_ID = 'virtual:timeline-data'
  const RESOLVED = '\0' + VIRTUAL_ID
  return {
    name: 'vp-timeline-data',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED
    },
    load(id) {
      if (id === RESOLVED) return `export default ${JSON.stringify(scanTimeline())}`
    },
    handleHotUpdate({ file, server }) {
      if (!file.endsWith('.md')) return
      const mod = server.moduleGraph.getModuleById(RESOLVED)
      if (mod) server.moduleGraph.invalidateModule(mod)
    },
  }
}
