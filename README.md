# SPEC — vitepress-blog (agent operations manual)

<!--
audience: AI coding agent
style: machine-first; normative statements, no narrative
precedence: code > this file > assumption
commit_policy: HUMAN-TRIGGERED ONLY — never run `git commit` or `git push` unless the human explicitly says "提交" / "推送"
-->

```yaml
project: vitepress-blog
src_dir: docs/
config_dir: docs/.vitepress/config
theme_dir: docs/.vitepress/theme
out_dir: docs/.vitepress/dist          # gitignored
public_dir: docs/public                # copied verbatim to site root
base: /docs/
site: https://xiao-shou-bing-liang.github.io/docs/
clean_urls: false                      # routes end with .html
default_locale: root                   # zh-CN, no URL prefix
locale_en: en                          # en-US, prefix /en/
i18n_map: docs/.vitepress/config/i18n-map.mjs   # single source of zh↔en route pairs
feeds: { zh: /feed.xml, en: /en/feed.xml }      # RSS 2.0, generated in buildEnd
stack: { vitepress: 2.0.0-alpha.21, vite: 8.x, vue: 3.5.x, theme: "@escook/vitepress-theme@1.3.1" }
node: ^20.19.0 || >=22.12.0
```

## 0. OPS

| cmd | effect | gate |
| --- | --- | --- |
| `npm install` | install deps | Node version check |
| `npm run docs:dev` | dev server `http://localhost:5173/docs/` | — |
| `npm run docs:build` | build → `docs/.vitepress/dist` | **dead-link check; exits non-zero on broken internal link** |
| `npm run docs:preview` | serve dist | — |
| `npm run check:i18n` | verify `i18n-map.mjs` ↔ files ↔ sidebars | **exits non-zero on drift** |
| `git push origin main` | triggers `.github/workflows/deploy.yml` → GitHub Pages | Node 22 in CI |

`docs:build` is the primary verification primitive. It validates: config syntax, Vue template compile of every `.md`, internal links, image imports, sitemap + feeds generation.

## 1. FILE MAP

| path | role | notes |
| --- | --- | --- |
| `docs/index.md` | zh home | `layout: home`, hero + features + "Start here" |
| `docs/team.md` | zh friends | `layout: page` |
| `docs/时间线.md` | zh timeline | `layout: page`, `aside: false`, `<Timeline />` |
| `docs/{知识,记录,老博客}/**` | zh articles | `index.md` = section preface page |
| `docs/图片素材库/`, `docs/<section>/图片素材库/` | images | resolved/hashed at build |
| `docs/en/index.md` | en home | hand-written, mirrors zh home |
| `docs/en/timeline.md` | en timeline | `layout: page` + `<Timeline>` + NOTE slot |
| `docs/en/team.md` | en friends | `layout: page` |
| `docs/en/{knowledge,records,archive}/**` | en articles | **english slugs, not zh paths** |
| `docs/.vitepress/config/index.mjs` | root config | base, head, locales, shared `themeConfig`, markdown, vite plugin, sitemap, feeds hook |
| `docs/.vitepress/config/site.mjs` | `SITE_HOSTNAME` / `SITE_BASE` | change domain/deploy path **only here** |
| `docs/.vitepress/config/i18n-map.mjs` | `routePairs` | **single source** for language switch, sitemap alternates, checker |
| `docs/.vitepress/config/zh.mjs` | zh locale `themeConfig` | nav, sidebar, outline, docFooter, labels, footer, 404 |
| `docs/.vitepress/config/en.mjs` | en locale `themeConfig` | same keys, english values |
| `docs/.vitepress/config/timeline.mjs` | virtual module `virtual:timeline-data` | scans `docs/**` at build |
| `docs/.vitepress/config/feed.mjs` | RSS 2.0 generator | `generateFeeds(outDir)` from `buildEnd` |
| `scripts/check-i18n.mjs` | i18n consistency checker | `npm run check:i18n` |
| `docs/.vitepress/theme/index.js` | theme entry | registers `PageDate` (slot `doc-top`) and `Timeline` |
| `docs/.vitepress/theme/PageDate.vue` | `发布于 …` / `Published on …` | reads `frontmatter.date`, follows `lang` |
| `docs/.vitepress/theme/Timeline.vue` | timeline UI | filters data by `lang`, accepts default slot |
| `docs/.vitepress/theme/style.css` | theme overrides | brand colors |

