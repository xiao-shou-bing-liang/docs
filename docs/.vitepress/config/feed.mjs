// 生成中英两个 RSS 2.0 feed，构建结束时写入 dist（由 config/index.mjs 的 buildEnd 调用）。
// 数据来源与时间线一致（frontmatter 的 date + 第一个 H1），所以「进时间线 = 进 RSS」。
import fs from 'node:fs'
import path from 'node:path'
import { scanTimeline } from './timeline.mjs'
import { SITE_BASE, SITE_HOSTNAME } from './site.mjs'

const SITE_URL = SITE_HOSTNAME + SITE_BASE // https://host/docs/

const escapeXml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// 站点路由 → 绝对地址（cleanUrls: false，非目录路由补 .html）
function urlFor(route) {
  const p = route.replace(/^\//, '')
  return SITE_URL + p + (route.endsWith('/') ? '' : '.html')
}

// 从 Markdown 正文里抽一段纯文本摘要
function excerpt(file, max = 220) {
  let body = fs.readFileSync(file, 'utf-8').replace(/^---\r?\n[\s\S]*?\r?\n---/, '')
  body = body
    .replace(/```[\s\S]*?```/g, ' ') // 代码块
    .replace(/<(script|style|template)[\s\S]*?<\/\1>/gi, ' ') // SFC 块，别把 import 当正文
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // 图片
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // 链接保留文字
    .replace(/^#{1,6}\s+.*$/gm, ' ') // 标题
    .replace(/<[^>]+>/g, ' ') // HTML
    .replace(/^\s*>\s?/gm, ' ') // 引用
    .replace(/[*_~`|]/g, '') // 行内标记
    .replace(/\s+/g, ' ')
    .trim()
  return body.length > max ? body.slice(0, max) + '…' : body
}

function renderFeed({ title, link, description, language, self, items }) {
  const lastBuild = items.length ? new Date(items[0].date + 'T00:00:00Z').toUTCString() : new Date().toUTCString()
  const entries = items
    .map((item) => {
      const url = urlFor(item.route)
      const pubDate = new Date(item.date + 'T00:00:00Z').toUTCString()
      return [
        '    <item>',
        `      <title>${escapeXml(item.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${escapeXml(excerpt(item.file))}</description>`,
        '    </item>',
      ].join('\n')
    })
    .join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(title)}</title>`,
    `    <link>${escapeXml(link)}</link>`,
    `    <description>${escapeXml(description)}</description>`,
    `    <language>${language}</language>`,
    `    <lastBuildDate>${lastBuild}</lastBuildDate>`,
    '    <generator>VitePress</generator>',
    `    <atom:link href="${escapeXml(self)}" rel="self" type="application/rss+xml" />`,
    entries,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}

export function generateFeeds(outDir) {
  const items = scanTimeline()
  const feeds = [
    {
      file: 'feed.xml',
      title: '池溟昌胤的博客文档',
      link: SITE_URL,
      description: '计算机基础、前后端开发、项目与生活记录',
      language: 'zh-cn',
      self: SITE_URL + 'feed.xml',
      items: items.filter((item) => item.lang !== 'en'),
    },
    {
      file: 'en/feed.xml',
      title: 'CMCY Notes',
      link: SITE_URL + 'en/',
      description: 'Notes on computer science, web development, projects and everyday life.',
      language: 'en-us',
      self: SITE_URL + 'en/feed.xml',
      items: items.filter((item) => item.lang === 'en'),
    },
  ]

  for (const feed of feeds) {
    const target = path.join(outDir, feed.file)
    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.writeFileSync(target, renderFeed(feed))
    console.log(`[feed] ${feed.file} · ${feed.items.length} items`)
  }
}
