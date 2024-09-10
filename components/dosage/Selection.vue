<script setup>
import { useDosageStore } from '~/stores/dosage';

const dosageStore = useDosageStore()

const filterData = computed(() => {
    const filter = dosageStore.getFilter()
    return filter
})

function onChangeWeight(evt) {
    dosageStore.onChangeWeight(evt)
}
</script>

<template>
    <form id="form" class="px-7 md:px-0" novalidate>
        <div class="md:flex md:items-center mb-6" :class="{ 'is-invalid': !filterData.selectedWeight.isValid }">
            <div class="md:w-1/3">
                <label class="block text-green-500 text-xl font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Weight (Kg.)
                </label>
            </div>
            <div class="md:w-1/3">
                <input
                    type="text"
                    @input="onChangeWeight($event)"
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500"
                >
                <div v-show="!filterData.selectedWeight.isValid" class="text-red-400 text-xl text-sm mt-1">
                    กรุณาเลือก Weight ให้ถูกต้อง
                </div>
            </div>
        </div>
    </form>
</template>