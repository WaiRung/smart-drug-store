<script setup>
import { initDropdowns } from 'flowbite'
import { useTabATP_CATALOGStore } from '@/stores/tab-atp-catalog'
import { useGenericStore } from '~/stores/generic';
import { useErrorStore } from '@/stores/error'

const genericStore = useGenericStore()
const errorStore = useErrorStore()

const props = defineProps({
    buttonText: {
        type: String,
        default: ""
    },
    isValid: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['selected-value', 'btn-clicked'])

const selectedValue = ref('')

async function fetchGenericsByClass(className = '') {
    errorStore.clearError()
    await genericStore.fetchGenericsByClass(className)
}

const genericData = computed(() => {
    const generics = genericStore.getGenerics()
    return generics

})

function onSearch(evt) {
    
    const searchText = evt.target.value
    genericStore.getFilteredGenerics(searchText)
}

function onSelect(genericName) {
    selectedValue.value = genericName
    emit('selected-value', genericName)
}

function onClick() {
    emit('btn-clicked')
}
fetchGenericsByClass()
onMounted(() => {
    initDropdowns();
    // if (data.value) {
    //     console.log('Fetched drug data:', data.value)
    //     Object.assign(classData, data.value[0].body)
    // } else {
    //     console.error('No drug data fetched. Error:', error.value)
    // }

})
</script>

<template>
    <button id="dropdownGenericButton" data-dropdown-toggle="dropdownSearch"
        @click="onClick" data-dropdown-placement="bottom"
        :class="[!isValid ? 'ring-2 ring-red-700 ring-offset-3 ring-offset-green-50' : '']"
        class="bg-green-900 text-white text-xl border-transparent hover:bg-green-900 px-3 py-2 border-2 rounded-lg text-center transition focus-visible:ring-2 ring-offset-2 inline-flex items-center"
        type="button">{{ buttonText }} <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 4 4 4-4" />
        </svg>
    </button>

     <!-- Dropdown menu -->
     <div id="dropdownSearch" class="z-10 hidden bg-white rounded-lg shadow w-96 dark:bg-gray-700">
        <div class="p-3">
            <label for="input-generic-search" class="sr-only">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="text" id="input-generic-search" @input="onSearch($event)"
                    class="block w-full p-2 ps-10 text-base text-green-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    placeholder="Search Generic">
            </div>
        </div>
        <ul class="h-48 px-3 pb-3 overflow-y-auto text-sm text-green-700 dark:text-green-200"
            aria-labelledby="dropdownGenericButton">
            <li v-for="data in genericData" :key="data">
                <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input type="radio" :value="data" v-model="selectedValue" @click="onSelect(data)"
                        DrugName="default-radio"
                        class="cursor-pointer w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        data-testid="search-dropdown-radio-input">
                    <label for="checkbox-item-11"
                        class="cursor-pointer w-full py-2 ms-2 text-base font-medium text-green-900 rounded dark:text-green-300"
                        @click="onSelect(data)">
                        {{ data }}
                    </label>
                </div>
            </li>
        </ul>
    </div>
</template>