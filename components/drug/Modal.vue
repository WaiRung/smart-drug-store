<script lang="ts" setup>
import { ref } from 'vue'
import { FwbButton, FwbModal } from 'flowbite-vue'

defineProps({
  
  BtnText: {
    type: String,
    default: ''
  },
  
})


const isShowModal = ref(false)

function closeModal () {
  isShowModal.value = false
}
function showModal () {
  isShowModal.value = true
}
</script>

<template>
  <fwb-button
    data-testid="drugDetail-modal-button"
    size="xs"
    color="light"
    @click.prevent="showModal"
    pill
    >
    <div class="flex">
    <Icon
        class="text-green-500"
        name="f7:question" />
    </div>
    
  </fwb-button>

  <fwb-modal v-if="isShowModal" @close="closeModal" data-testid="drugDetail-modal">
    <template #header >
      <div class="font-bold flex items-center text-2xl">
        ข้อมูลยา
      </div>
    </template>
    <template #body>
      <DrugDetails />
    </template>
    <!-- <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="closeModal" color="alternative">
          Decline
        </fwb-button>
        <fwb-button @click="closeModal" color="green">
          I accept
        </fwb-button>
      </div>
    </template> -->
  </fwb-modal>
</template>