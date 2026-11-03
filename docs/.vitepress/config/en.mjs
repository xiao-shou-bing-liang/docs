// English locale (/en/): navigation, sidebar and UI strings.
// Docs: https://vitepress.dev/guide/i18n
//
// Scope note: the site-level pages live under /en/ (home, timeline, friends and one
// overview page per section). Articles themselves are still Chinese only, so the
// sidebar below mirrors the Chinese structure but keeps pointing at the existing
// pages — English labels, original content. When an article gets translated, add an
// /en/... page and change only that entry's `link`.

export const enThemeConfig = {
  // ---------------------------------------------------------------- UI strings
  outline: { level: 'deep', label: 'On this page' },
  docFooter: { prev: 'Previous page', next: 'Next page' },
  langMenuLabel: 'Change language',
  darkModeSwitchLabel: 'Appearance',
  lightModeSwitchTitle: 'Switch to light mode',
  darkModeSwitchTitle: 'Switch to dark mode',
  sidebarMenuLabel: 'Menu',
  returnToTopLabel: 'Return to top',
  skipToContentLabel: 'Skip to content',

  // ---------------------------------------------------------------- Nav
  nav: [
    { text: 'Home', link: '/en/' },
    { text: 'Timeline', link: '/en/timeline' },
    { text: 'Friends', link: '/en/team.md' },
    { text: 'Knowledge', link: '/en/knowledge/', activeMatch: '^/en/knowledge/' },
    { text: 'Records', link: '/en/records/', activeMatch: '^/en/records/' },
    { text: 'Archive', link: '/en/archive/', activeMatch: '^/en/archive/' },
  ],

  // ---------------------------------------------------------------- Footer
  // footer.message / footer.copyright accept inline HTML
  // https://vitepress.dev/reference/default-theme-footer
  footer: {
    message:
      'This work is licensed under <a rel="license noopener" href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC BY-NC 4.0</a>.',
    copyright: 'Copyright © 2024-present cmcy',
  },

  // ---------------------------------------------------------------- Sidebar
  sidebar: {
    '/en/knowledge/': [
      {
        text: 'Projects',
        link: '/en/knowledge/projects/',
        collapsed: true,
        items: [
          { text: 'Counter-UAV Frontend', link: '/en/knowledge/projects/counter-uav/' },
          { text: 'Face Recognition Frontend', link: '/en/knowledge/projects/face-recognition/' },
          { text: 'Face Recognition Testing', link: '/en/knowledge/projects/face-recognition-testing/' },
        ],
      },
    ],

    '/en/records/': [
      { text: 'Weekly Notes', link: '/en/records/weekly/' },
      { text: 'Monthly Notes', link: '/en/records/monthly/' },
      {
        text: 'Milestone Reviews',
        link: '/en/records/milestones/',
        collapsed: false,
        items: [{ text: 'A New Beginning', link: '/en/records/milestones/a-new-beginning' }],
      },
    ],

    '/en/archive/': [
      {
        text: 'Environment Setup',
        link: '/en/archive/environment/',
        collapsed: true,
        items: [
          {
            text: 'Operating Systems',
            collapsed: true,
            items: [{ text: 'System Installation', link: '/en/archive/environment/operating-systems/system-installation' }],
          },
          {
            text: 'Language Toolchains',
            collapsed: true,
            items: [{ text: 'Assembly', link: '/en/archive/environment/toolchains/assembly' }],
          },
        ],
      },
      {
        text: 'Computer Science',
        link: '/en/archive/computer-science/',
        collapsed: true,
        items: [
          {
            text: 'Fundamentals',
            collapsed: true,
            items: [
              { text: 'Linux Networking Basics', link: '/en/archive/computer-science/fundamentals/linux-networking' },
              { text: 'Linux Basics', link: '/en/archive/computer-science/fundamentals/linux-basics' },
              { text: 'MySQL (unfinished)', link: '/en/archive/computer-science/fundamentals/mysql' },
              { text: 'Operating Systems (unfinished)', link: '/en/archive/computer-science/fundamentals/operating-systems' },
              { text: 'Computer Architecture (unfinished)', link: '/en/archive/computer-science/fundamentals/computer-architecture' },
            ],
          },
          {
            text: 'Backend',
            link: '/en/archive/computer-science/backend/',
            collapsed: true,
            items: [
              { text: 'Java Web Course Summary', link: '/en/archive/computer-science/backend/java-web/course-summary' },
              {
                text: 'Cangqiong Waimai (Spring Boot)',
                link: '/en/archive/computer-science/backend/cangqiong-waimai/',
                collapsed: true,
                items: [
                  { text: 'day-01', link: '/en/archive/computer-science/backend/cangqiong-waimai/day-01' },
                  { text: 'day-02', link: '/en/archive/computer-science/backend/cangqiong-waimai/day-02' },
                  { text: 'day-03', link: '/en/archive/computer-science/backend/cangqiong-waimai/day-03' },
                  { text: 'day-04', link: '/en/archive/computer-science/backend/cangqiong-waimai/day-04' },
                  { text: 'day-05', link: '/en/archive/computer-science/backend/cangqiong-waimai/day-05' },
                  { text: 'day-06', link: '/en/archive/computer-science/backend/cangqiong-waimai/day-06' },
                  { text: 'day-07', link: '/en/archive/computer-science/backend/cangqiong-waimai/day-07' },
                  { text: 'day-08', link: '/en/archive/computer-science/backend/cangqiong-waimai/day-08' },
                  { text: 'day-09', link: '/en/archive/computer-science/backend/cangqiong-waimai/day-09' },
                ],
              },
              { text: 'Student Progress Management System', link: '/en/archive/computer-science/backend/student-progress-system/' },
              { text: 'CI/CD with Gitea + Jenkins', link: '/en/archive/computer-science/backend/student-progress-system/gitea-jenkins-cicd' },
            ],
          },
          {
            text: 'Frontend',
            link: '/en/archive/computer-science/frontend/',
            collapsed: true,
            items: [
              {
                text: 'Vue 3 Notes',
                link: '/en/archive/computer-science/frontend/vue3/',
                collapsed: true,
                items: [
                  { text: 'Introduction', link: '/en/archive/computer-science/frontend/vue3/introduction' },
                  { text: 'Quick Start', link: '/en/archive/computer-science/frontend/vue3/quick-start' },
                  { text: 'Creating a Vue App', link: '/en/archive/computer-science/frontend/vue3/creating-a-vue-app' },
                  { text: 'Template Syntax', link: '/en/archive/computer-science/frontend/vue3/template-syntax' },
                  { text: 'Reactivity Fundamentals', link: '/en/archive/computer-science/frontend/vue3/reactivity-fundamentals' },
                  { text: 'Computed Properties', link: '/en/archive/computer-science/frontend/vue3/computed-properties' },
                  { text: 'Understanding the Vue Lifecycle', link: '/en/archive/computer-science/frontend/vue3/vue-lifecycle' },
                  {
                    text: 'Modern Frontend Essentials',
                    link: '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/',
                    collapsed: true,
                    items: [
                      { text: '01 - Becoming a Well-Rounded Frontend Developer', link: '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/01-becoming-a-well-rounded-frontend-developer' },
                      { text: '02 - Recap and Chapter Overview', link: '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/02-recap-and-chapter-overview' },
                      { text: '03 - Computer Networks, Part 1', link: '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/03-computer-networks-part-1' },
                      { text: '04 - Computer Networks, Part 2', link: '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/04-computer-networks-part-2' },
                      { text: '05 - Languages, ES Standards, JS Engines and Runtimes', link: '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/05-languages-es-standards-js-engines-and-runtimes' },
                      { text: '06 - The Simple Yet Complex Toolchain', link: '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/06-the-simple-yet-complex-toolchain' },
                      { text: '07 - A New Way to Build UIs', link: '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/07-a-new-way-to-build-uis' },
                      { text: '08 - Application Frameworks', link: '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/08-application-frameworks' },
                      { text: '09 - Performance Optimization', link: '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/09-performance-optimization' },
                      { text: '10 - User Experience', link: '/en/archive/computer-science/frontend/vue3/modern-frontend-essentials/10-user-experience' },
                    ],
                  },
                  {
                    text: 'CSS in Practice',
                    link: '/en/archive/computer-science/frontend/vue3/css/',
                    collapsed: true,
                    items: [
                      { text: 'CSS Deep Dive', link: '/en/archive/computer-science/frontend/vue3/css/' },
                      { text: 'Header Layout', link: '/en/archive/computer-science/frontend/vue3/css/header-layout' },
                      { text: 'Header Animations', link: '/en/archive/computer-science/frontend/vue3/css/header-animations' },
                      { text: 'Notable Talks', link: '/en/archive/computer-science/frontend/vue3/css/notable-talks' },
                    ],
                  },
                ],
              },
              {
                text: 'Engineering Practice',
                link: '/en/archive/computer-science/frontend/engineering-practice/',
                collapsed: true,
                items: [
                  { text: 'Dynamic Homepage Config', link: '/en/archive/computer-science/frontend/engineering-practice/dynamic-homepage-config' },
                  { text: 'Main Page Logic', link: '/en/archive/computer-science/frontend/engineering-practice/main-page-logic' },
                  { text: 'New DOM Operations', link: '/en/archive/computer-science/frontend/engineering-practice/new-dom-operations' },
                  { text: 'File Uploads', link: '/en/archive/computer-science/frontend/engineering-practice/file-uploads' },
                  { text: 'ES6 Async Handling', link: '/en/archive/computer-science/frontend/engineering-practice/es6-async-handling' },
                ],
              },
            ],
          },
        ],
      },
      {
        text: 'Personal',
        link: '/en/archive/personal/',
        collapsed: true,
        items: [
          {
            text: 'Daily Entries',
            collapsed: true,
            items: [
              { text: 'Entry 1', link: '/en/archive/personal/daily/entry-1' },
              { text: 'Entry 2', link: '/en/archive/personal/daily/entry-2' },
              { text: 'Entry 3', link: '/en/archive/personal/daily/entry-3' },
              { text: 'Entry 4', link: '/en/archive/personal/daily/entry-4' },
              { text: 'Entry 5', link: '/en/archive/personal/daily/entry-5' },
              { text: 'Entry 6', link: '/en/archive/personal/daily/entry-6' },
              { text: 'Entry 7', link: '/en/archive/personal/daily/entry-7' },
              { text: 'Entry 8', link: '/en/archive/personal/daily/entry-8' },
              { text: 'Entry 9', link: '/en/archive/personal/daily/entry-9' },
            ],
          },
          {
            text: 'Stage Summaries',
            collapsed: true,
            items: [
              { text: 'Restarting the Blog', link: '/en/archive/personal/summaries/restarting-the-blog' },
              { text: 'Rebuilding Old Posts', link: '/en/archive/personal/summaries/rebuilding-old-posts' },
              { text: 'Freshman Spring Final Review', link: '/en/archive/personal/summaries/freshman-spring-final-review' },
              { text: 'Sophomore Fall Kickoff', link: '/en/archive/personal/summaries/sophomore-fall-kickoff' },
              { text: 'Sophomore Fall Mid-term Review', link: '/en/archive/personal/summaries/sophomore-fall-mid-term-review' },
              { text: 'Sophomore Spring Kickoff', link: '/en/archive/personal/summaries/sophomore-spring-kickoff' },
            ],
          },
          {
            text: 'Interviews',
            link: '/en/archive/personal/interviews/',
            collapsed: true,
            items: [{ text: 'First Interview', link: '/en/archive/personal/interviews/first-interview' }],
          },
          {
            text: 'Internship',
            link: '/en/archive/personal/internship/',
            collapsed: true,
            items: [
              { text: 'Week 1', link: '/en/archive/personal/internship/week-1' },
              { text: 'Week 2', link: '/en/archive/personal/internship/week-2' },
              { text: 'Meeting Notes', link: '/en/archive/personal/internship/meeting-notes' },
              {
                text: 'Cybersecurity',
                link: '/en/archive/personal/internship/cybersecurity/',
                collapsed: true,
                items: [
                  { text: 'Critical Infrastructure Protection', link: '/en/archive/personal/internship/cybersecurity/critical-infrastructure-protection' },
                  { text: 'Offense, Defense and Endpoint Security', link: '/en/archive/personal/internship/cybersecurity/offense-defense-and-endpoint-security' },
                  { text: 'Struts2 S2-045 Vulnerability Analysis', link: '/en/archive/personal/internship/cybersecurity/struts2-s2-045-vulnerability-analysis' },
                  { text: 'Fengtai Learning Platform Suggestions', link: '/en/archive/personal/internship/cybersecurity/fengtai-learning-platform-suggestions' },
                ],
              },
            ],
          },
        ],
      },
      {
        text: 'Innovation Base',
        link: '/en/archive/innovation-base/',
        collapsed: true,
        items: [
          { text: 'Training Session 1', link: '/en/archive/innovation-base/training-session-1' },
          { text: 'Training Session 2', link: '/en/archive/innovation-base/training-session-2' },
          { text: 'New Website Progress', link: '/en/archive/innovation-base/website-progress' },
        ],
      },
    ],
  },
}
