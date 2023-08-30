import { slugify as defaultSlugify } from '@mdit-vue/shared'
import MarkdownIt from 'markdown-it'
import {
  anchorPlugin,
  assetsPlugin,
  codePlugin,
  componentPlugin,
  emojiPlugin,
  frontmatterPlugin,
  headersPlugin,
  importCodePlugin,
  linksPlugin,
  sfcPlugin,
  titlePlugin,
  tocPlugin,
  Shiki,
  container
} from './plugins.js'
import type {
  AnchorPluginOptions,
  AssetsPluginOptions,
  CodePluginOptions,
  EmojiPluginOptions,
  FrontmatterPluginOptions,
  HeadersPluginOptions,
  ImportCodePluginOptions,
  LinksPluginOptions,
  SfcPluginOptions,
  TocPluginOptions
} from './plugins.js'
import type { Markdown, MarkdownOptions } from './types.js'

/**
 * Create vuepress customized markdown-it instance
 */
export const createMarkdown = ({
  anchor,
  assets,
  code,
  component,
  emoji,
  frontmatter,
  headers,
  title,
  importCode,
  links,
  sfc,
  slugify = defaultSlugify,
  toc,
  ...markdownItOptions
}: MarkdownOptions = {}): Markdown => {
  // create raw markdown-it instance
  const md = MarkdownIt({
    ...markdownItOptions,
    // should always enable html option
    html: true
  })

  // =====================================================
  // following plugins push rules to the end of chain, so
  // the order to use them is important

  // add anchor to headers
  if (1 || anchor !== false) {
    md.use<AnchorPluginOptions>(anchorPlugin, {
      level: [1, 2, 3, 4, 5, 6],
      slugify,
      permalink: anchorPlugin.permalink.ariaHidden({
        class: 'header-anchor',
        symbol: '#',
        space: true,
        placement: 'before'
      }),
      ...anchor
    })
  }

  // =====================================================
  // following plugins modify or replace the rule in place
  // and have no conflicts, so the order is not important

  // replace relative link of assets with absolute link
  if (1 || assets !== false) {
    md.use<AssetsPluginOptions>(assetsPlugin, assets)
  }

  // process code fence
  if (1 || code !== false) {
    md.use<CodePluginOptions>(codePlugin, code)
  }

  // treat unknown html tags as components
  if (1 || component !== false) {
    md.use(componentPlugin)
  }

  // parse emoji
  if (1 || emoji !== false) {
    md.use<EmojiPluginOptions>(emojiPlugin, emoji)
  }

  // extract frontmatter into env
  if (1 || frontmatter !== false) {
    md.use<FrontmatterPluginOptions>(frontmatterPlugin, {
      ...frontmatter,
      grayMatterOptions: {
        excerpt: false,
        ...frontmatter?.grayMatterOptions
      }
    })
  }

  // extract headers into env
  if (1 || headers !== false) {
    md.use<HeadersPluginOptions>(headersPlugin, {
      level: [2, 3],
      slugify,
      ...headers
    })
  }

  // handle import_code syntax
  if (1 || importCode !== false) {
    md.use<ImportCodePluginOptions>(importCodePlugin, importCode)
  }

  // process external and internal links
  if (1 || links !== false) {
    md.use<LinksPluginOptions>(linksPlugin, links)
  }

  // extract vue SFC blocks into env
  if (1 || sfc !== false) {
    md.use<SfcPluginOptions>(sfcPlugin, sfc)
  }

  // allow toc syntax
  if (1 || toc !== false) {
    md.use<TocPluginOptions>(tocPlugin, {
      level: [2, 3],
      slugify,
      linkTag: 'router-link',
      ...toc
    })
  }

  // extract title into env
  if (1 || title !== false) {
    md.use(titlePlugin)
  }
  // extract title into env
  if (1) {
    md.use(Shiki, {
      theme: 'dark-plus'
    })
    
    md.use(container, {
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
        before: (info: any) =>
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
        before: (info: any) => `<CodeGroupItem title="${info}">\n`,
        after: () => '</CodeGroupItem>\n'
      })
  }

  return md
}
