<script lang="ts" setup>
import { ref } from 'vue'
import { FwbButton, FwbModal } from 'flowbite-vue'
import { useDrugStore } from '@/stores/drug'

const props = defineProps({
  btnText: {
    type: String,
    default: ''
  },
  classData: {
    type: Number,
    default: ''
  },
})

const isShowModal = ref(false)

const drugStore = useDrugStore()

const drugData = computed(() => {
    const drug = drugStore.getDrugs(props.classData)
    return drug
})

function closeModal() {
  isShowModal.value = false
}
function showModal() {

  isShowModal.value = true
}
</script>

<template>
  <fwb-button data-testid="drugDetail-modal-button" size="xs" color="light" @click.prevent="showModal" pill>
    <div class="flex">
      <Icon class="text-green-500" name="f7:question" />
    </div>

  </fwb-button>

  <fwb-modal v-if="isShowModal" @close="closeModal" data-testid="drugDetail-modal">
    <template #header>
      <div class="font-bold flex items-center text-2xl">
        {{ btnText }}
      </div>
    </template>
    <template #body>
      <ClassDetails :drug-data="drugData" />
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