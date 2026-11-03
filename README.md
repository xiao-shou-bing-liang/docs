# 池溟昌胤的博客文档

个人技术博客，VitePress 构建，中英双语，部署在 GitHub Pages 项目页：
<https://xiao-shou-bing-liang.github.io/docs/>

> 本文件是给 **AI / 新维护者** 的速查手册。改东西之前先看「配置架构」和「必须同步的三处」，
> 90% 的坑都在这两块。

---

## 1. 技术栈

| 依赖 | 版本 | 备注 |
| --- | --- | --- |
| vitepress | 2.0.0-alpha.21 | **alpha**，锁在 package-lock 里 |
| vite | 8.x（随 vitepress） | 需要 Node `^20.19 \|\| >=22.12` |
| vue | 3.5.x | |
| @escook/vitepress-theme | 1.3.1 | 按 v1 编译的第三方主题，目前兼容 |

```bash
npm install          # 需要 Node >= 20.19 或 >= 22.12
npm run docs:dev     # http://localhost:5173/docs/
npm run docs:build   # 产物在 docs/.vitepress/dist（已 gitignore）
npm run docs:preview
```

构建自带**死链检查**，站内链接坏掉会直接 fail，这是最有用的一道闸。

---

## 2. 目录结构

```
docs/                       # VitePress 的 srcDir（站点根，URL 从这里的 /docs/ 开始）
├─ index.md                 # 中文首页（layout: home）
├─ team.md                  # 友链（layout: page）
├─ 时间线.md                # 中文时间线（layout: page + <Timeline />）
├─ 知识/ 记录/ 老博客/       # 中文文章；目录里的 index.md 是「前言」栏目页
│  └─ 图片素材库/            # 各栏目自己的配图
├─ 图片素材库/               # 全站公共配图（首页等）
├─ public/                  # 原样拷贝到站点根（favicon、头像等）
├─ en/                      # 英文站，全部使用英文 slug
│  ├─ index.md  timeline.md  team.md
│  └─ knowledge/ records/ archive/ ...
└─ .vitepress/
   ├─ config/index.mjs      # 主配置：base、locales、共享 themeConfig、markdown、sitemap
   ├─ config/zh.mjs         # 中文的 nav / sidebar / 界面文案 / footer
   ├─ config/en.mjs         # 英文的同上
   ├─ config/timeline.mjs   # 时间线虚拟数据插件
   ├─ theme/index.js        # 主题入口（注册 PageDate / Timeline）
   ├─ theme/PageDate.vue    # 文章顶部「发布于 …」（读 frontmatter.date）
   ├─ theme/Timeline.vue    # 时间线组件（数据来自 virtual:timeline-data）
   └─ theme/style.css       # 主题色等覆盖
```

> `docs/.vitepress/config.mjs` 已删除，配置现在是 `config/` 目录。**不要再新建 config.mjs**，
> VitePress 会优先加载 `config/index.*`，两个同时存在会让人困惑。

---

## 3. 配置架构（重点）

### 3.1 浅合并规则

```js
locales: {
  root: { themeConfig: zhThemeConfig },  // 简体中文，URL 无前缀
  en:   { link: '/en/', themeConfig: enThemeConfig },
},
themeConfig: { /* 两种语言共用 */ }
```

locale 的 `themeConfig` 与顶层 `themeConfig` 是 **浅合并**（`{...顶层, ...locale}`）：

- **顶层**放共用项：`logo`、`socialLinks`、`search`、`i18nRouting`、`confetti`。
- **各语言**放差异项：`nav`、`sidebar`、`outline`、`docFooter`、`footer`、404 文案等。
- 坑：locale 里一旦写了 `search` / `footer` 这类对象，就会**整个替换**顶层同名项，
  而不是合并字段。

### 3.2 各文件职责

