<script lang="ts" setup>
import { FwbButton, FwbModal } from 'flowbite-vue'

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


function closeModal() {
  // if (props.fixed) {
  //   return;
  // }
  console.log('closeModal');
  emit('close');
}

function closeModalCancel() {
  // if (props.fixed) {
  //   return;
  // }
  console.log('closeModalCancel');
  
  emit('close-cancel');
}

</script>

<template>

  <fwb-modal
    v-if="show"
    not-escapable
    >
    <template #header>
      <slot name="header">
        <div class="font-bold flex items-center text-2xl">
          {{ title }}
        </div>
      </slot>
    </template>
    <template #body>
      <slot></slot>
    </template>
    <template #footer v-if="fixed">
      <div class="flex justify-between">
        <fwb-button @click="closeModal" type="button" color="green">
          เลือก
        </fwb-button>
        <fwb-button @click="closeModalCancel" type="button" color="alternative">
          ยกเลิก
        </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>

<style scoped>
button.text-gray-400 {
  display: hidden !important;
}
</style>