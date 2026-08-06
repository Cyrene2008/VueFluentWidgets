import { inject, provide, readonly } from 'vue'

const demoLocaleKey = Symbol('demo-locale')

export const provideDemoLocale = language => {
  provide(demoLocaleKey, readonly(language))
}

export const useDemoLocale = () => {
  const language = inject(demoLocaleKey)
  if (!language) throw new Error('Demo locale provider is missing')
  const text = (zh, en) => language.value === 'en' ? en : zh
  return { language, text }
}
