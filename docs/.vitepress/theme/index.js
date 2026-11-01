// 1. import vitepress theme
import { h } from 'vue'
import Theme from '@escook/vitepress-theme'
// 2. import matching CSS styles (this step cannot be omitted)
import '@escook/vitepress-theme/style.css'
// 3. 自定义组件：展示文章 frontmatter 里手写的发布日期
import PageDate from './PageDate.vue'
// 4. 时间线页面组件
import Timeline from './Timeline.vue'

export default {
  ...Theme,
  // 用 doc-top 插槽把发布日期放在标题下方
  Layout: () => h(Theme.Layout, null, {
    'doc-top': () => h(PageDate),
  }),
  enhanceApp({ app }) {
    // 让任意 md 里都能直接写 <Timeline />
    app.component('Timeline', Timeline)
  },
}
