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

// ---------------------------------------------------------------- 站点根路径
// GitHub Pages 项目页地址为 https://<owner>.github.io/<repo>/，故 base 取 /<repo>/
const SITE_BASE = '/docs/'

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
  // 注意：VitePress 生成的 item.url 是「相对 srcDir 的页面路径」（不带开头的 /），
  // 不会自动拼 base；本站部署在 /docs/ 下，所以这里手动补上，否则 sitemap 里的
  // 中文页会指到域名根目录。
  sitemap: {
    hostname: 'https://xiao-shou-bing-liang.github.io',
    transformItems: (items) =>
      items.map((item) => ({
        ...item,
        url: SITE_BASE + item.url.replace(/^\//, ''),
        links: item.links?.map((link) => ({
          ...link,
          url: SITE_BASE + link.url.replace(/^\//, ''),
        })),
      })),
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

    // 切换语言时留在「同一篇文章」。
    // VitePress 默认只会给路径加语言前缀，而本站英文用的是英文 slug
    // （/知识/项目/反无/ ↔ /en/knowledge/projects/counter-uav/），路径对不上，
    // 所以用一张对照表自己算目标地址。
    // 官方文档：https://vitepress.dev/reference/default-theme-config#i18nrouting
    // 注意：这个函数会被序列化到客户端执行，对照表必须写在函数体内部。
    i18nRouting(data, route, targetLocale) {
      const pairs = {
        '/知识/': '/en/knowledge/',
        '/en/knowledge/': '/知识/',
        '/知识/项目/': '/en/knowledge/projects/',
        '/en/knowledge/projects/': '/知识/项目/',
        '/知识/项目/人脸/': '/en/knowledge/projects/face-recognition/',
        '/en/knowledge/projects/face-recognition/': '/知识/项目/人脸/',
        '/知识/项目/人脸测试/': '/en/knowledge/projects/face-recognition-testing/',
        '/en/knowledge/projects/face-recognition-testing/': '/知识/项目/人脸测试/',
        '/知识/项目/反无/': '/en/knowledge/projects/counter-uav/',
        '/en/knowledge/projects/counter-uav/': '/知识/项目/反无/',
        '/老博客/': '/en/archive/',
        '/en/archive/': '/老博客/',
        '/老博客/个人经历/': '/en/archive/personal/',
        '/en/archive/personal/': '/老博客/个人经历/',
        '/老博客/个人经历/实习工作/': '/en/archive/personal/internship/',
        '/en/archive/personal/internship/': '/老博客/个人经历/实习工作/',
        '/老博客/个人经历/实习工作/会议记录': '/en/archive/personal/internship/meeting-notes',
        '/en/archive/personal/internship/meeting-notes': '/老博客/个人经历/实习工作/会议记录',
        '/老博客/个人经历/实习工作/第一周工作': '/en/archive/personal/internship/week-1',
        '/en/archive/personal/internship/week-1': '/老博客/个人经历/实习工作/第一周工作',
        '/老博客/个人经历/实习工作/第二周工作': '/en/archive/personal/internship/week-2',
        '/en/archive/personal/internship/week-2': '/老博客/个人经历/实习工作/第二周工作',
        '/老博客/个人经历/实习工作/网络安全/': '/en/archive/personal/internship/cybersecurity/',
        '/en/archive/personal/internship/cybersecurity/': '/老博客/个人经历/实习工作/网络安全/',
        '/老博客/个人经历/实习工作/网络安全/Struts2-S2-045漏洞态势分析': '/en/archive/personal/internship/cybersecurity/struts2-s2-045-vulnerability-analysis',
        '/en/archive/personal/internship/cybersecurity/struts2-s2-045-vulnerability-analysis': '/老博客/个人经历/实习工作/网络安全/Struts2-S2-045漏洞态势分析',
        '/老博客/个人经历/实习工作/网络安全/关键基础设施保护': '/en/archive/personal/internship/cybersecurity/critical-infrastructure-protection',
        '/en/archive/personal/internship/cybersecurity/critical-infrastructure-protection': '/老博客/个人经历/实习工作/网络安全/关键基础设施保护',
        '/老博客/个人经历/实习工作/网络安全/攻防与终端安全': '/en/archive/personal/internship/cybersecurity/offense-defense-and-endpoint-security',
        '/en/archive/personal/internship/cybersecurity/offense-defense-and-endpoint-security': '/老博客/个人经历/实习工作/网络安全/攻防与终端安全',
        '/老博客/个人经历/实习工作/网络安全/烽台学习平台建议': '/en/archive/personal/internship/cybersecurity/fengtai-learning-platform-suggestions',
        '/en/archive/personal/internship/cybersecurity/fengtai-learning-platform-suggestions': '/老博客/个人经历/实习工作/网络安全/烽台学习平台建议',
        '/老博客/个人经历/总结/大一下期末总结': '/en/archive/personal/summaries/freshman-spring-final-review',
        '/en/archive/personal/summaries/freshman-spring-final-review': '/老博客/个人经历/总结/大一下期末总结',
        '/老博客/个人经历/总结/大二上半段总结': '/en/archive/personal/summaries/sophomore-fall-mid-term-review',
        '/en/archive/personal/summaries/sophomore-fall-mid-term-review': '/老博客/个人经历/总结/大二上半段总结',
        '/老博客/个人经历/总结/大二上开学总结': '/en/archive/personal/summaries/sophomore-fall-kickoff',
        '/en/archive/personal/summaries/sophomore-fall-kickoff': '/老博客/个人经历/总结/大二上开学总结',
        '/老博客/个人经历/总结/大二下开学总结': '/en/archive/personal/summaries/sophomore-spring-kickoff',
        '/en/archive/personal/summaries/sophomore-spring-kickoff': '/老博客/个人经历/总结/大二下开学总结',
        '/老博客/个人经历/总结/重启博客': '/en/archive/personal/summaries/restarting-the-blog',
        '/en/archive/personal/summaries/restarting-the-blog': '/老博客/个人经历/总结/重启博客',
        '/老博客/个人经历/总结/重现老博客文章': '/en/archive/personal/summaries/rebuilding-old-posts',
        '/en/archive/personal/summaries/rebuilding-old-posts': '/老博客/个人经历/总结/重现老博客文章',
        '/老博客/个人经历/日常记录/第一次': '/en/archive/personal/daily/entry-1',
        '/en/archive/personal/daily/entry-1': '/老博客/个人经历/日常记录/第一次',
        '/老博客/个人经历/日常记录/第七次': '/en/archive/personal/daily/entry-7',
        '/en/archive/personal/daily/entry-7': '/老博客/个人经历/日常记录/第七次',
        '/老博客/个人经历/日常记录/第三次': '/en/archive/personal/daily/entry-3',
        '/en/archive/personal/daily/entry-3': '/老博客/个人经历/日常记录/第三次',
        '/老博客/个人经历/日常记录/第九次': '/en/archive/personal/daily/entry-9',
        '/en/archive/personal/daily/entry-9': '/老博客/个人经历/日常记录/第九次',
        '/老博客/个人经历/日常记录/第二次': '/en/archive/personal/daily/entry-2',
        '/en/archive/personal/daily/entry-2': '/老博客/个人经历/日常记录/第二次',
        '/老博客/个人经历/日常记录/第五次': '/en/archive/personal/daily/entry-5',
        '/en/archive/personal/daily/entry-5': '/老博客/个人经历/日常记录/第五次',
        '/老博客/个人经历/日常记录/第八次': '/en/archive/personal/daily/entry-8',
        '/en/archive/personal/daily/entry-8': '/老博客/个人经历/日常记录/第八次',
        '/老博客/个人经历/日常记录/第六次': '/en/archive/personal/daily/entry-6',
        '/en/archive/personal/daily/entry-6': '/老博客/个人经历/日常记录/第六次',
        '/老博客/个人经历/日常记录/第四次': '/en/archive/personal/daily/entry-4',
        '/en/archive/personal/daily/entry-4': '/老博客/个人经历/日常记录/第四次',
        '/老博客/个人经历/面试经历/': '/en/archive/personal/interviews/',
        '/en/archive/personal/interviews/': '/老博客/个人经历/面试经历/',
        '/老博客/个人经历/面试经历/第一次面试': '/en/archive/personal/interviews/first-interview',
        '/en/archive/personal/interviews/first-interview': '/老博客/个人经历/面试经历/第一次面试',
        '/老博客/创新基地/': '/en/archive/innovation-base/',
        '/en/archive/innovation-base/': '/老博客/创新基地/',
        '/老博客/创新基地/新基地官网进度': '/en/archive/innovation-base/website-progress',
        '/en/archive/innovation-base/website-progress': '/老博客/创新基地/新基地官网进度',
        '/老博客/创新基地/第一次培训': '/en/archive/innovation-base/training-session-1',
        '/en/archive/innovation-base/training-session-1': '/老博客/创新基地/第一次培训',
        '/老博客/创新基地/第二次培训': '/en/archive/innovation-base/training-session-2',
        '/en/archive/innovation-base/training-session-2': '/老博客/创新基地/第二次培训',
        '/老博客/基础知识/': '/en/archive/computer-science/',
        '/en/archive/computer-science/': '/老博客/基础知识/',
        '/老博客/基础知识/前端开发/': '/en/archive/computer-science/frontend/',
        '/en/archive/computer-science/frontend/': '/老博客/基础知识/前端开发/',
        '/老博客/基础知识/前端开发/Vue3/CSS/header主体框架': '/en/archive/computer-science/frontend/vue3/css/header-layout',
        '/en/archive/computer-science/frontend/vue3/css/header-layout': '/老博客/基础知识/前端开发/Vue3/CSS/header主体框架',
        '/老博客/基础知识/前端开发/Vue3/CSS/header动画': '/en/archive/computer-science/frontend/vue3/css/header-animations',
        '/en/archive/computer-science/frontend/vue3/css/header-animations': '/老博客/基础知识/前端开发/Vue3/CSS/header动画',
        '/老博客/基础知识/前端开发/Vue3/CSS/': '/en/archive/computer-science/frontend/vue3/css/',
        '/en/archive/computer-science/frontend/vue3/css/': '/老博客/基础知识/前端开发/Vue3/CSS/',
        '/老博客/基础知识/前端开发/Vue3/CSS/重要的讲座': '/en/archive/computer-science/frontend/vue3/css/notable-talks',
        '/en/archive/computer-science/frontend/vue3/css/notable-talks': '/老博客/基础知识/前端开发/Vue3/CSS/重要的讲座',
        '/老博客/基础知识/前端开发/Vue3/': '/en/archive/computer-science/frontend/vue3/',
        '/en/archive/computer-science/frontend/vue3/': '/老博客/基础知识/前端开发/Vue3/',
        '/老博客/基础知识/前端开发/Vue3/创建一个Vue应用': '/en/archive/computer-science/frontend/vue3/creating-a-vue-app',
        '/en/archive/computer-science/frontend/vue3/creating-a-vue-app': '/老博客/基础知识/前端开发/Vue3/创建一个Vue应用',
        '/老博客/基础知识/前端开发/Vue3/响应式基础': '/en/archive/computer-science/frontend/vue3/reactivity-fundamentals',
        '/en/archive/computer-science/frontend/vue3/reactivity-fundamentals': '/老博客/基础知识/前端开发/Vue3/响应式基础',
        '/老博客/基础知识/前端开发/Vue3/基础': '/en/archive/computer-science/frontend/vue3/basics',
        '/en/archive/computer-science/frontend/vue3/basics': '/老博客/基础知识/前端开发/Vue3/基础',
        '/老博客/基础知识/前端开发/Vue3/开始': '/en/archive/computer-science/frontend/vue3/getting-started',
        '/en/archive/computer-science/frontend/vue3/getting-started': '/老博客/基础知识/前端开发/Vue3/开始',
        '/老博客/基础知识/前端开发/Vue3/快速上手': '/en/archive/computer-science/frontend/vue3/quick-start',
        '/en/archive/computer-science/frontend/vue3/quick-start': '/老博客/基础知识/前端开发/Vue3/快速上手',
        '/老博客/基础知识/前端开发/Vue3/描述下对Vue生命周期的理解': '/en/archive/computer-science/frontend/vue3/vue-lifecycle',
        '/en/archive/computer-science/frontend/vue3/vue-lifecycle': '/老博客/基础知识/前端开发/Vue3/描述下对Vue生命周期的理解',
        '/老博客/基础知识/前端开发/Vue3/模板语法': '/en/archive/computer-science/frontend/vue3/template-syntax',
        '/en/archive/computer-science/frontend/vue3/template-syntax': '/老博客/基础知识/前端开发/Vue3/模板语法',
        '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/01-如何成为现代前端六边形战士': '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/01-becoming-a-well-rounded-frontend-developer',
        '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/01-becoming-a-well-rounded-frontend-developer': '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/01-如何成为现代前端六边形战士',
        '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/02-上期回顾与章节概览': '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/02-recap-and-chapter-overview',
        '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/02-recap-and-chapter-overview': '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/02-上期回顾与章节概览',
        '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/03-计算机网络上': '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/03-computer-networks-part-1',
        '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/03-computer-networks-part-1': '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/03-计算机网络上',
        '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/04-计算机网络下': '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/04-computer-networks-part-2',
        '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/04-computer-networks-part-2': '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/04-计算机网络下',
        '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/05-编程语言-ES标准-JS引擎和运行时': '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/05-languages-es-standards-js-engines-and-runtimes',
        '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/05-languages-es-standards-js-engines-and-runtimes': '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/05-编程语言-ES标准-JS引擎和运行时',
        '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/06-简单又复杂的工具链': '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/06-the-simple-yet-complex-toolchain',
        '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/06-the-simple-yet-complex-toolchain': '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/06-简单又复杂的工具链',
        '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/07-构建用户界面的新姿势': '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/07-a-new-way-to-build-uis',
        '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/07-a-new-way-to-build-uis': '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/07-构建用户界面的新姿势',
        '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/08-应用框架': '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/08-application-frameworks',
        '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/08-application-frameworks': '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/08-应用框架',
        '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/09-性能优化方案': '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/09-performance-optimization',
        '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/09-performance-optimization': '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/09-性能优化方案',
        '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/10-用户体验': '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/10-user-experience',
        '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/10-user-experience': '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/10-用户体验',
        '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/': '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/',
        '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/': '/老博客/基础知识/前端开发/Vue3/现代前端开发必知/',
        '/老博客/基础知识/前端开发/Vue3/简介': '/en/archive/computer-science/frontend/vue3/introduction',
        '/en/archive/computer-science/frontend/vue3/introduction': '/老博客/基础知识/前端开发/Vue3/简介',
        '/老博客/基础知识/前端开发/Vue3/计算属性': '/en/archive/computer-science/frontend/vue3/computed-properties',
        '/en/archive/computer-science/frontend/vue3/computed-properties': '/老博客/基础知识/前端开发/Vue3/计算属性',
        '/老博客/基础知识/前端开发/Vue3/语法总结': '/en/archive/computer-science/frontend/vue3/syntax-summary',
        '/en/archive/computer-science/frontend/vue3/syntax-summary': '/老博客/基础知识/前端开发/Vue3/语法总结',
        '/老博客/基础知识/前端开发/Vue3/面试宝典': '/en/archive/computer-science/frontend/vue3/interview-questions',
        '/en/archive/computer-science/frontend/vue3/interview-questions': '/老博客/基础知识/前端开发/Vue3/面试宝典',
        '/老博客/基础知识/前端开发/工程实践/ES6异步处理': '/en/archive/computer-science/frontend/engineering-practice/es6-async-handling',
        '/en/archive/computer-science/frontend/engineering-practice/es6-async-handling': '/老博客/基础知识/前端开发/工程实践/ES6异步处理',
        '/老博客/基础知识/前端开发/工程实践/': '/en/archive/computer-science/frontend/engineering-practice/',
        '/en/archive/computer-science/frontend/engineering-practice/': '/老博客/基础知识/前端开发/工程实践/',
        '/老博客/基础知识/前端开发/工程实践/主要页面逻辑': '/en/archive/computer-science/frontend/engineering-practice/main-page-logic',
        '/en/archive/computer-science/frontend/engineering-practice/main-page-logic': '/老博客/基础知识/前端开发/工程实践/主要页面逻辑',
        '/老博客/基础知识/前端开发/工程实践/动态首页配置': '/en/archive/computer-science/frontend/engineering-practice/dynamic-homepage-config',
        '/en/archive/computer-science/frontend/engineering-practice/dynamic-homepage-config': '/老博客/基础知识/前端开发/工程实践/动态首页配置',
        '/老博客/基础知识/前端开发/工程实践/文件上传': '/en/archive/computer-science/frontend/engineering-practice/file-uploads',
        '/en/archive/computer-science/frontend/engineering-practice/file-uploads': '/老博客/基础知识/前端开发/工程实践/文件上传',
        '/老博客/基础知识/前端开发/工程实践/新的DOM操作': '/en/archive/computer-science/frontend/engineering-practice/new-dom-operations',
        '/en/archive/computer-science/frontend/engineering-practice/new-dom-operations': '/老博客/基础知识/前端开发/工程实践/新的DOM操作',
        '/老博客/基础知识/后端开发/': '/en/archive/computer-science/backend/',
        '/en/archive/computer-science/backend/': '/老博客/基础知识/后端开发/',
        '/老博客/基础知识/后端开发/javaweb/课程总结': '/en/archive/computer-science/backend/java-web/course-summary',
        '/en/archive/computer-science/backend/java-web/course-summary': '/老博客/基础知识/后端开发/javaweb/课程总结',
        '/老博客/基础知识/后端开发/学情管理系统/Gitea与Jenkins实现CI-CD': '/en/archive/computer-science/backend/student-progress-system/gitea-jenkins-cicd',
        '/en/archive/computer-science/backend/student-progress-system/gitea-jenkins-cicd': '/老博客/基础知识/后端开发/学情管理系统/Gitea与Jenkins实现CI-CD',
        '/老博客/基础知识/后端开发/学情管理系统/': '/en/archive/computer-science/backend/student-progress-system/',
        '/en/archive/computer-science/backend/student-progress-system/': '/老博客/基础知识/后端开发/学情管理系统/',
        '/老博客/基础知识/后端开发/苍穹外卖/day-01': '/en/archive/computer-science/backend/cangqiong-waimai/day-01',
        '/en/archive/computer-science/backend/cangqiong-waimai/day-01': '/老博客/基础知识/后端开发/苍穹外卖/day-01',
        '/老博客/基础知识/后端开发/苍穹外卖/day-02': '/en/archive/computer-science/backend/cangqiong-waimai/day-02',
        '/en/archive/computer-science/backend/cangqiong-waimai/day-02': '/老博客/基础知识/后端开发/苍穹外卖/day-02',
        '/老博客/基础知识/后端开发/苍穹外卖/day-03': '/en/archive/computer-science/backend/cangqiong-waimai/day-03',
        '/en/archive/computer-science/backend/cangqiong-waimai/day-03': '/老博客/基础知识/后端开发/苍穹外卖/day-03',
        '/老博客/基础知识/后端开发/苍穹外卖/day-04': '/en/archive/computer-science/backend/cangqiong-waimai/day-04',
        '/en/archive/computer-science/backend/cangqiong-waimai/day-04': '/老博客/基础知识/后端开发/苍穹外卖/day-04',
        '/老博客/基础知识/后端开发/苍穹外卖/day-05': '/en/archive/computer-science/backend/cangqiong-waimai/day-05',
        '/en/archive/computer-science/backend/cangqiong-waimai/day-05': '/老博客/基础知识/后端开发/苍穹外卖/day-05',
        '/老博客/基础知识/后端开发/苍穹外卖/day-06': '/en/archive/computer-science/backend/cangqiong-waimai/day-06',
        '/en/archive/computer-science/backend/cangqiong-waimai/day-06': '/老博客/基础知识/后端开发/苍穹外卖/day-06',
        '/老博客/基础知识/后端开发/苍穹外卖/day-07': '/en/archive/computer-science/backend/cangqiong-waimai/day-07',
        '/en/archive/computer-science/backend/cangqiong-waimai/day-07': '/老博客/基础知识/后端开发/苍穹外卖/day-07',
        '/老博客/基础知识/后端开发/苍穹外卖/day-08': '/en/archive/computer-science/backend/cangqiong-waimai/day-08',
        '/en/archive/computer-science/backend/cangqiong-waimai/day-08': '/老博客/基础知识/后端开发/苍穹外卖/day-08',
        '/老博客/基础知识/后端开发/苍穹外卖/day-09': '/en/archive/computer-science/backend/cangqiong-waimai/day-09',
        '/en/archive/computer-science/backend/cangqiong-waimai/day-09': '/老博客/基础知识/后端开发/苍穹外卖/day-09',
        '/老博客/基础知识/后端开发/苍穹外卖/': '/en/archive/computer-science/backend/cangqiong-waimai/',
        '/en/archive/computer-science/backend/cangqiong-waimai/': '/老博客/基础知识/后端开发/苍穹外卖/',
        '/老博客/基础知识/计算机/MySQL': '/en/archive/computer-science/fundamentals/mysql',
        '/en/archive/computer-science/fundamentals/mysql': '/老博客/基础知识/计算机/MySQL',
        '/老博客/基础知识/计算机/《Linux基础》总集篇': '/en/archive/computer-science/fundamentals/linux-basics',
        '/en/archive/computer-science/fundamentals/linux-basics': '/老博客/基础知识/计算机/《Linux基础》总集篇',
        '/老博客/基础知识/计算机/《Linux网络基础》总集篇': '/en/archive/computer-science/fundamentals/linux-networking',
        '/en/archive/computer-science/fundamentals/linux-networking': '/老博客/基础知识/计算机/《Linux网络基础》总集篇',
        '/老博客/基础知识/计算机/操作系统': '/en/archive/computer-science/fundamentals/operating-systems',
        '/en/archive/computer-science/fundamentals/operating-systems': '/老博客/基础知识/计算机/操作系统',
        '/老博客/基础知识/计算机/计算机组成原理': '/en/archive/computer-science/fundamentals/computer-architecture',
        '/en/archive/computer-science/fundamentals/computer-architecture': '/老博客/基础知识/计算机/计算机组成原理',
        '/老博客/环境/': '/en/archive/environment/',
        '/en/archive/environment/': '/老博客/环境/',
        '/老博客/环境/各类语言环境配置/汇编语言': '/en/archive/environment/toolchains/assembly',
        '/en/archive/environment/toolchains/assembly': '/老博客/环境/各类语言环境配置/汇编语言',
        '/老博客/环境/操作系统环境/系统安装': '/en/archive/environment/operating-systems/system-installation',
        '/en/archive/environment/operating-systems/system-installation': '/老博客/环境/操作系统环境/系统安装',
        '/记录/': '/en/records/',
        '/en/records/': '/记录/',
        '/记录/周志/': '/en/records/weekly/',
        '/en/records/weekly/': '/记录/周志/',
        '/记录/月志/': '/en/records/monthly/',
        '/en/records/monthly/': '/记录/月志/',
        '/记录/阶段性总结/': '/en/records/milestones/',
        '/en/records/milestones/': '/记录/阶段性总结/',
        '/记录/阶段性总结/新的起点': '/en/records/milestones/a-new-beginning',
        '/en/records/milestones/a-new-beginning': '/记录/阶段性总结/新的起点',
        '/': '/en/',
        '/时间线': '/en/timeline',
        '/en/timeline': '/时间线',
        '/team': '/en/team',
        '/en/team': '/team',
      }
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

  vite: {
    plugins: [timelineDataPlugin()],
  },
})
