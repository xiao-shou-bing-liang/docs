// VitePress 站点主配置
// 多语言方案参考官方文档：https://vitepress.dev/guide/i18n
//
// 目录结构：
//   docs/.vitepress/config/index.mjs   ← 当前文件：共享配置 + locales 组装
//   docs/.vitepress/config/zh.mjs      ← 简体中文（默认语言 / root locale）的导航、侧边栏、文案
//   docs/.vitepress/config/en.mjs      ← English（/en/）的导航、侧边栏、文案
//   docs/.vitepress/config/timeline.mjs← 时间线虚拟数据模块
//
// 注意：locale 的 themeConfig 与顶层 themeConfig 是「浅合并」——
// 顶层写两种语言共用的东西（logo、社交链接、页脚、搜索），
// 语言之间不同的东西（nav、sidebar、outline、文案）写进各自 locale。
import { defineConfig } from 'vitepress'
import escookConfig from '@escook/vitepress-theme/config'
import { timelineDataPlugin } from './timeline.mjs'
import { zhThemeConfig } from './zh.mjs'
import { enThemeConfig } from './en.mjs'
import { routePairs } from './i18n-map.mjs'
import { SITE_BASE, SITE_HOSTNAME } from './site.mjs'
import { generateFeeds } from './feed.mjs'

