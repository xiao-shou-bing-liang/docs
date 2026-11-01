import { defineConfig } from 'vitepress'
import { defineConfigWithTheme } from 'vitepress'
import escookConfig from '@escook/vitepress-theme/config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// ---------------------------------------------------------------- 时间线数据
// 扫描所有 md 的 frontmatter 日期，供「时间线」页面使用
const SRC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function scanTimeline() {
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

      let title = (/^title:\s*(.+)$/m.exec(fm) || [])[1]
      if (!title) {
        const h1 = /^#\s+(.+)$/m.exec(text.slice(fmMatch ? fmMatch[0].length : 0))
        title = h1 ? h1[1] : path.basename(full, '.md')
      }
      // 目录页的标题常常是「前言」之类，换成目录名更有辨识度
      if (isIndex && /^(前言|介绍|序|首页|index)$/i.test(title.trim())) {
        title = seg.length >= 2 ? seg[seg.length - 2] : '主页'
      }

      // 目录页保留尾部斜杠，其余去掉 .md
      const route = '/' + rel.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1')
      const section = seg[0] === '老博客' && seg.length > 2 ? seg[1] : seg[0].replace(/\.md$/, '')

      items.push({ date, title: title.trim(), route, section })
    }
  }
  walk(SRC_DIR)
  return items.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
}

