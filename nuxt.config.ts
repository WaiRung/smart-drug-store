// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxt/test-utils/module',
    "@nuxt/image",
    "@nuxtjs/strapi",
    "@nuxt/icon"
  ],

  css: ['@/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  strapi: {
    // Options
    url: 'https://drug-strapi-api.demo.egat.work'
  },

  compatibilityDate: '2024-07-25'
})