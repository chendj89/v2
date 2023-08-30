import { ensureLeadingSlash, resolveLocalePath } from '../../shared/src'
import { colors, logger } from '../../utils/src'
import mc from 'markdown-it-container'
const container = (
  md,
  { type, after, before, locales, validate, marker, render }
) => {
  if (!render) {
    let renderBefore: any
    let renderAfter: any
    if (before !== undefined && after !== undefined) {
      renderBefore = before
      renderAfter = after
    } else {
      renderBefore = (info: string): string =>
        `<div class="custom-container ${type}">${
          info ? `<p class="custom-container-title">${info}</p>` : ''
        }\n`
      renderAfter = (): string => '</div>\n'
    }

    // token info stack
    const infoStack: string[] = []
    render = (tokens, index, opts, env): string => {
      const token = tokens[index]
      if (token.nesting === 1) {
        let info = token.info.trim().slice(type.length).trim()
        if (!info && locales) {
          const { filePathRelative } = env
          const relativePath = ensureLeadingSlash(filePathRelative ?? '')
          const localePath = resolveLocalePath(locales, relativePath)
          const localeData = locales[localePath] ?? {}
          if (localeData.defaultInfo) {
            info = localeData.defaultInfo
          } else {
            info = type.toUpperCase()
          }
        }
        infoStack.push(info)
        return renderBefore(info)
      } else {
        const info = infoStack.pop() || ''
        return renderAfter(info)
      }
    }
  }

  md.use(mc, type, { render, validate, marker })
}
export { container }
