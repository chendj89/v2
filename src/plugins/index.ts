import type { PluginOption } from 'vite'
import {
  createMarkdown,
  Shiki,
  container,
  emojiPlugin,
  codePlugin,
  importCodePlugin
} from './vite-plugin-vue-md/src'
const md = createMarkdown()
md.use(Shiki, {
  theme: 'dark-plus'
})
  .use(emojiPlugin)
  .use(codePlugin)
  .use(importCodePlugin)
  .use(container, {
    type: 'tip',
    locales: {
      '/': {
        defaultInfo: '提示'
      },
      '/zh/': {
        defaultInfo: '提示'
      }
    }
  })
  .use(container, {
    type: 'warnning',
    locales: {
      '/': {
        defaultInfo: '警告'
      },
      '/zh/': {
        defaultInfo: '警告'
      }
    }
  })
  .use(container, {
    type: 'warning',
    locales: {
      '/': {
        defaultInfo: '警告'
      },
      '/zh/': {
        defaultInfo: '警告'
      }
    }
  })
  .use(container, {
    type: 'danger',
    locales: {
      '/': {
        defaultInfo: '危险'
      },
      '/zh/': {
        defaultInfo: '危险'
      }
    }
  })
  .use(container, {
    type: 'details',
    before: (info:any) =>
      `<details class="custom-container details">${
        info ? `<summary>${info}</summary>` : ''
      }\n`,
    after: () => '</details>\n'
  })
  .use(container, {
    type: 'code-group',
    before: () => `<CodeGroup>\n`,
    after: () => '</CodeGroup>\n'
  })
  .use(container, {
    type: 'code-group-item',
    before: (info:any) => `<CodeGroupItem title="${info}">\n`,
    after: () => '</CodeGroupItem>\n'
  })

const vitePluginMd = (): PluginOption => {
  return {
    name: 'vite-plugin-md',
    transform(code, id) {
      if (id.endsWith('.md')) {
        const env:any = {}
        const html = md?.render(code, env)
        const { sfcBlocks } = env
        return [
          sfcBlocks?.scriptSetup ? sfcBlocks?.scriptSetup?.content : '',
          `<template><div class="theme-default-content" style="width:800px;margin:0 auto;">${html}</div></template>`,
          ...(sfcBlocks?.styles.map((item:any) => item.content) ?? []),
          ...(sfcBlocks?.customBlocks?.map((item:any) => item.content) ?? [])
        ].join('\n')
      }
    }
  }
}

export { vitePluginMd }

export default vitePluginMd
