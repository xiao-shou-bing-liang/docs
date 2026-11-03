---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

// A compact globe icon instead of the long inline SVGs used on the Chinese page
const siteIcon = {
  svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 3h7v7h-2V6.4l-8.3 8.3-1.4-1.4L17.6 5H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"/></svg>'
}

const web = [
  {
    avatar: 'https://vitepress.dev/vitepress-logo-large.webp',
    name: 'VitePress',
    title: 'Framework',
    desc: 'The framework this blog is built on',
    links: [
      { icon: siteIcon, link: 'https://vitepress.dev/' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/6375567?s=200&v=4',
    name: 'Hexo',
    title: 'Framework',
    desc: 'The framework behind my previous blog',
    links: [
      { icon: siteIcon, link: 'https://hexo.io/' }
    ]
  },
  {
    avatar: 'https://ctf-wiki.org/static/img/logo.png',
    name: 'CTF Wiki',
    title: 'Capture The Flag — the hacking contest that started at DEF CON in 1996',
    desc: 'The skill tree I level up on',
    links: [
      { icon: siteIcon, link: 'https://ctf-wiki.org/' },
      { icon: 'github', link: 'https://github.com/ctf-wiki' }
    ]
  }
]

const partners = [
  {
    avatar: 'https://sourcebucket.s3.bitiful.net/img/avatar.webp',
    name: 'Fomalhaut🥝',
    title: 'Future is now 🍭🍭🍭',
    desc: 'He built my first Hexo blog with me. That blog is long gone, but I never forgot it.',
    links: [
      { icon: siteIcon, link: 'https://www.fomal.cc/' },
      { icon: siteIcon, link: 'https://space.bilibili.com/220757832' }
    ]
  },
  {
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgxeVe7t2jOXvcOTqU95qE2rDwj6-kfcZWpg&s',
    name: 'Liu Longbin',
    title: 'Without Confucius, the ages would have been as dark as an endless night.',
    desc: 'Supplier of the visual effects on this blog',
    links: [
      { icon: siteIcon, link: 'https://www.escook.cn/' }
    ]
  }
]

const friend = [
  {
    avatar: 'https://七院创新基地.cn/images/logo2.png',
    name: '7th Academy Innovation Base',
    title: 'Real, focused, excellent, unbounded, innovative',
    desc: 'I am there almost every day — that says enough about it',
    links: [
      { icon: siteIcon, link: 'https://seven-innovation-base.github.io/' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/62921971?v=4',
    name: 'Xinshou Jiajia',
    title: 'Veteran Jiajia — seriously old-school!',
    desc: 'A strong colleague of mine, genuinely strong',
    links: [
      { icon: siteIcon, link: 'https://xinshoujiajia.github.io/' }
    ]
  }
]
</script>

<VPTeamPage>
  <VPTeamPageSection>
    <template #title>Learning sites</template>
    <template #lead>The road ahead is long — I will keep searching high and low.</template>
    <template #members>
      <VPTeamMembers size="small" :members="web" />
    </template>
  </VPTeamPageSection>
  <VPTeamPageSection>
    <template #title>People who helped me</template>
    <template #lead>Thanks to everyone who shares what they know.</template>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection>
  <VPTeamPageSection>
    <template #title>Friends</template>
    <template #lead>Few are the true friends a life can hold; may the friendship last, and may we meet again.</template>
    <template #members>
      <VPTeamMembers size="small" :members="friend" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
