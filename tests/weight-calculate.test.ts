import { fileURLToPath } from 'node:url'
import { resolve } from 'path'
import { describe, expect, it, test } from 'vitest'
import { setup, $fetch, isDev } from '@nuxt/test-utils'
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import CriteriaselectionVue from '~/components/criteria/Selection.vue'
import { mount } from '@vue/test-utils'

describe('Components', async () => {
  await setup({
    rootDir: resolve(fileURLToPath(import.meta.url), '..'),
    server: true
  })
  it('Renders Criteria Selection', async () => {
    expect(await $fetch('/criteria-selection')).toMatch('Criteria Selection')
  })

  it('can render some component', async () => {
    await renderSuspended(CriteriaselectionVue)
    expect(screen.getByText('ยาที่ต้องการคำนวน')).toBeDefined()
  })
  
  if (isDev()) {
    it('[dev] ensure vite client script is added', async () => {
      expect(await $fetch('/')).toMatch('/_nuxt/@vite/client"')
    })
  }
})