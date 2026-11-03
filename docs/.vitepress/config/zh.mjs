// 中文（默认语言，即 root locale）专属配置：导航、侧边栏、界面文案。
// 官方文档：https://vitepress.dev/guide/i18n
// 约定：只放「两种语言不一样」的东西；两种语言共用的（logo、社交链接、搜索、页脚）
// 都写在 index.mjs 的 themeConfig 里，locale 的 themeConfig 会浅合并覆盖同名项。

export const zhThemeConfig = {
  // ---------------------------------------------------------------- 界面文案
  // 默认主题内置文案默认是英文，中文站点需要逐项覆盖
  // https://vitepress.dev/reference/default-theme-config
  outline: { level: 'deep', label: '文章目录' },
  docFooter: { prev: '上一篇', next: '下一篇' },
  langMenuLabel: '切换语言',
  darkModeSwitchLabel: '外观',
  lightModeSwitchTitle: '切换到浅色模式',
  darkModeSwitchTitle: '切换到深色模式',
  sidebarMenuLabel: '菜单',
  returnToTopLabel: '回到顶部',
  skipToContentLabel: '跳到正文',
  notFound: {
    title: '页面不存在',
    quote: '迷路了也没关系，换个方向继续找，总会走到该去的地方。',
    linkLabel: '回到首页',
    linkText: '回到首页',
  },

  // ---------------------------------------------------------------- 页脚
  // footer 的 message / copyright 支持 HTML（只能是行内元素）
  // https://vitepress.dev/reference/default-theme-footer
  footer: {
    message:
      '本作品采用 <a rel="license noopener" href="https://creativecommons.org/licenses/by-nc/4.0/deed.zh-hans" target="_blank">CC BY-NC 4.0 国际许可协议</a>授权。',
    copyright: 'Copyright © 2024-present cmcy',
  },

  // ---------------------------------------------------------------- 导航栏
  nav: [
    { text: '我的主页', link: '/' },
    { text: '时间线', link: '/时间线' },
    { text: '友情链接', link: '/team.md' },
    { text: '知识', link: '/知识/', activeMatch: '^/知识/' },
    { text: '记录', link: '/记录/', activeMatch: '^/记录/' },
    { text: '老博客', link: '/老博客/', activeMatch: '^/老博客/' },
  ],

  // ---------------------------------------------------------------- 侧边栏
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
            items: [{ text: '系统安装', link: '/老博客/环境/操作系统环境/系统安装' }],
          },
          {
            text: '编程语言环境配置',
            collapsed: true,
            items: [{ text: '汇编语言', link: '/老博客/环境/各类语言环境配置/汇编语言' }],
          },
        ],
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
            items: [{ text: '第一次面试', link: '/老博客/个人经历/面试经历/第一次面试' }],
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
    '/知识/': [
      {
        text: '项目',
        link: '/知识/项目/',
        collapsed: true,
        items: [
          { text: '反无前端', link: '/知识/项目/反无/' },
          { text: '人脸前端', link: '/知识/项目/人脸/' },
          { text: '人脸测试', link: '/知识/项目/人脸测试/' },
        ],
      },
    ],
    '/记录/': [
      { text: '周志', link: '/记录/周志/' },
      { text: '月志', link: '/记录/月志/' },
      {
        text: '阶段性总结',
        link: '/记录/阶段性总结/',
        collapsed: false,
        items: [{ text: '新的起点', link: '/记录/阶段性总结/新的起点' }],
      },
    ],
  },
}