| 要改什么 | 改哪里 |
| --- | --- |
| 导航栏 | `config/zh.mjs` / `config/en.mjs` 的 `nav` |
| 侧边栏 | 同上，`sidebar`（按路径前缀分组） |
| 站点标题、描述、语言标签 | `config/index.mjs` 的 `locales.*` |
| 页脚（CC BY-NC 4.0） | `zh.mjs` / `en.mjs` 的 `footer`（支持行内 HTML） |
| 搜索框文案 | `config/index.mjs` → `themeConfig.search.options.locales.root.translations` |
| Markdown 容器标题、复制按钮文案 | `config/index.mjs` → `locales.*.markdown` |
| 语言切换跳转规则 | `config/index.mjs` → `i18nRouting` |
| 主题色 / 自定义样式 | `theme/style.css` |
| 首页 | `docs/index.md`、`docs/en/index.md` |
| 时间线 | `theme/Timeline.vue` + `config/timeline.mjs` |
| 部署 / base / 域名 | `.github/workflows/deploy.yml` + `config/index.mjs` 的 `SITE_BASE` |

---

## 4. 双语规则（最容易被改坏）

中文 = root，无 URL 前缀；英文 = `/en/`，并且**英文用英文 slug**，路径和中文不对应：

| 中文 | 英文 |
| --- | --- |
| `/知识/项目/反无/` | `/en/knowledge/projects/counter-uav/` |
| `/老博客/基础知识/计算机/《Linux基础》总集篇` | `/en/archive/computer-science/fundamentals/linux-basics` |
| `/记录/周志/` | `/en/records/weekly/` |

因为路径对不上，语言切换不能靠自动加前缀，而是靠一张对照表。所以**新增/重命名页面时，
以下三处必须同步**：

1. 英文页面文件（`docs/en/...`）；
2. `config/en.mjs` 的 `sidebar`（英文标签 + 英文链接，结构要和中文一致）；
3. `config/index.mjs` 里 `i18nRouting()` 内的 `pairs` 表（**双向两条**：
   `'/中文路由/': '/en/...'` 和 `'/en/...' : '/中文路由/'`）。

`i18nRouting` 是函数，会被 VitePress **序列化到浏览器执行**，所以 `pairs` 必须写在函数体内部，
不能引用外部 import 的变量（闭包会丢）。函数返回的地址若不以 `/` 结尾，需要自己补 `.html`
（本站 `cleanUrls: false`）。

时间线、语言菜单、站内链接的英文地址都依赖上面这套；漏了不会报错，但切换会掉回首页。

---

## 5. 新增一篇文章（清单）

1. **中文**：`docs/<栏目>/<子目录>/<文件名>.md`
   - frontmatter 必须有 `date: YYYY-MM-DD`（时间线靠它排序，没日期不会进时间线）。
   - 可选 `title:`；没有就用第一个 H1，再没有就用文件名。
2. **英文**：`docs/en/<英文栏目>/.../<kebab-case>.md`
   - 保留同一个 `date`；`title` 翻成英文。
   - 结构要和中文一致（标题层级、表格、代码块）。
   - 链接写**绝对的英文路由**（`/en/...`），图片写**绝对路径**（见第 6 节）。
3. `config/en.mjs` 侧边栏加一项（英文标签 + `/en/...` 链接）。
4. `config/index.mjs` 的 `pairs` 表加一对（两个方向）。
5. `npm run docs:dev` 手动点一遍；`npm run docs:build` 确认没死链。

> 已存在的 96 篇英文译文是模型批量翻译的，**中文正文改了之后英文不会自动更新**，需要手动同步。
> 译文链接、图片路径、锚点已统一处理过；新增内容时请沿用同样的写法。

---

## 6. 图片与链接怎么写

**中文正文**（相对路径，和文件所在目录有关）：

```md
![说明](图片素材库\foo.webp)        <!-- 同级 图片素材库/ -->
![说明](..\图片素材库\bar.webp)     <!-- 上一级 图片素材库/ -->
```

**英文正文**（绝对路径，因为英文文件层级和中文不同）：

```md
![说明](/老博客/图片素材库/fuji.webp)
```

- 图片放在各自栏目的 `图片素材库/` 里；构建时会被 VitePress 重新 hash 到 `/assets/`。
- 英文页里的图片路径写错，构建会报 `UNRESOLVED_IMPORT`（找不到文件）。
- 站内链接：中文用相对 `.md` 链接；英文用绝对 `/en/...` 路由。死链会让 `docs:build` 失败。

---

