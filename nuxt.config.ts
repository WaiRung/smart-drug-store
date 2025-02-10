// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    "@nuxt/image",
    "@nuxtjs/strapi",
    "@nuxt/icon"
  ],

  css: [
    '@/assets/css/main.css',
    '@/assets/css/slide.css',
  ],

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },

  strapi: {
    // Options
    url: 'https://drug-strapi-api.demo.egat.work'
  },

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
  },

  compatibilityDate: '2025-02-10'
})