`docs/.vitepress/config.mjs` **does not exist and MUST NOT be recreated** (VitePress prefers `config/index.*`; two entry points = silent divergence).

## 2. CONFIG MODEL

```js
localeThemeConfig = { ...rootThemeConfig, ...zhOrEnThemeConfig }   // SHALLOW merge
```

- Shared keys live on root `themeConfig`: `logo`, `socialLinks`, `search`, `i18nRouting`, `confetti`.
- Per-locale keys live in `zh.mjs` / `en.mjs`: `nav`, `sidebar`, `outline`, `docFooter`, `footer`, `notFound`, UI labels.
- TRAP: defining `search` / `footer` / `socialLinks` inside a locale **replaces** the shared object entirely (no field merge). Only define them per-locale when every field is provided.

Key ownership (edit here, nowhere else):

| concern | file | key |
| --- | --- | --- |
| base path | `config/site.mjs` | `SITE_HOSTNAME`, `SITE_BASE` |
| site title/description | `config/index.mjs` | `locales.{root,en}` |
| nav | `config/{zh,en}.mjs` | `nav` |
| sidebar | `config/{zh,en}.mjs` | `sidebar` |
| outline/aside label | `config/{zh,en}.mjs` | `outline.label`, `outline.level` |
| prev/next labels | `config/{zh,en}.mjs` | `docFooter` |
| license footer | `config/{zh,en}.mjs` | `footer.message`, `footer.copyright` (inline HTML allowed) |
| search UI strings | `config/index.mjs` | `themeConfig.search.options.locales.root.translations` (en = built-in defaults) |
| container/alert/copy labels | `config/index.mjs` | `locales.{root,en}.markdown.{container,codeCopyButton}` |
| zh↔en route pairs | `config/i18n-map.mjs` | `routePairs` (feeds `themeConfig.i18nRoutes` + sitemap alternates) |
| language switch logic | `config/index.mjs` | `i18nRouting` (reads `themeConfig.i18nRoutes`) |
| sitemap | `config/index.mjs` | `sitemap` (`transformItems`: base + hreflang) |
| RSS | `config/feed.mjs` | `generateFeeds()` via `buildEnd` |

## 3. LOCALE + ROUTE MODEL

URL shapes:

| zh | en |
| --- | --- |
| `/知识/项目/反无/` | `/en/knowledge/projects/counter-uav/` |
| `/老博客/基础知识/计算机/《Linux基础》总集篇` | `/en/archive/computer-science/fundamentals/linux-basics` |
| `/记录/周志/` | `/en/records/weekly/` |
| `/时间线` → `/时间线.html` | `/en/timeline` → `/en/timeline.html` |

Rules:

- en slugs: kebab-case, semantic (`counter-uav`), never transliteration, never zh characters.
- zh URLs are stable; en URL ≠ zh URL + prefix ⇒ any locale-aware feature must use the explicit table below.
- **I18N REGISTRATION** — creating/renaming a page requires all three, else silent breakage:

1. file `docs/en/...`;
2. entry in `config/i18n-map.mjs` → `routePairs` (`{ zh: '/…', en: '/en/…' }`; both directions are derived at config load);
3. `config/en.mjs` → `sidebar` entry (en label + en link; structure MUST mirror zh).

`npm run check:i18n` verifies 1–3 (missing file, unregistered route, dead/missing sidebar link, duplicate route). Run it after any page add/rename.

`i18nRouting` contract:

- signature `(data, route, targetLocale) => string`, still serialized to the browser via `Function#toString`.
- route table is NOT inlined: it is passed as **site data** `themeConfig.i18nRoutes` (plain object derived from `i18n-map.mjs`), read via `data.site.value.themeConfig.i18nRoutes`. Module-scope refs are still forbidden inside the function.
- resolve key from `route.data.relativePath`, strip `.md`, collapse `index` → `'/...'` (root → `/`, `en/index.md` → `/en/`).
- non-directory target MUST get `.html` appended (`cleanUrls: false`).
- unmatched page ⇒ fallback to target locale home (`/` or `/en/`).