## 7. 时间线（自动生成，不用手工维护）

- `config/timeline.mjs` 在构建时扫描整个 `docs/`（含 `en/`），把每篇带 `date` 的文章
  生成虚拟模块 `virtual:timeline-data`，字段：`{ date, title, route, section, lang }`。
- 以下页面**不进时间线**：根 `index.md`、`team.md`、以及 H1 是
  `前言 / 介绍 / 序 / 首页 / index / preface` 的栏目页（中英都适用）。
- `Timeline.vue` 按 `lang` 过滤：中文页只显示中文条目，`/en/` 页只显示英文条目，
  标题和日期格式也随语言切换。
- 页面里写在 `<Timeline> … </Timeline>` 之间的 Markdown 会作为说明块渲染在组件内部
  （这样才和时间线一起居中）。

---

## 8. 主题与已知补丁

- `theme/index.js`：基于 `@escook/vitepress-theme`，用 `doc-top` 插槽插入 `PageDate`，
  全局注册 `<Timeline />`。
- **不要删** `config/index.mjs` 里 `markdown.config(md)` 那段 `{{ }}` → HTML 实体的替换。
  Vue3 文档里的 `{{ msg }}`、`{{ message.split(...) }}` 会被 Vue 模板当插值求值，删了会 SSR 报错。
  产物 HTML 里看到的是 `{{` 而不是 `&#123;`，因为 Vue 模板编译器会把实体解码回来——这是正常的。
- 组件的中文/英文文案统一从 `useData().lang` 判断（见 `Timeline.vue`、`PageDate.vue`）。

---

## 9. Sitemap 与部署

```js
sitemap: {
  hostname: 'https://xiao-shou-bing-liang.github.io',
  transformItems: (items) => items.map((item) => ({ ...item, url: SITE_BASE + ... })),
}
```

- VitePress 生成的 `item.url` 不含 `base`，所以用 `transformItems` 手动补 `/docs/`；
  换域名/换部署路径时，**`SITE_BASE` 和 `sitemap.hostname` 要一起改**。
- 产物：`docs/.vitepress/dist/sitemap.xml`，当前 204 条（中文 102 + 英文 102）。
- 部署：push 到 `main` → `.github/workflows/deploy.yml`（Node 22）→ GitHub Pages。
- 首页和 `team` 因为中英路径结构一致，sitemap 里会自动带 `hreflang` alternate；
  其余文章的英文 slug 不同，没有自动配对。

---

## 10. 已知的坑

1. **不要用 `themeConfig.locales`**：VitePress 2 的语言配置是顶层 `locales`。
2. **不要在 locale 里重复写共用对象**（`search`、`socialLinks`、`logo`），否则会被整体替换。
3. **不要在栏目 `index.md` 上随手加 `aside: false` / `prev: false` / `next: false`**：
   中文栏目页是标准文档页（带发布日期、配图、上一篇/下一篇），英文也照同样结构，
   之前加过导致两边不一致。
4. **英文侧边栏不要放中文没有的入口**（例如曾经的 `Overview`），结构与中文保持一致。
5. 升级 vitepress 是 alpha → alpha，升级后先 `npm install` 再 `npm run docs:build` 全量验证；
   Vite 8 对 Node 版本有要求，CI 已用 Node 22。
6. 第三方主题 `@escook/vitepress-theme` 是按 v1 编译的；如果哪天页面出现奇怪报错，
   先怀疑它（可临时从 `theme/index.js` 里换回 `vitepress/theme` 验证）。
7. Windows 上 git 会提示 `LF will be replaced by CRLF`，可忽略。
8. `docs/.vitepress/dist`、`cache`、`.temp` 都在 `.gitignore` 里，不要提交。

---

## 11. 改完自检

```bash
npm run docs:build          # 死链检查 + 全量构建（当前 205 页）
```

再人工看一眼：

- 中文首页 / `/docs/en/` 首页
- `/docs/时间线` 和 `/docs/en/timeline`（数量、标题语言、链接）
- 任意一篇文章的语言切换（应停在对应文章，不是首页）
- 侧边栏折叠状态与中文是否一致
- sitemap 里新增页面的 URL 是否带 `/docs/`
