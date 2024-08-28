import { defineStore } from 'pinia'

export const useSlideStore = defineStore('useSlideStore', () => {
  const direction = ref('slide-right')

  const isloading = ref(false)

  const getDirection = computed(() => {
    return direction.value
  })

  const getIsloading = computed(() => {
    return isloading.value
  })

  function setDirection(newDirection: string) {
    direction.value = newDirection
  }

  function setisloading(newIsloading:boolean) {
    isloading.value = newIsloading
  }
  return {
    direction,
    getIsloading,
    getDirection,
    setDirection,
    setisloading
  }
})