## 4. CONTENT ENCODING CONTRACT

Frontmatter:

- `date: YYYY-MM-DD` — REQUIRED for any article that must appear in the timeline; both locales MUST share the same date.
- `title:` optional; resolution order for timeline/page title: `title` → first H1 → filename.
- `layout:` — `home` for homes, `page` for timeline/friends; omit elsewhere.
- Section preface pages (`docs/{知识,记录,老博客}/index.md`, `docs/en/{knowledge,records,archive}/index.md`): keep `date` + one intro paragraph + one image, default doc layout. **DO NOT add `aside: false` / `prev: false` / `next: false`** — that diverged en from zh before and broke parity.

Images:

- zh body: relative path, e.g. `![alt](图片素材库\foo.webp)`, `![alt](..\图片素材库\bar.webp)`.
- en body: absolute path, e.g. `![alt](/老博客/图片素材库/fuji.webp)` (en files live at different depth).
- build resolves and hashes every image into `/assets/`; a wrong path fails the build with `UNRESOLVED_IMPORT` / module-not-found.
- `<script setup>` asset imports MUST be relative to the **file's own directory** (e.g. `docs/en/records/milestones/a-new-beginning.md` imports `../../../记录/阶段性总结/图片素材库/*.webp`).

Links:

- zh body: relative `.md` links.
- en body: absolute en routes (`/en/...`, directory links keep trailing `/`).
- internal dead links fail `docs:build`.

Code / HTML / Vue / math:

- never rewrite inside fenced blocks, inline code, `<script>`/`<style>`, component tags, LaTeX, image markdown.
- ASCII `<tag>` written as **prose** is parsed as HTML by Vue ⇒ use inline code. (Real failure: `Intel format: <instruction><destination><source>` ⇒ "Element is missing end tag".)

`{{ }}` patch:

- `config/index.mjs` → `markdown.config(md)` replaces `{{`/`}}` with HTML entities after render.
- MUST stay; removing it breaks SSR of `docs/老博客/基础知识/前端开发/Vue3/*` (`Cannot read properties of undefined (reading 'id')`).
- post-build HTML legitimately shows literal `{{` (Vue compiler decodes entities). Not a bug; do not "fix".

## 5. TIMELINE

data flow: `config/timeline.mjs` walks `docs/**` (including `en/`) → parses frontmatter + first H1 → emits `[{ date, title, route, section, lang }]` sorted desc → virtual module `virtual:timeline-data` → `Timeline.vue`.

filters (build-time):

- skip `docs/index.md`, `docs/team.md`;
- skip index pages whose H1 matches `/^(前言|介绍|序|首页|index|preface)$/i`;
- skip files without `date`.

filters (render-time): `Timeline.vue` keeps entries where `it.lang === (lang startsWith 'en' ? 'en' : 'zh')`; labels/date format follow `lang`.

slot: markdown between `<Timeline>` and `</Timeline>` renders inside the component's centered container; page-level markdown outside it renders full width (previous defect).

## 6. PROCEDURES

### P1 add article

1. zh: `docs/<section>/<sub>/<name>.md` + `date`.
2. en: `docs/en/<section-en>/<sub-en>/<slug>.md` — same `date`, translated `title`, same heading/table/code structure.
3. en links absolute `/en/...`; en images absolute.
4. add `config/en.mjs` sidebar entry.
5. add `{ zh, en }` to `config/i18n-map.mjs` → `routePairs`.
6. verify: `npm run check:i18n` then `npm run docs:build`; open zh + en page; language switch keeps the article.

### P2 add section

1. zh dir + `index.md` (preface: `date` + image).
2. en dir (`kebab-case`) + `index.md` (same shape).
3. `zh.mjs`/`en.mjs` sidebar: new key `'/新栏目/'` / `'/en/new-section/'`.
4. nav entries if top-level.
5. `routePairs` entry for the two index pages.
6. run `npm run check:i18n`; timeline auto-includes it unless H1 is a preface word.

### P3 rename / move page

