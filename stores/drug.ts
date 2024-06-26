import { defineStore } from 'pinia'
import type { DrugInterface } from '~/types'
import { useErrorStore } from './error';

export const useDrugStore = defineStore('useDrugStore', () => {
  const { find } = useStrapi()
  const drugs: any = ref([])

  const getDrugs = computed(() => {
    return () => {
      return drugs.value
    }
  })


  async function fetchDrugs() {
    try {
      const response = await find<DrugInterface>('drugs');

      if (response) {
        drugs.value = response.data;
        mapDrugsWithSelectedValid()
      }
    } catch (error) {
      const errorStore = useErrorStore()
      errorStore.setError(error)
      // throw error
    }
  }

  function mapDrugsWithSelectedValid() {
    if (drugs.value) {
      try {
        drugs.value = drugs.value.map((drug: any) => {
          // Perform mapping or transformation on each item
          return {
            // Return the mapped object
            ...drug.attributes,
            selected: false,
            isValid: true,
          }
        })
      } catch (error) {
        const errorStore = useErrorStore()
        errorStore.setError(error)
      }
    } else {

    }
  }

  return { drugs, getDrugs, fetchDrugs, mapDrugsWithSelectedValid }
})