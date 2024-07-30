import { defineStore } from 'pinia'

export const useSlideStore  = defineStore('useSlideStore', () => {
  const direction = ref('slide-right')

  const getDirection = computed(() => {
    return direction.value
})

  function setDirection(newDirection: string) {
    direction.value = newDirection
  }

  return {
    direction,
    getDirection,
    setDirection
  }
})