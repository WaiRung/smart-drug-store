
export default defineNuxtRouteMiddleware((to, from) => {
    // Only run on client-side
    if (process.client) {
      const slideStore = useSlideStore()
      
      if (to.meta.pageTransition && typeof to.meta.pageTransition !== 'boolean') {
        to.meta.pageTransition.name = slideStore.getDirection
      }
    }
  })