update: file path, `routePairs` entry, en sidebar, all inbound links (zh relative, en absolute), `nav`/`activeMatch` if top-level. Timeline/sitemap/feeds are automatic. Dead-link check catches zh inbound links only — grep the old route for en pages. Then `npm run check:i18n`.

### P4 edit nav / sidebar

- labels only: `config/{zh,en}.mjs`.
- keep zh/en structures identical (item order, nesting, `collapsed` flags). **No entry may exist in one locale only.** (Past defect: en had `Overview` items.)

### P5 license / footer

`config/{zh,en}.mjs` → `footer.message` (inline HTML allowed, rendered in `<p>`). Current: CC BY-NC 4.0 with `rel="license"`. Built-in behavior: footer hidden while sidebar visible.

### P6 upgrade vitepress

1. `npm install -D vitepress@<ver>` (alpha allowed).
2. `npm run docs:build` — expect zero dead links, 205 html pages.
3. diff-sensitive: `types/shared.d.ts` (`LocaleSpecificConfig`, `MarkdownLocaleOptions`), `i18nRouting` signature, default-theme slots, escook theme (built for v1).
4. if `markdown.config` no longer runs ⇒ restore the `{{ }}` protection another way before merging.
5. bump `engines.node` + CI `node-version` when Vite's engine range changes.

### P7 change domain / base

update `SITE_HOSTNAME` and `SITE_BASE` in `config/site.mjs` only — they feed `base`, head icon, sitemap, sitemap alternates and feeds. The deploy comment in `deploy.yml` references the same values.

## 7. INVARIANTS

1. `base === '/docs/'` and every generated URL carries it (head icon, sitemap, timeline hrefs via `withBase`).
2. `cleanUrls === false` ⇒ emitted links end in `/` (index) or `.html`.
3. zh routes unchanged; en routes english-slug.
4. every en article has exactly one zh source; same `date`; same structure.
5. `routePairs` is complete and bidirectional (derived both ways at config load); a page missing from it ⇒ language switch falls back to home and `check:i18n` fails.
6. `i18nRoutes` reaches the client as plain site data (`themeConfig.i18nRoutes`); `i18nRouting` itself contains no module-scope references.
7. zh and en sidebars have identical item counts per section: knowledge 4 / records 5 / archive 94.
8. nav = 6 items per locale + built-in language menu; no custom switcher component.
9. `markdown.config(md)` `{{ }}` patch present.
10. section preface pages use default doc layout (no `aside/prev/next: false`).
11. no `themeConfig.locales` (v1 API); locales are top-level.
12. `dist/`, `cache/`, `.temp/` never committed.

## 8. FAILURE MODE INDEX

| symptom | cause | fix |
| --- | --- | --- |
| `Error: N dead link(s) found` | link target missing / stale route | fix link or add page; check `pairs` |
| `UNRESOLVED_IMPORT … .webp` | image path wrong for en file depth, or missing file | absolute `/section/图片素材库/...`; fix `<script setup>` imports |
| `Element is missing end tag` | ASCII `<foo>` in prose | wrap in inline code |
| SSR `Cannot read properties of undefined (reading 'id')` | `{{ }}` patch removed | restore `markdown.config` hook |
| language switch → home | route missing from `config/i18n-map.mjs` | add `{ zh, en }` pair, run `npm run check:i18n` |
| `check:i18n` fails | page not registered / sidebar dead link / duplicate route | fix reported item |
| en page without sidebar | sidebar key not matching (`/en/<section>/`) | add key / fix path |
| zh↔en structure mismatch | `aside/prev/next: false` on one side, or extra sidebar entry | remove overrides / drop extra entry |
| sitemap URLs lack `/docs/` | `transformItems` missing or `SITE_BASE` changed | update transform |
| sitemap has no `hreflang` alternates | route not in `i18n-map.mjs` | register the pair |
| `feed.xml` missing / empty | `buildEnd` not called, or items lack `date` | check `config/index.mjs` → `buildEnd`; add dates |
| en timeline lists `Preface` | preface filter lacks `preface` | keep regex `前言\|介绍\|序\|首页\|index\|preface` |
| CI install fails on Linux | lockfile missing platform optional dep | regenerate `package-lock.json` (`npm install`), verify `@rolldown/binding-linux-x64-gnu` present |

