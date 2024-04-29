import { fileURLToPath } from 'node:url'
import { resolve } from 'path'
import { describe, expect, it } from 'vitest'
import { setup, $fetch, isDev } from '@nuxt/test-utils'

describe('Components', async () => {
    await setup({
      // rootDir: fileURLToPath(new URL('..', import.meta.url)),
      rootDir: resolve(fileURLToPath(import.meta.url), '..'),
      server: true
    })
  
    it('Renders Marketing website done with Nuxt', async () => {
      expect(await $fetch('/')).toMatch('Marketing website done with Nuxt')
    })
  
  
    if (isDev()) {
      it('[dev] ensure vite client script is added', async () => {
        expect(await $fetch('/')).toMatch('/_nuxt/@vite/client"')
      })
    }
  })