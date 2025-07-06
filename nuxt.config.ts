// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@pinia/nuxt',
    "@nuxt/image",
    "@nuxtjs/strapi",
    "@nuxt/icon",
  ],

  css: [
    '@/assets/css/main.css',
    '@/assets/css/slide.css',
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
      allowedHosts: ['drug-app.demo.egat.work']
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
    preset: 'github-pages',
    prerender: {
      failOnError: false, // Continue build even if prerendering fails
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/criteria', '/regimen', '/time', '/cpg', '/about', '/contact']
    }
  },

  compatibilityDate: '2025-06-07'
})