## 9. OUTPUT ARTIFACTS

sitemap (`config/index.mjs` → `sitemap`):

- `item.url` is srcDir-relative and carries no `base` ⇒ `transformItems` prepends `SITE_BASE`.
- for every route present in `i18n-map.mjs`, `transformItems` emits two `links` entries (`hreflang="zh-CN"` / `"en-US"`) ⇒ `<xhtml:link rel="alternate">` per page.
- output: `docs/.vitepress/dist/sitemap.xml`, 204 urls, 408 alternates.

feeds (`config/feed.mjs`, called from `buildEnd(siteConfig)`):

- RSS 2.0, one per locale: `dist/feed.xml` (zh) / `dist/en/feed.xml` (en).
- item source = `scanTimeline()` ⇒ **timeline membership == feed membership** (same `date` requirement, same preface filtering).
- item order = newest first; `guid` = absolute url; `description` = first ~220 chars of the body with fenced code, `<script>/<style>/<template>`, images, links, headings and HTML stripped.
- absolute urls: `SITE_HOSTNAME + SITE_BASE + route` (+ `.html` when the route is not a directory).
- each page's `<head>` gets `<link rel="alternate" type="application/rss+xml">` for its own locale (`transformHead`).

deploy: `git push origin main` → `.github/workflows/deploy.yml` (Node 22, `npm ci`, `npm run docs:build`) → GitHub Pages, base `/docs/`.

## 10. BASELINE (integrity snapshot)

| metric | value |
| --- | --- |
| `docs/**/*.md` (excl. `en/`) | 102 |
| `docs/en/**/*.md` | 102 |
| built html pages | 205 (204 pages + `404.html`) |
| `sitemap.xml` urls | 204 (102 zh + 102 en) |
| `sitemap.xml` alternates | 408 (2 per paired page) |
| `feed.xml` items | 90 zh / 90 en |
| timeline entries | 90 zh / 90 en |
| languages | 2 |
| nav items | 6 per locale |

Deviation from these numbers ⇒ intentional change or regression; explain it in the commit.

## 11. NON-ISSUES

- git `LF will be replaced by CRLF` warnings on Windows.
- literal `{{ … }}` visible in built HTML (entity decoding, by design).
- `[vite] Some chunks are larger than 500 kB` build warning.
- `/favicon.ico` 404 in dev (browser auto-request; site icon is `/docs/滑稽.jpg`).
- zh characters inside image URLs / `dist/assets` filenames.
- `@escook/vitepress-theme` declares vitepress `^1.1.3` as a devDependency (no peer constraint; prebuilt against v1 — works, revisit on breakage).

## 12. LICENSE

- `LICENSE` (repo root) = verbatim legal text of **CC BY-NC 4.0** (source: `https://creativecommons.org/licenses/by-nc/4.0/legalcode.txt`). Applies to the site content **and** the small amount of site code (config, theme, scripts).
- `package.json` → `"license": "CC-BY-NC-4.0"` MUST match `LICENSE`.
- human-readable notice lives in the site footer: `config/{zh,en}.mjs` → `footer.message`, anchor `rel="license"` → `https://creativecommons.org/licenses/by-nc/4.0/`.
- three places stay in sync: `LICENSE`, `package.json#license`, footer message. Do not switch to a permissive license without an explicit human decision.

## 13. COMMIT CONTRACT

- **VCS IS HUMAN-TRIGGERED ONLY.** Never run `git commit` / `git push` on your own initiative, and never chain them.
  - human says "提交" ⇒ run `git commit` (do NOT push).
  - human says "推送" ⇒ run `git push` (do not add new changes to that push).
  - no instruction ⇒ leave changes dirty in the working tree, report changed files + a suggested message, stop.
- message: conventional commits, chinese subject allowed (`feat(i18n): …`, `docs: …`).
- one logical change per commit; `main` is deploy branch (push ⇒ auto deploy).
- when a commit does happen, include the matching README/spec update in the same commit.
- never commit `node_modules`, `dist`, `cache`, `.temp`, or translation manifests.
