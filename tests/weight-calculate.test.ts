import { fileURLToPath } from 'node:url'
import { resolve } from 'path'
import { describe, expect, it, test } from 'vitest'
import { setup, $fetch, isDev } from '@nuxt/test-utils'
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import WeightformVue from '~/components/weight/Weightform.vue'
import { mount } from '@vue/test-utils'

describe('Components', async () => {
  await setup({
    rootDir: resolve(fileURLToPath(import.meta.url), '..'),
    server: true
  })
  it('Renders Weight Form', async () => {
    expect(await $fetch('/weight-calculate')).toMatch('คำนวนปริมาณยาโดยใช้น้ำหนัก')
  })

  it('can render some component', async () => {
    await renderSuspended(WeightformVue)
    expect(screen.getByText('ยาที่ต้องการคำนวน')).toBeDefined()
  })
  
  if (isDev()) {
    it('[dev] ensure vite client script is added', async () => {
      expect(await $fetch('/')).toMatch('/_nuxt/@vite/client"')
    })
  }
})