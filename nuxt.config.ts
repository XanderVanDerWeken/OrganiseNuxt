// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['@/assets/theme.css'],

  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
  ],

  colorMode: {
    preference: 'system',
    fallback: 'light',
  }
})