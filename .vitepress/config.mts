import { defineConfig } from "vitepress";


const originJsBar = {
  text: '原生JS',
  items: [
    { text: "事件循环evenloop", link: "/js/evenloop"},
    { text: "垃圾回收GC", link: "/js/gc"},
    { text: "监听元素是否出现在视口", link: "/js/intersectionobserver"}
  ]
}

const originDomBar = {
  text: "原生DOM",
  items: [
    { text: "原生dom相关知识点", link: "/dom/dom"},
    { text: "script标签", link: "/dom/script"},
  ]
}

const originBar = {
  text: "原生相关",
  items: [
    originJsBar,
    originDomBar,
  ]
}

const exampleBar = {
  text: "示例",
  items: [
    { text: "Markdown Examples", link: "/markdown-examples" },
    { text: "Runtime API Examples", link: "/api-examples" },
  ],
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "wolf2gang blog",
  description: "simple blog",
  outDir: "./dist",
  lastUpdated: true,
  head: [
    ['link', { rel: 'shortcut icon', href: 'https://imgcdn.somebodyelse.cn/wolf2gang/wolf2gang.ico' }]
  ],
  themeConfig: {
    i18nRouting: false,
    logo: "/logo.webp",

    search: {
      provider: "local",
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "主页",
        items: [
          {
            text: "canvas",
            items: [
              {
                text: "图片高斯模糊",
                link: "/canvas/image-gaussian-blur",
              },
              { text: "流程图-v2", link: "/canvas/flow-chart-v2" },
            ],
          },
        ],
      },
      originBar,
      exampleBar,
    ],

    sidebar: [
      originBar,
      exampleBar,
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/wolf-sence/wolf-sence.github.io",
      },
    ],
    // 文章翻页
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },

    // 移动端 - 外观
    darkModeSwitchLabel: "外观",

    // 移动端 - 返回顶部
    returnToTopLabel: "返回顶部",

    // 移动端 - menu
    sidebarMenuLabel: "菜单",
  },
});
