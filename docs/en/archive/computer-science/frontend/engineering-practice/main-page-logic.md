---
date: 2025-04-26
---

# Main Page Logic

This Vue file is an **enterprise-grade homepage component** that contains a header navigation bar, a carousel banner, several business segment displays, and a footer. The following is a detailed breakdown of its core parts:

---

### **1. Header Area (`zg-index-header`)**

```html
<div class="zg-index-header" ref="zgIndexHeaderRef">
  <!-- 企业Logo -->
  <img :src="infoData.logo" v-show="!imgLoading">

  <!-- 右侧功能区 -->
  <div class="right-box">
    <!-- 大屏跳转按钮（仅管理员可见） -->
    <el-tooltip v-if="getCookieValue('sso_token') ? isSuper : false">
      <img @click="toScreen" src="bigscreen.png">
    </el-tooltip>

    <!-- 搜索组件 -->
    <Search />

    <!-- 用户下拉菜单 -->
    <el-dropdown>
      <span class="header-avatar">
        <CustomPic /> <!-- 自定义头像组件 -->
        <span>{{ userStore.userInfo.nickName }}</span>
        <el-icon><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="loginIn" v-if="!getCookieValue('sso_token')">登入</el-dropdown-item>
          <el-dropdown-item @click="userStore.LoginOut" v-else>登出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</div>
```

- **Features**:
    - Displays the enterprise logo (`infoData.logo`)
    - A **big-screen entry** visible only to administrators (`toScreen`)
    - Integrated search (`Search` component)
    - User login/logout control (relies on `sso_token` and `userStore`)
- **Technical points**:
    - `ref="zgIndexHeaderRef"` can be used to obtain the header DOM (for example, to calculate its height)
    - Conditional rendering (`v-if`, `v-show`) controls whether elements are shown

---

### **2. Banner Area (`zg-index-banner`)**

```html
<div class="zg-index-banner" ref="zgIndexBanner">
  <!-- 主标题 -->
  <div class="zg-index-main-title">{{ infoData.indexTitle }}</div>

  <!-- 文字轮播（ElCarousel） -->
  <el-carousel @change="carouselChange">
    <el-carousel-item v-for="item in baseInfoArr">
      <pre v-if="item.desc.includes('\n')">{{ item.desc }}</pre>
      <span v-else>{{ item.desc }}</span>
      <a @click="baseInfoJump(item)">查看详情 ></a>
    </el-carousel-item>
  </el-carousel>

  <!-- 快速导航入口 -->
  <div class="zg-index-banner-target">
    <a
      v-for="item in bannerArr"
      @click.prevent="scrollToSection(item.href)"
    >
      <img :src="item.icon">
      <div>
        <div class="name">{{ item.name }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </a>
  </div>
</div>
```

- **Features**:
    - Displays the enterprise main title (`infoData.indexTitle`)
    - A **text carousel** (driven by the `baseInfoArr` data, supporting multi-line display)
    - Four **quick entries** (`bannerArr`) that smoothly scroll to the corresponding segment when clicked
- **Technical points**:
    - `@click.prevent` prevents the default navigation and uses `scrollToSection` for anchor scrolling instead
    - The `@change` event of `el-carousel` listens for carousel switching

---

### **3. Business Segments (Talent Development / Cross-Domain Connectivity / Vulnerability Discovery / Security Testing)**

### **Common Structure**

```html
<div class="zg-index-talent-cultivation" id="talentId">
  <!-- 标题+下划线 -->
  <div class="zg-index-title-container">
    <div class="zg-index-title">
      <span>人才培养</span>
      <div class="zg-index-title-underLine"></div>
    </div>
  </div>

  <!-- 描述文本 -->
  <div class="zg-index-desc">{{ businessPlateObj['人才培养'].description }}</div>

  <!-- 子功能入口 -->
  <div class="zg-index-talent-target">
    <div
      v-for="(item, index) in trainArr"
      @mouseenter="talentHover(index, item)"
      @click="zgIndexJump(item)"
      :class="{ 'active': talentCurrentIndex === index }"
      :style="{ cursor: item.disabled ? 'not-allowed' : 'pointer' }"
    >
      <img :src="item.iconActive">
      <div class="name">{{ item.name }}</div>
      <div class="desc">{{ item.desc }}</div>
    </div>
  </div>
</div>
```

- **Features**:
    - Each segment has a **unified title style** (with an underline animation)
    - Displays the business description (obtained dynamically from `businessPlateObj`)
    - Multiple sub-feature entries (such as `trainArr`, `vulnerabilityArr`, etc.), supporting:
        - Hover highlighting (`@mouseenter`)
        - Click-through navigation (`zgIndexJump`)
        - Access control (such as `userApps.includes(item.appKey)`)
- **Technical points**:
    - `id="talentId"` is used for anchor positioning (used by `scrollToSection`)
    - Dynamic styles (`:class`, `:style`) control the interaction state

---

### **4. Footer (`zg-index-footer`)**

```html
<div class="zg-index-footer">
  <span>{{ infoData.footer }}</span>
</div>
```

- Simply displays copyright information (obtained from `infoData.footer`)

---

### **Core Interaction Logic**

1. **Access control**
    - Uses `getCookieValue('sso_token')` to determine the login status
    - `userApps` controls which sub-features a user can access (for example, the `item.appKey` check)
2. **Scroll positioning**
    
    ```jsx
    function scrollToSection(href) {
      // 示例：滚动到 #talentId
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
    ```
    
3. **Data-driven**
    - All content is rendered from reactive data such as `infoData`, `businessPlateObj`, and `bannerArr`

---

### **Summary**

This is a typical **enterprise portal homepage**, containing:

- **Responsive layout** (adapts to different screens)
- **Modular design** (header, banner, business segments, footer)
- **Rich interactions** (carousel, hover, permission-based navigation, smooth scrolling)
- **Vue 3 features**: Composition API, DOM manipulation via `ref`, conditional rendering, and more

If you need to optimize or extend it (such as SEO adaptation or mobile responsiveness), we can discuss that further!
