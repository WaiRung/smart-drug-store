<script setup>

const props = defineProps({
    show: Boolean,
    title: {
      type: String,
      default: ""
    },
    fixed: {
      type: Boolean,
      default: false
    },
});

const emit = defineEmits(['close', 'close-cancel']);

// functions that mutate state and trigger updates
function tryClose() {
    if (props.fixed) {
      return;
    }
    emit('close');
}

function tryCloseCancel() {
    if (props.fixed) {
      return;
    }
    emit('close-cancel');
}

</script>

<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 bg-green-900">
          <slot name="header">
            <h2 class="text-xl font-medium">{{ title }}</h2>

            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click="tryClose">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu class="flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600" v-if="!fixed">
          <slot name="actions">
            <LandingButton type="button" @click="tryClose" size="" block>ตกลง</LandingButton>
            <LandingButton type="button" @click="tryClose" size="" block>ยกเลิก</LandingButton>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}



.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
   transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>