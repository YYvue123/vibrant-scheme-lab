# Rita AI 平台 — 交互文档

## 一、项目概述

Rita 是一个多功能 AI 工具平台，提供 AI 对话、AI 生图、AI 视频、AI 音频四大功能模块。采用左侧边栏 + 顶部 Header + 右侧内容区的经典布局。

---

## 二、技术栈与配置要求

### 2.1 核心依赖

| 包名 | 用途 |
|---|---|
| nuxt@4 | 主框架，preset: `'bun'` |
| @nuxt/ui | 主 UI 框架 |
| @nuxtjs/sitemap | 生成 sitemap.xml（含 lastmod、priority，priority 默认 1） |
| @nuxtjs/robots | 生成 robots.txt（生产环境允许抓取，其他环境禁止） |
| @nuxt/scripts | 引入第三方 JS |
| @nuxt/eslint | 代码校验与格式化（标准级别，commit 时校验，保存时格式化） |
| @pinia/nuxt | 状态管理 |
| bun | runtime & 包管理 |
| bun-types | Bun 类型声明 |
| pm2 | 部署（cluster 模式，instances: max，配置文件放 `docker/` 目录） |

### 2.2 Nuxt 配置要点

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: { preset: 'bun' },
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/scripts',
    '@nuxt/eslint',
    '@pinia/nuxt',
  ],
  sitemap: {
    defaults: { lastmod: new Date().toISOString(), priority: 1 },
  },
  robots: {
    rules: process.env.NODE_ENV === 'production'
      ? { UserAgent: '*', Allow: '/' }
      : { UserAgent: '*', Disallow: '/' },
  },
})
```

### 2.3 PM2 配置（`docker/ecosystem.config.cjs`）

```js
module.exports = {
  apps: [{
    name: 'rita-ai',
    script: '.output/server/index.mjs',
    exec_mode: 'cluster',
    instances: 'max',
  }],
}
```

---

## 三、主题变量

遵循 @nuxt/ui 的 CSS 变量规范，仅覆盖以下变量，其余使用 Tailwind 默认值：

| 变量 | Light Mode（默认） | Dark Mode |
|---|---|---|
| `--primary` | `240 73.9% 61%` | `240 73.9% 61%` |
| `--background` | `0 0% 100%` | `240 6.7% 20.6%` |
| `--foreground` | `0 0% 9%` | `0 0% 100%` |
| `--border` | `240 15% 88%` | `240 16% 94%` |

**注意**：不允许直接修改 `main.css`。若需修改，列出清单交由开发人员确认后手动修改。

---

## 四、开发规范（全局约束）

1. **所有可点击元素**必须添加 `hover` 效果。
2. 可点击按钮和 `<a>` 标签，hover 时 `cursor: pointer`。
3. **组件目录结构**：`components/` 下的文件必须放入以调用页面名命名的子文件夹中（如 `components/ai-chat/`），不允许直接放在 `components/` 根目录。
4. 所有页面**必须支持亮色/暗色模式**，无需展示切换按钮（除非特别说明）。
5. `input` 元素 `focus` 状态**不加 shadow**（除非特别说明）。
6. 能用 `@nuxt/ui` 实现的效果**必须使用 UI 库组件**，不手写。
7. **最小功能模块抽离为组件**。
8. 图片元素无法获取地址时，使用 `<img src="" width="..." height="..." />` 占位，不自由发挥。
9. 文本内容从文档/参考链接获取时**原封不动复制**，不自由发挥。
10. server 代码**避免 Node.js 专有 API**，优先使用 Bun 能力，其次使用通用 API。
11. 页面级样式单独创建 CSS 文件放入 `assets/css/` 目录，文件名与页面对应。

---

## 五、目录结构

```
├── assets/
│   └── css/
│       ├── ai-chat.css
│       ├── ai-image.css
│       ├── ai-video.css
│       └── ai-audio.css
├── components/
│   ├── layout/
│   │   ├── AppSidebar.vue
│   │   ├── SidebarNavItem.vue
│   │   └── AppHeader.vue
│   ├── ai-chat/
│   ├── ai-image/
│   ├── ai-video/
│   └── ai-audio/
├── composables/
│   └── useSidebarState.ts
├── layouts/
│   └── default.vue
├── pages/
│   ├── index.vue          (重定向至 /ai-chat)
│   ├── ai-chat.vue
│   ├── ai-image.vue
│   ├── ai-video.vue
│   └── ai-audio.vue
├── stores/
│   └── sidebar.ts
├── docker/
│   └── ecosystem.config.cjs
└── nuxt.config.ts
```

---

## 六、全局布局

### 6.1 布局结构（`layouts/default.vue`）

```
┌────────────────────────────────────────────────────┐
│ ┌──────────┐ ┌───────────────────────────────────┐ │
│ │          │ │          AppHeader (h-12)          │ │
│ │          │ ├───────────────────────────────────┤ │
│ │ Sidebar  │ │                                   │ │
│ │          │ │         <NuxtPage />               │ │
│ │          │ │        (主内容区域)                 │ │
│ │          │ │                                   │ │
│ └──────────┘ └───────────────────────────────────┘ │
└────────────────────────────────────────────────────┘
```

- 整体：`flex h-screen w-full overflow-hidden`
- 侧边栏与内容区左右排列
- 内容区：`flex-1 flex flex-col overflow-hidden`
- Header 固定高度 `h-12`
- 主内容区 `flex-1 overflow-auto`

---

## 七、侧边栏（AppSidebar）

### 7.1 状态

| 状态 | 宽度 | 显示内容 |
|---|---|---|
| 展开 | `180px` | 图标 + 文字 |
| 收起 | `52px` | 仅图标（hover 显示 Tooltip） |

使用 Pinia store（`stores/sidebar.ts`）管理 `collapsed` 状态。

### 7.2 结构

```
┌──────────────┐
│ Rita    [⊞]  │  ← 顶部：品牌名 + 折叠按钮（h-12，底部边框）
├──────────────┤
│ 💬 AI 对话    │  ← 导航项（活跃态高亮）
│ 🖼 AI 生图    │
│ 🎬 AI 视频    │
│ 🎵 AI 音频    │
│              │  ← flex-1 弹性空间
├──────────────┤
│ 👑 开通会员    │  ← 底部操作区
│ 🎁 兑换       │
│ 🎧 在线客服    │  ← Popover：显示客服二维码
│ 🌙 深色/浅色   │  ← 主题切换
│ 👤 用户 ⚡838  │  ← 用户头像 Popover
└──────────────┘
```

### 7.3 顶部区域

| 元素 | 展开态 | 收起态 | 交互 |
|---|---|---|---|
| "Rita" 文字 | 可见，左侧，`text-sm font-semibold italic tracking-tight` | 隐藏 | 点击跳转首页（`/`），`cursor-pointer` |
| 折叠按钮 | 右侧，`PanelLeft` 图标，`h-7 w-7` | 居中 | 点击切换 `collapsed`，hover 背景 `sidebar-hover` |

- 容器：`h-12`，`border-b border-border`，背景 `bg-sidebar`
- 展开态：`justify-between px-3`
- 收起态：`justify-center px-1`

### 7.4 导航项（SidebarNavItem）

| 属性 | 说明 |
|---|---|
| 布局 | `flex items-center gap-3`，图标 `18x18px`，高度 `h-10`，圆角 `rounded-lg`，`text-sm` |
| 默认态 | 文字色 `text-sidebar-foreground`，hover 背景 `hover:bg-sidebar-hover`，`cursor-pointer` |
| 活跃态 | 背景 `bg-primary/15`，文字 `text-primary`，`font-medium` |
| 收起态 | `justify-center px-0`，隐藏文字，hover 显示 `UTooltip`（`side="right"`，`text-xs`） |

导航项列表：

| 图标 | 文字 | 路由 |
|---|---|---|
| `i-lucide-message-square` | AI 对话 | `/ai-chat` |
| `i-lucide-image` | AI 生图 | `/ai-image` |
| `i-lucide-video` | AI 视频 | `/ai-video` |
| `i-lucide-music` | AI 音频 | `/ai-audio` |

### 7.5 底部操作区

#### 开通会员
- 文字色：`text-amber-500`
- 图标：`i-lucide-crown`（18x18px）
- 点击：打开 `UModal`
  - 标题："开通会员"
  - 内容："会员功能正在开发中，敬请期待！解锁更多高级功能与更多配额。"（`text-muted-foreground`）

#### 兑换
- 文字色：`text-sidebar-foreground`
- 图标：`i-lucide-gift`（18x18px）
- 点击：打开 `UModal`
  - 标题："兑换"
  - 内容："请输入您的兑换码以兑换相应配额或会员权益。兑换功能即将上线。"（`text-muted-foreground`）

#### 在线客服
- 文字色：`text-sidebar-foreground`
- 图标：`i-lucide-headphones`（18x18px）
- 点击：打开 `UPopover`（`side="right"`，宽度 `w-48`，`p-2`）
  - 顶部文字："扫码联系客服"（`text-xs text-muted-foreground mb-2 text-center`）
  - 下方：客服二维码图片（`src="~/assets/qrcode.png"`，`w-full rounded`，`alt="客服二维码"`）

#### 主题切换
- 暗色模式：图标 `i-lucide-sun`，文字 "浅色"
- 亮色模式：图标 `i-lucide-moon`，文字 "深色"
- 点击：调用 `useColorMode()` 切换主题
- 文字色：`text-sidebar-foreground`

#### 用户头像区域
- 左侧：圆形头像占位（`w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center`，内含 `i-lucide-user` 图标 `h-4 w-4 text-primary`）
- 右侧（展开态）：
  - 用户名："用户"（`text-xs text-sidebar-foreground truncate`）
  - 配额："⚡ 838"（`text-xs text-primary font-medium`）
- 点击：打开 `UPopover`（`side="right" align="end"`，宽度 `w-64`，`p-0`）

**用户 Popover 内容：**

**上半部分（计划与配额）**：`p-4 border-b border-border`

| 元素 | 样式 |
|---|---|
| "你的计划" | `text-sm font-medium`，左对齐 |
| "可用" badge | `text-xs text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded`，右对齐 |
| "订阅额度:" | `text-muted-foreground`，值 `font-bold`："10 / 10" |
| "更多配额:" | `text-muted-foreground`，值 `font-bold`："828" |

**配额使用说明按钮**：`mt-3`，点击展开嵌套 `UPopover`（`side="right"`，`w-64 p-3`）

| 元素 | 样式 |
|---|---|
| `i-lucide-info` 图标 | `h-3 w-3` |
| "配额使用说明" | `text-xs text-muted-foreground hover:text-foreground cursor-pointer` |

**配额模型列表**（嵌套 Popover 内容）：

标题："配额使用说明"（`text-xs font-medium mb-2`）

| 模型名 | 图标 | 消耗 |
|---|---|---|
| Claude-Opus-4.6 | 🟣 | ⚡3 |
| Gemini-3-Pro-Thinking | 🔵 | ⚡1 |
| Gemini-3-Pro | 🔵 | ⚡1 |
| Gemini-3-Flash | 🔵 | ⚡1 |
| Grok-4.1 | ⚫ | ⚡1 |
| Rita-Pro | 🟢 | ⚡1 |
| Rita | 🟢 | 免费（`text-emerald-500 text-[11px]`） |
| GPT-5.1 | ⚪ | ⚡1 |
| GPT-5.2 | ⚪ | ⚡1 |
| GPT-5.1-Thinking | ⚪ | ⚡1 |
| DeepSeek-V3.1 | 🔵 | ⚡1 |
| Claude-4.5-Sonnet | 🟠 | ⚡1 |
| Claude-Opus-4.6-Thinking | 🟣 | ⚡3 |

每行布局：`flex items-center justify-between text-xs`，左侧 `flex items-center gap-2`（图标 `text-[10px]` + 模型名），右侧消耗值 `flex items-center gap-0.5 text-primary`（`i-lucide-zap h-3 w-3` + 数字）

**下半部分（操作按钮）**：`p-1`

| 按钮 | 图标 | 样式 | 交互 |
|---|---|---|---|
| 对话设置 | `i-lucide-settings`（`h-4 w-4`） | `w-full px-3 py-2 text-sm rounded hover:bg-accent cursor-pointer` | 关闭 Popover → 打开设置 `UModal` |
| 退出登录 | `i-lucide-log-out`（`h-4 w-4`） | 同上 + `text-destructive` | 关闭 Popover → 打开确认 `UModal` |

**对话设置 Modal**：
- 标题："对话设置"
- 内容："对话设置功能正在开发中，您可以在此调整对话相关偏好设置。"（`text-muted-foreground`）

**退出登录确认 Modal**：
- 标题："确认退出登录？"
- 描述："退出登录后将返回登录页面，您的数据不会丢失。"
- 取消按钮："取消"
- 确认按钮："确认退出"

---

## 八、顶部导航栏（AppHeader）

- 容器：`h-12 flex items-center border-b border-border bg-background shrink-0 px-4`
- 当前内容：空白占位，预留未来功能扩展

---

## 九、页面路由

| 路由 | 页面文件 | 说明 |
|---|---|---|
| `/` | `pages/index.vue` | 使用 `navigateTo('/ai-chat', { replace: true })` 重定向 |
| `/ai-chat` | `pages/ai-chat.vue` | AI 对话功能区 |
| `/ai-image` | `pages/ai-image.vue` | AI 生图功能区 |
| `/ai-video` | `pages/ai-video.vue` | AI 视频功能区 |
| `/ai-audio` | `pages/ai-audio.vue` | AI 音频功能区 |
| `*` | `pages/[...slug].vue` | 404 页面 |

### 各功能页面占位内容

所有功能页面当前为占位状态：
- 容器：`flex-1 flex items-center justify-center`
- 文字：`text-muted-foreground text-lg`
- 内容：
  - ai-chat: "AI 对话功能区"
  - ai-image: "AI 生图功能区"
  - ai-video: "AI 视频功能区"
  - ai-audio: "AI 音频功能区"

---

## 十、@nuxt/ui 组件映射表

| 功能 | 对应 @nuxt/ui 组件 | 使用场景 |
|---|---|---|
| 弹窗 | `<UModal>` | 开通会员、兑换、对话设置、退出确认 |
| 气泡卡片 | `<UPopover>` | 在线客服二维码、用户信息面板、配额说明 |
| 提示气泡 | `<UTooltip>` | 侧边栏收起时导航项悬停提示 |
| 按钮 | `<UButton>` | 所有可点击按钮 |
| 图标 | Iconify（`i-lucide-*`） | 所有图标 |

---

## 十一、Pinia Store

### `stores/sidebar.ts`

```ts
export const useSidebarStore = defineStore('sidebar', () => {
  const collapsed = ref(false)

  function toggle() {
    collapsed.value = !collapsed.value
  }

  return { collapsed, toggle }
})
```

---

## 十二、待开发人员确认清单

1. **main.css 修改**：若需在 `main.css` 中添加全局样式（如字体引入 `Noto Sans SC`），请确认以下内容是否可添加：
   - `@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap');`
   - `body { font-family: 'Noto Sans SC', sans-serif; }`
2. **客服二维码图片**：当前使用 `assets/qrcode.png`，请确认图片资源是否已准备。
3. **图标库选择**：建议使用 Iconify（`i-lucide-*`）图标集，@nuxt/ui 默认支持。
