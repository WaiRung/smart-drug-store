// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
// import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    "@nuxt/image",
    "@nuxtjs/strapi",
    "@nuxt/icon",
    // "@nuxtjs/tailwindcss"
  ],

  css: [
    '@/assets/css/main.css',
    '@/assets/css/slide.css',
  ],

  vite: {
    plugins: [
      // tailwindcss(),
    ],
    server: {
      allowedHosts: ['drug-app.demo.egat.work']
    }
  },

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

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
  },

  compatibilityDate: '2025-02-10'
})