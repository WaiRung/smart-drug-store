<script setup>
import { FwbButton } from 'flowbite-vue'
import { useSlideStore } from '@/stores/slide'
import { useRouter } from 'nuxt/app'

// Define props if needed
defineProps({
  title: {
    type: String,
    default: 'App Title'
  }
});

// Define emits for button actions
const emit = defineEmits(['back', 'refresh', 'home']);

// Handle button clicks
const handleBack = () => {
  definePageMeta({
    pageTransition: {
      name: 'slide-left',
      mode: 'out-in'
    },
    middleware: ['slide-direction']
  })
  const slideStore = useSlideStore()
  slideStore.setDirection('slide-right')
  const router = useRouter()
  router.back()
};

const handleRefresh = () => {
  reloadNuxtApp({ path: '/' })
};

const handleHome = async () => {
  definePageMeta({
    pageTransition: {
      name: 'slide-left',
      mode: 'out-in'
    },
    middleware: ['slide-direction']
  })
  const slideStore = useSlideStore()
  slideStore.setDirection('slide-right')
  await navigateTo('/')
};
</script>

<template>
  <div class="layout-wrapper">
    <nav class="fixed top-0 left-0 w-full bg-transparent z-[9999]" style="transform: translateZ(0);">
      <div class="max-w-screen-xl mx-auto px-4">
        <div class="flex items-center justify-between h-16 py-2">
          <!-- Back Button -->
          <fwb-button color="green" class="mx-2" outline pill @click="handleBack">

            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </fwb-button>

          <!-- Home Button -->
          <fwb-button color="green" class="mx-2" outline pill @click="handleHome">

            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </fwb-button>

          <!-- Refresh Button -->
          <fwb-button color="green" class="mx-2" outline pill @click="handleRefresh">

            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </fwb-button>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.layout-wrapper {
  position: relative;
  min-height: 25px;
}

.navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  z-index: 50;
}

.content {
  padding-top: 5vh;
}
</style>