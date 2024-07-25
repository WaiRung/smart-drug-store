import { fileURLToPath } from 'node:url'
import { resolve } from 'path'
import { describe, expect, it, test } from 'vitest'
import { setup, $fetch, isDev } from '@nuxt/test-utils'
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import WeightformVue from '~/components/weight/Weightform.vue'
import SearchdropdownVue from '~/components/weight/Searchdropdown.vue'
import { mount } from '@vue/test-utils'

describe('Components', async () => {
  await setup({
    rootDir: resolve(fileURLToPath(import.meta.url), '..'),
    server: true
  })

  it('can render selectDrug component', async () => {
    const DropdownBtnSelector = '[data-testid=search-dropdown-button]'
    const wrapper = mount(SearchdropdownVue, {
      props: {
        buttonText: 'ค้นหายา'
      }
    })
    const selectedDrugDropdown = wrapper.get(DropdownBtnSelector)
    expect(selectedDrugDropdown.text()).toContain('ค้นหายา')
  })

  test('Selected Drug should initailly be -', () => {
    const selectedDrugSelector = '[data-testid=selected-drug-text]'
    const wrapper = mount(WeightformVue, {
    })
    const selectedDrugText = wrapper.get(selectedDrugSelector)
    expect(selectedDrugText.text()).toContain('-')
  })



  test('drugDetail-modal-button should appear when drug selcted', async () => {
    const DropdownBtnSelector = '[data-testid=search-dropdown-button]'
    const DropdownInputSelector = '[data-testid=search-dropdown-radio-input]'


    const wrapper = mount(WeightformVue, {
    })
    const selectDrugBtn = wrapper.get(DropdownBtnSelector)
    const dropdownInputRadio = wrapper.get(DropdownInputSelector)

    await selectDrugBtn.trigger('click')
    await dropdownInputRadio.trigger('click')


    const drugdetailButtonSelector = '[data-testid=drugDetail-modal-button]'
    const drugdetailButton = wrapper.find(drugdetailButtonSelector)

    expect(drugdetailButton.exists()).toBe(true)
  })

  test('drugDetail-modal should appear when modal-button clicked', async () => {
    const DropdownBtnSelector = '[data-testid=search-dropdown-button]'
    const DropdownInputSelector = '[data-testid=search-dropdown-radio-input]'


    const wrapper = mount(WeightformVue, {
    })
    const selectDrugBtn = wrapper.get(DropdownBtnSelector)
    const dropdownInputRadio = wrapper.get(DropdownInputSelector)

    await selectDrugBtn.trigger('click')
    await dropdownInputRadio.trigger('click')


    const drugdetailButtonSelector = '[data-testid=drugDetail-modal-button]'
    const drugdetailButton = wrapper.get(drugdetailButtonSelector)

    await drugdetailButton.trigger('click')

    const drugdetailModalSelector = '[data-testid=drugDetail-modal]'
    const drugdetailModal = wrapper.find(drugdetailModalSelector)

    expect(drugdetailModal.exists()).toBe(true)

  })



  test('deseaseInput should have expected value', async () => {

    const deseaseInputSelector = '[data-testid=diagnosis-input]'
    const ageRangeInputSelector = '[data-testid=ageRange-input]'
    const weightInputSelector = '[data-testid=weight-input]'
    const weightFormButtonSelector = '[data-testid=submit-weightForm-button]'

    const wrapper = mount(WeightformVue, {
    })

    const deseaseInput = wrapper.get(deseaseInputSelector)
    const ageRangeInput = wrapper.get(ageRangeInputSelector)
    const weightInput = wrapper.get(weightInputSelector)
    const weightFormButton = wrapper.get(weightInputSelector)

    await deseaseInput.setValue('Analgesic')

    expect((deseaseInput.element as HTMLInputElement).value).toBe('Analgesic')

    await ageRangeInput.setValue('อายุ 1 - 3 เดือน')
    await weightInput.setValue('22')

    await weightFormButton.trigger('click')

  })

  if (isDev()) {
    it('[dev] ensure vite client script is added', async () => {
      expect(await $fetch('/')).toMatch('/_nuxt/@vite/client"')
    })
  }
})