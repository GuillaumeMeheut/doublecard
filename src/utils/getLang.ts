import nookies from 'nookies'
import parser from 'accept-language-parser'

const DEFAULT_LANG = 'fr'
const LANG = ['fr', 'en']

export const getLanguageHeaders = (context: any): string => {
  try {
    const acceptLangHeader = context.req.headers['accept-language']
    const parseHeader = parser.parse(acceptLangHeader)
    let max = 0
    let selectedLang = DEFAULT_LANG
    parseHeader.forEach((v) => {
      if (v.quality > max) {
        selectedLang = v.code
        max = v.quality
      }
    })
    const lang = nookies.get(context).lang
    if (lang) return lang
    if (!acceptLangHeader) return DEFAULT_LANG
    return LANG.includes(selectedLang) ? selectedLang : DEFAULT_LANG
  } catch (_e) {
    return DEFAULT_LANG
  }
}
