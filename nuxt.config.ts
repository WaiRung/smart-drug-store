// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: false },

  // Nuxt 4 uses different directory structure
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@pinia/nuxt',
    "@nuxt/image",
    "@nuxtjs/strapi",
    "@nuxt/icon",
  ],

  css: [
    '~/assets/css/main.css',
    '~/assets/css/slide.css',
    'flowbite/dist/flowbite.min.css'
  ],
  build: {
    transpile: ['flowbite-vue']
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      allowedHosts: [
        'drug-app.demo.egat.work',
        'https://chicken-prizes-choose-nightlife.trycloudflare.com',
      ]
    },
  },

  strapi: {
    // Options
    url: 'http://localhost:1337'
  },

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
  },

  nitro: {
    preset: 'node-server',
    prerender: {
      failOnError: false, // Continue build even if prerendering fails
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/criteria', '/regimen', '/time', '/cpg', '/about', '/contact']
    },
    rollupConfig: {
      external: ['papaparse']
    }
  },

  compatibilityDate: '2025-06-07'
})