// 站点地址 / base 见 config/site.mjs；这里只做 i18n 路由表的派生
const PAIR_OF = new Map()
const i18nRoutes = {}
for (const { zh, en } of routePairs) {
  i18nRoutes[zh] = en
  i18nRoutes[en] = zh
  PAIR_OF.set(zh, { zh, en })
  PAIR_OF.set(en, { zh, en })
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 第三方主题的默认项（markdown.lineNumbers、themeConfig.outline 等）
  extends: escookConfig,

  // 部署在 GitHub Pages 的项目页：https://xiao-shou-bing-liang.github.io/docs/
  // 按官方文档（guide/deploy → Setting a Public Base Path）：部署到 user.github.io/repo/
  // 时 base 必须是 "/repo/"，否则静态资源和站内链接都会 404
  base: SITE_BASE,

  // head 里的地址不会被自动拼接 base，需要手动带上
  head: [['link', { rel: 'icon', href: SITE_BASE + '滑稽.jpg' }]],

  // 用 frontmatter 里的 date 展示发布日期，不读 git 历史
  lastUpdated: false,

  // ---------------------------------------------------------------- sitemap
  // 官方文档：https://vitepress.dev/guide/sitemap-generation
  // item.url 是「相对 srcDir 的页面路径」（不带 base），这里补 base；
  // 同时按 i18n-map.mjs 给每对中英页面加 hreflang alternate。
  sitemap: {
    hostname: SITE_HOSTNAME,
    transformItems: (items) =>
      items.map((item) => {
        const route = '/' + item.url.replace(/\.html$/, '')
        const pair = PAIR_OF.get(route)
        const withBase = (r) =>
          SITE_BASE + r.replace(/^\//, '') + (r.endsWith('/') ? '' : '.html')
        return {
          ...item,
          url: SITE_BASE + item.url,
          links: pair
            ? [
                { lang: 'zh-CN', url: withBase(pair.zh) },
                { lang: 'en-US', url: withBase(pair.en) },
              ]
            : (item.links || []).map((link) => ({
                ...link,
                url: SITE_BASE + link.url.replace(/^\//, ''),
              })),
        }
      }),
  },

  // ---------------------------------------------------------------- 多语言
  // root = 简体中文（文件在 docs/ 下，URL 不带语言前缀）
  // en   = English（文件在 docs/en/ 下，URL 前缀 /en/）
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: '池溟昌胤的博客文档',
      description: '计算机基础、前后端开发、项目与生活记录',
      // 构建期写进页面的文案（::: tip 标题、> [!NOTE] 标题、代码复制按钮），
      // 每种语言可以各写一份，见 https://vitepress.dev/guide/i18n
      markdown: {
        container: {
          noteLabel: '注意',
          tipLabel: '提示',
          infoLabel: '信息',
          importantLabel: '重要',
          warningLabel: '警告',
          cautionLabel: '小心',
          dangerLabel: '危险',
          detailsLabel: '详情',
        },
        codeCopyButton: {
          tooltipText: '复制代码',
          copiedText: '已复制',
        },
      },
      themeConfig: zhThemeConfig,
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'CMCY Notes',
      description:
        'Notes on computer science, web development, projects and everyday life.',
      markdown: {
        container: {
          noteLabel: 'Note',
          tipLabel: 'Tip',
          infoLabel: 'Info',
          importantLabel: 'Important',
          warningLabel: 'Warning',
          cautionLabel: 'Caution',
          dangerLabel: 'Danger',
          detailsLabel: 'Details',
        },
        codeCopyButton: {
          tooltipText: 'Copy code',
          copiedText: 'Copied',
        },
      },
      themeConfig: enThemeConfig,
    },
  },

  themeConfig: {
    // ------------------------------------------------ 两种语言共用（浅合并时被 locale 覆盖同名项）
    // https://vitepress.dev/reference/default-theme-config
    logo: '/滑稽.jpg', // 必须以 / 开头，否则 withBase 不会拼接 base，内页会 404
    confetti: false,
    // footer 是各语言分开写的（许可证文案不同），见 zh.mjs / en.mjs

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiao-shou-bing-liang' },
      {
        icon: {
          svg: '<svg t="1711787119262" class="icon" viewBox="0 0 1129 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8259" width="200" height="200"><path d="M234.909 9.656a80.468 80.468 0 0 1 68.398 0 167.374 167.374 0 0 1 41.843 30.578l160.937 140.82h115.07l160.936-140.82a168.983 168.983 0 0 1 41.843-30.578A80.468 80.468 0 0 1 930.96 76.445a80.468 80.468 0 0 1-17.703 53.914 449.818 449.818 0 0 1-35.406 32.187 232.553 232.553 0 0 1-22.531 18.508h100.585a170.593 170.593 0 0 1 118.289 53.109 171.397 171.397 0 0 1 53.914 118.288v462.693a325.897 325.897 0 0 1-4.024 70.007 178.64 178.64 0 0 1-80.468 112.656 173.007 173.007 0 0 1-92.539 25.75h-738.7a341.186 341.186 0 0 1-72.421-4.024A177.835 177.835 0 0 1 28.91 939.065a172.202 172.202 0 0 1-27.36-92.539V388.662a360.498 360.498 0 0 1 0-66.789A177.03 177.03 0 0 1 162.487 178.64h105.414c-16.899-12.07-31.383-26.555-46.672-39.43a80.468 80.468 0 0 1-25.75-65.984 80.468 80.468 0 0 1 39.43-63.57M216.4 321.873a80.468 80.468 0 0 0-63.57 57.937 108.632 108.632 0 0 0 0 30.578v380.615a80.468 80.468 0 0 0 55.523 80.469 106.218 106.218 0 0 0 34.601 5.632h654.208a80.468 80.468 0 0 0 76.444-47.476 112.656 112.656 0 0 0 8.047-53.109v-354.06a135.187 135.187 0 0 0 0-38.625 80.468 80.468 0 0 0-52.304-54.719 129.554 129.554 0 0 0-49.89-7.242H254.22a268.764 268.764 0 0 0-37.82 0z m0 0" fill="#20B0E3" p-id="8260"></path><path d="M348.369 447.404a80.468 80.468 0 0 1 55.523 18.507 80.468 80.468 0 0 1 28.164 59.547v80.468a80.468 80.468 0 0 1-16.094 51.5 80.468 80.468 0 0 1-131.968-9.656 104.609 104.609 0 0 1-10.46-54.719v-80.468a80.468 80.468 0 0 1 70.007-67.593z m416.02 0a80.468 80.468 0 0 1 86.102 75.64v80.468a94.148 94.148 0 0 1-12.07 53.11 80.468 80.468 0 0 1-132.773 0 95.757 95.757 0 0 1-12.875-57.133V519.02a80.468 80.468 0 0 1 70.007-70.812z m0 0" fill="#20B0E3" p-id="8261"></path></svg>',
        },
        link: 'https://space.bilibili.com/293121039',
      },
    ],

    // 语言切换用的双向路由表（数据源：config/i18n-map.mjs）
    i18nRoutes,

    // 切换语言时留在「同一篇文章」。
    // 对照表来自 config/i18n-map.mjs，经 themeConfig.i18nRoutes 传进来：
    // 这个函数会被序列化到客户端执行，不能引用模块作用域变量。
    // 官方文档：https://vitepress.dev/reference/default-theme-config#i18nrouting
    i18nRouting(data, route, targetLocale) {
      const pairs = (data.site.value.themeConfig && data.site.value.themeConfig.i18nRoutes) || {}
      const relativePath = (route.data && route.data.relativePath) || ''
      const current =
        '/' + relativePath.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1')
      const target = pairs[current]
      if (target) {
        if (target.endsWith('/') || data.site.value.cleanUrls) return target
        return target + '.html'
      }
      // 没有对应译文的页面就回该语言的首页
      return targetLocale === 'root' ? '/' : '/en/'
    },

    // ---------------------------------------------------------------- 搜索
    // 本地搜索的多语言文案：locales 里的 key 是 localeIndex（root / en），
    // 英文不写就用官方内置的英文默认文案。
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '清除查询条件',
                backButtonTitle: '关闭搜索',
                noResultsText: '无法找到相关结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '输入',
                  navigateText: '切换',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'Esc',
                },
              },
            },
          },
        },
      },
    },
  },

  markdown: {
    math: true,
    image: {
      lazyLoading: true,
    },
    languageAlias: {
      assembly: 'asm',
      'c#': 'csharp',
      cs: 'csharp',
      'c++': 'cpp',
      sh: 'shell',
      text: 'txt',
    },
    // Vue 相关文档里大量的 {{ }} 插值写法，在编译成 Vue 模板时会被当成表达式
    // 求值（如 message.split / object.id）导致渲染报错。
    // 这里在 markdown 渲染完成后统一转成 HTML 实体；Vue 模板编译器解析时会把
    // 实体解码回 {{，但此时已经不会再当作插值，浏览器里显示仍是 {{ }}。
    // 注意：产物 HTML 里看到的是 {{ 而不是 &#123;，不要误以为补丁没生效——
    // 删掉它 Vue3/响应式基础.md 之类的页面会直接在 SSR 阶段抛错。
    config(md) {
      const render = md.renderer.render.bind(md.renderer)
      md.renderer.render = (tokens, options, env) =>
        render(tokens, options, env)
          .replace(/\{\{/g, '&#123;&#123;')
          .replace(/\}\}/g, '&#125;&#125;')
    },
  },

  // 构建结束：生成中英两份 RSS（数据源与时间线一致）
  buildEnd(siteConfig) {
    generateFeeds(siteConfig.outDir)
  },

  // 每页 head 加当前语言的 RSS 入口（head 不会自动拼 base）
  transformHead({ pageData }) {
    const isEn = String(pageData.relativePath).startsWith('en/')
    return [
      [
        'link',
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: isEn ? 'CMCY Notes' : '池溟昌胤的博客文档',
          href: SITE_BASE + (isEn ? 'en/feed.xml' : 'feed.xml'),
        },
      ],
    ]
  },

  vite: {
    plugins: [timelineDataPlugin()],
  },
})