function timelineDataPlugin() {
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

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [timelineDataPlugin()],
  },
  markdown: {
    math: true,
    image: {
      lazyLoading: true
    },
    languageAlias: {
      assembly: 'asm',
      'c#': 'csharp',
      cs: 'csharp',
      'c++': 'cpp',
      sh: 'shell',
      text: 'txt',
    },
    config(md) {
      // Vue 相关文档里大量的 {{ }} 插值写法，在编译成 Vue 模板时会被当成表达式
      // 求值（如 message.split / object.id）导致渲染报错。
      // 这里在 markdown 渲染完成后统一转成 HTML 实体，浏览器端显示仍是 {{ }}。
      const render = md.renderer.render.bind(md.renderer)
      md.renderer.render = (tokens, options, env) =>
        render(tokens, options, env)
          .replace(/\{\{/g, '&#123;&#123;')
          .replace(/\}\}/g, '&#125;&#125;')
    },
  },
  extends: escookConfig,
  lastUpdated: false,
  base: "/docs/",
  head: [["link", { rel: "icon", href: "/滑稽.jpg" }]],
  title: "池溟昌胤的博客文档",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "滑稽.jpg", // 配置logo位置，public目录
    outlineTitle: "文章目录",
    outline: "deep",
    footer: {
      copyright: "noCopyright@ 2024.04.1-present cmcy"
    },
    confetti: false,
    nav: [
      { text: '我的主页', link: '/' },
      { text: '时间线', link: '/时间线' },
      { text: '友情链接', link: '/team.md' },
      { text: '知识', link: '/知识/' },
      { text: '记录', link: '/记录/' },
      { text: '老博客', link: '/老博客/', activeMatch: '^/老博客/' },
    ],
    sidebar: {
      '/老博客/': [
        {
          text: '环境配置',
          link: '/老博客/环境/',
          collapsed: true,
          items: [
            {
              text: '操作系统安装',
              collapsed: true,
              items: [
                { text: '系统安装', link: '/老博客/环境/操作系统环境/系统安装' },
              ]
            },
            {
              text: '编程语言环境配置',
              collapsed: true,
              items: [
                { text: '汇编语言', link: '/老博客/环境/各类语言环境配置/汇编语言' },
              ]
            },
          ]
        },
        {
          text: '计算机基础',
          link: '/老博客/基础知识/',
          collapsed: true,
          items: [
            {
              text: '计算机',
              collapsed: true,
              items: [
                { text: '网络知识基础', link: '/老博客/基础知识/计算机/《Linux网络基础》总集篇' },
                { text: 'Linux基础', link: '/老博客/基础知识/计算机/《Linux基础》总集篇' },
                { text: 'MySQL(未完成)', link: '/老博客/基础知识/计算机/MySQL' },
                { text: '操作系统(未完成)', link: '/老博客/基础知识/计算机/操作系统' },
                { text: '计算机组成原理(未完成)', link: '/老博客/基础知识/计算机/计算机组成原理' },
              ],
            },
            {
              text: '后端开发',
              link: '/老博客/基础知识/后端开发/',
              collapsed: true,
              items: [
                { text: 'javaweb 课程总结', link: '/老博客/基础知识/后端开发/javaweb/课程总结' },
                {
                  text: '苍穹外卖',
                  link: '/老博客/基础知识/后端开发/苍穹外卖/',
                  collapsed: true,
                  items: [
                    { text: 'day-01', link: '/老博客/基础知识/后端开发/苍穹外卖/day-01' },
                    { text: 'day-02', link: '/老博客/基础知识/后端开发/苍穹外卖/day-02' },
                    { text: 'day-03', link: '/老博客/基础知识/后端开发/苍穹外卖/day-03' },
                    { text: 'day-04', link: '/老博客/基础知识/后端开发/苍穹外卖/day-04' },
                    { text: 'day-05', link: '/老博客/基础知识/后端开发/苍穹外卖/day-05' },
                    { text: 'day-06', link: '/老博客/基础知识/后端开发/苍穹外卖/day-06' },
                    { text: 'day-07', link: '/老博客/基础知识/后端开发/苍穹外卖/day-07' },
                    { text: 'day-08', link: '/老博客/基础知识/后端开发/苍穹外卖/day-08' },
                    { text: 'day-09', link: '/老博客/基础知识/后端开发/苍穹外卖/day-09' },
                  ],
                },
                { text: '学情管理系统', link: '/老博客/基础知识/后端开发/学情管理系统/' },
                { text: 'Gitea + Jenkins实现CI/CD', link: '/老博客/基础知识/后端开发/学情管理系统/Gitea与Jenkins实现CI-CD' },
              ],
            },
            {
              text: '前端开发',
              link: '/老博客/基础知识/前端开发/',
              collapsed: true,
              items: [
                {
                  text: 'Vue3 知识库',
                  link: '/老博客/基础知识/前端开发/Vue3/',
                  collapsed: true,
                  items: [
                    { text: '简介', link: '/老博客/基础知识/前端开发/Vue3/简介' },
                    { text: '快速上手', link: '/老博客/基础知识/前端开发/Vue3/快速上手' },
                    { text: '创建一个Vue应用', link: '/老博客/基础知识/前端开发/Vue3/创建一个Vue应用' },
                    { text: '模板语法', link: '/老博客/基础知识/前端开发/Vue3/模板语法' },
                    { text: '响应式基础', link: '/老博客/基础知识/前端开发/Vue3/响应式基础' },
                    { text: '计算属性', link: '/老博客/基础知识/前端开发/Vue3/计算属性' },
                    { text: '描述下对Vue生命周期的理解', link: '/老博客/基础知识/前端开发/Vue3/描述下对Vue生命周期的理解' },
                    {
                      text: '现代前端开发必知',
                      link: '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/',
                      collapsed: true,
                      items: [
                        { text: '01-如何成为现代前端六边形战士', link: '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/01-如何成为现代前端六边形战士' },
                        { text: '02-上期回顾与章节概览', link: '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/02-上期回顾与章节概览' },
                        { text: '03-计算机网络上', link: '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/03-计算机网络上' },
                        { text: '04-计算机网络下', link: '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/04-计算机网络下' },
                        { text: '05-编程语言-ES标准-JS引擎和运行时', link: '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/05-编程语言-ES标准-JS引擎和运行时' },
                        { text: '06-简单又复杂的工具链', link: '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/06-简单又复杂的工具链' },
                        { text: '07-构建用户界面的新姿势', link: '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/07-构建用户界面的新姿势' },
                        { text: '08-应用框架', link: '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/08-应用框架' },
                        { text: '09-性能优化方案', link: '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/09-性能优化方案' },
                        { text: '10-用户体验', link: '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/10-用户体验' },
                      ],
                    },
                    {
                      text: 'CSS 实战',
                      link: '/老博客/基础知识/前端开发/Vue3/CSS/',
                      collapsed: true,
                      items: [
                        { text: 'CSS爆肝', link: '/老博客/基础知识/前端开发/Vue3/CSS/' },
                        { text: 'header主体框架', link: '/老博客/基础知识/前端开发/Vue3/CSS/header主体框架' },
                        { text: 'header动画', link: '/老博客/基础知识/前端开发/Vue3/CSS/header动画' },
                        { text: '重要的讲座', link: '/老博客/基础知识/前端开发/Vue3/CSS/重要的讲座' },
                      ],
                    },
                  ],
                },
                {
                  text: '工程实践',
                  link: '/老博客/基础知识/前端开发/工程实践/',
                  collapsed: true,
                  items: [
                    { text: '动态首页配置', link: '/老博客/基础知识/前端开发/工程实践/动态首页配置' },
                    { text: '主要页面逻辑', link: '/老博客/基础知识/前端开发/工程实践/主要页面逻辑' },
                    { text: '新的DOM操作', link: '/老博客/基础知识/前端开发/工程实践/新的DOM操作' },
                    { text: '文件上传', link: '/老博客/基础知识/前端开发/工程实践/文件上传' },
                    { text: 'ES6异步处理', link: '/老博客/基础知识/前端开发/工程实践/ES6异步处理' },
                  ],
                },
              ],
            },
          ],
        },
        {
          text: '个人经历',
          link: '/老博客/个人经历/',
          collapsed: true,
          items: [
            {
              text: '日常记录',
              collapsed: true,
              items: [
                { text: '第一次', link: '/老博客/个人经历/日常记录/第一次' },
                { text: '第二次', link: '/老博客/个人经历/日常记录/第二次' },
                { text: '第三次', link: '/老博客/个人经历/日常记录/第三次' },
                { text: '第四次', link: '/老博客/个人经历/日常记录/第四次' },
                { text: '第五次', link: '/老博客/个人经历/日常记录/第五次' },
                { text: '第六次', link: '/老博客/个人经历/日常记录/第六次' },
                { text: '第七次', link: '/老博客/个人经历/日常记录/第七次' },
                { text: '第八次', link: '/老博客/个人经历/日常记录/第八次' },
                { text: '第九次', link: '/老博客/个人经历/日常记录/第九次' },
              ],
            },
            {
              text: '阶段总结',
              collapsed: true,
              items: [
                { text: '重启博客', link: '/老博客/个人经历/总结/重启博客' },
                { text: '重现老博客文章', link: '/老博客/个人经历/总结/重现老博客文章' },
                { text: '大一下期末总结', link: '/老博客/个人经历/总结/大一下期末总结' },
                { text: '大二上开学总结', link: '/老博客/个人经历/总结/大二上开学总结' },
                { text: '大二上半段总结', link: '/老博客/个人经历/总结/大二上半段总结' },
                { text: '大二下开学总结', link: '/老博客/个人经历/总结/大二下开学总结' },
              ],
            },
            {
              text: '面试经历',
              link: '/老博客/个人经历/面试经历/',
              collapsed: true,
              items: [
                { text: '第一次面试', link: '/老博客/个人经历/面试经历/第一次面试' },
              ],
            },
            {
              text: '实习工作',
              link: '/老博客/个人经历/实习工作/',
              collapsed: true,
              items: [
                { text: '第一周工作', link: '/老博客/个人经历/实习工作/第一周工作' },
                { text: '第二周工作', link: '/老博客/个人经历/实习工作/第二周工作' },
                { text: '会议记录', link: '/老博客/个人经历/实习工作/会议记录' },
                {
                  text: '网络安全',
                  link: '/老博客/个人经历/实习工作/网络安全/',
                  collapsed: true,
                  items: [
                    { text: '关键基础设施保护', link: '/老博客/个人经历/实习工作/网络安全/关键基础设施保护' },
                    { text: '攻防与终端安全', link: '/老博客/个人经历/实习工作/网络安全/攻防与终端安全' },
                    { text: 'Struts2 S2-045漏洞态势分析', link: '/老博客/个人经历/实习工作/网络安全/Struts2-S2-045漏洞态势分析' },
                    { text: '烽台学习平台建议', link: '/老博客/个人经历/实习工作/网络安全/烽台学习平台建议' },
                  ],
                },
              ],
            },
          ],
        },
        {
          text: '创新基地',
          link: '/老博客/创新基地/',
          collapsed: true,
          items: [
            { text: '第一次培训', link: '/老博客/创新基地/第一次培训' },
            { text: '第二次培训', link: '/老博客/创新基地/第二次培训' },
            { text: '新基地官网进度', link: '/老博客/创新基地/新基地官网进度' },
          ],
        },
      ],
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/8cmcy8' },
      {
        icon: {
          svg: '<svg t="1711787025551" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4371" width="200" height="200"><path d="M512 1024C229.2224 1024 0 794.7776 0 512S229.2224 0 512 0s512 229.2224 512 512-229.2224 512-512 512z m259.1488-568.8832H480.4096a25.2928 25.2928 0 0 0-25.2928 25.2928l-0.0256 63.2064c0 13.952 11.3152 25.2928 25.2672 25.2928h177.024c13.9776 0 25.2928 11.3152 25.2928 25.2672v12.6464a75.8528 75.8528 0 0 1-75.8528 75.8528H366.592a25.2928 25.2928 0 0 1-25.2672-25.2928v-240.1792a75.8528 75.8528 0 0 1 75.8272-75.8528h353.9456a25.2928 25.2928 0 0 0 25.2672-25.2928l0.0768-63.2064a25.2928 25.2928 0 0 0-25.2672-25.2928H417.152a189.6192 189.6192 0 0 0-189.6192 189.6448v353.9456c0 13.9776 11.3152 25.2928 25.2928 25.2928h372.9408a170.6496 170.6496 0 0 0 170.6496-170.6496v-145.408a25.2928 25.2928 0 0 0-25.2928-25.2672z" fill="#C71D23" p-id="4372"></path></svg>'
        },
        link: 'https://gitee.com/chimingchangyin/docs'
      },
      {
        icon: {
          svg: '<svg t="1711787119262" class="icon" viewBox="0 0 1129 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8259" width="200" height="200"><path d="M234.909 9.656a80.468 80.468 0 0 1 68.398 0 167.374 167.374 0 0 1 41.843 30.578l160.937 140.82h115.07l160.936-140.82a168.983 168.983 0 0 1 41.843-30.578A80.468 80.468 0 0 1 930.96 76.445a80.468 80.468 0 0 1-17.703 53.914 449.818 449.818 0 0 1-35.406 32.187 232.553 232.553 0 0 1-22.531 18.508h100.585a170.593 170.593 0 0 1 118.289 53.109 171.397 171.397 0 0 1 53.914 118.288v462.693a325.897 325.897 0 0 1-4.024 70.007 178.64 178.64 0 0 1-80.468 112.656 173.007 173.007 0 0 1-92.539 25.75h-738.7a341.186 341.186 0 0 1-72.421-4.024A177.835 177.835 0 0 1 28.91 939.065a172.202 172.202 0 0 1-27.36-92.539V388.662a360.498 360.498 0 0 1 0-66.789A177.03 177.03 0 0 1 162.487 178.64h105.414c-16.899-12.07-31.383-26.555-46.672-39.43a80.468 80.468 0 0 1-25.75-65.984 80.468 80.468 0 0 1 39.43-63.57M216.4 321.873a80.468 80.468 0 0 0-63.57 57.937 108.632 108.632 0 0 0 0 30.578v380.615a80.468 80.468 0 0 0 55.523 80.469 106.218 106.218 0 0 0 34.601 5.632h654.208a80.468 80.468 0 0 0 76.444-47.476 112.656 112.656 0 0 0 8.047-53.109v-354.06a135.187 135.187 0 0 0 0-38.625 80.468 80.468 0 0 0-52.304-54.719 129.554 129.554 0 0 0-49.89-7.242H254.22a268.764 268.764 0 0 0-37.82 0z m0 0" fill="#20B0E3" p-id="8260"></path><path d="M348.369 447.404a80.468 80.468 0 0 1 55.523 18.507 80.468 80.468 0 0 1 28.164 59.547v80.468a80.468 80.468 0 0 1-16.094 51.5 80.468 80.468 0 0 1-131.968-9.656 104.609 104.609 0 0 1-10.46-54.719v-80.468a80.468 80.468 0 0 1 70.007-67.593z m416.02 0a80.468 80.468 0 0 1 86.102 75.64v80.468a94.148 94.148 0 0 1-12.07 53.11 80.468 80.468 0 0 1-132.773 0 95.757 95.757 0 0 1-12.875-57.133V519.02a80.468 80.468 0 0 1 70.007-70.812z m0 0" fill="#20B0E3" p-id="8261"></path></svg>'
        },
        link: 'https://space.bilibili.com/293121039'
      },
    ]
  }
})
