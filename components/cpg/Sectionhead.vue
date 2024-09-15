<script setup>
defineProps({
    align: {
        default: "center",
    },
});

import { useMsdcpgStore } from '~/stores/msdcpg'

const msdcpgStore = useMsdcpgStore()

const filterData = computed(() => {
    const filter = msdcpgStore.getFilter()
    return filter
})

const genericData = computed(() => {
    const generics = msdcpgStore.getMsdCpgTableFilter('GENERIC')
    return generics
})

const rxoptionData = computed(() => {
    const rxOptions = msdcpgStore.getMsdCpgTableFilter('RX_OPTION')
    return rxOptions
})

const dosetypeData = computed(() => {
    const doseTypes = msdcpgStore.getMsdCpgTableFilter('DOSE_TYPE')
    return doseTypes
})

const dosecheckData = computed(() => {
    const doseChecks = msdcpgStore.getMsdCpgTableFilter('DOSE_CHECK')
    return doseChecks
})

const dosemaxData = computed(() => {
    const doseMaxes = msdcpgStore.getMsdCpgTableFilter('DOSE_M_CHECK')
    console.log(doseMaxes[0].length);
    
    return doseMaxes
})
</script>

<template>
    <div class="mx-20">
        <div class="w-full flex flex-wrap">
            <div
                :class="['w-full', 'md:w-1/5', 'sm:w-1/2', 'mt-8', 'px-3', 'flex', 'flex-direction-row', align === 'center' && 'text-center']">
                <select
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option value="">Select Generic</option>
                    <option v-for="generic in genericData" :value="generic">
                        {{ generic }}
                    </option>
                </select>

            </div>
            <div :class="['w-full', 'md:w-1/5', 'sm:w-1/2', 'mt-8', 'px-3', align === 'center' && 'text-center']">
                <select
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option value="">Select Rx Option</option>
                    <option v-for="rxoption in rxoptionData" :value="rxoption">
                        {{ rxoption }}
                    </option>
                </select>
            </div>
            <div :class="['w-full', 'md:w-1/5', 'sm:w-1/2', 'mt-8', 'px-3', align === 'center' && 'text-center']">
                <select
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option value="">Select Dose Type</option>
                    <option v-for="dosetype in dosetypeData" :value="dosetype">
                        {{ dosetype }}
                    </option>
                </select>
            </div>
            <div :class="['w-full', 'md:w-1/5', 'sm:w-1/2', 'mt-8', 'px-3', align === 'center' && 'text-center']">
                <select
                    :disabled="
                        dosetypeData.length === 0 ||
                        (
                            dosetypeData.length === 1 &&
                            (
                                dosetypeData[0] === '' ||
                                dosetypeData[0] === ' '
                            )
                        )
                    "
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option value="">Select Dose Check</option>
                    <option v-for="dosecheck in dosecheckData" :value="dosecheck">
                        {{ dosecheck }}
                    </option>
                </select>
            </div>
            <div :class="['w-full', 'md:w-1/5', 'sm:w-1/2', 'mt-8', 'px-3', align === 'center' && 'text-center']">
                <select
                    :disabled="
                        dosemaxData.length === 0 ||
                        (
                            dosemaxData.length === 1 &&
                            (
                                dosemaxData[0] === '' ||
                                dosemaxData[0] === ' '
                            )
                        )
                    "
                    class="block appearance-none w-full border border-2 border-green-200 text-green-700 text-xl py-3 px-4 pr-8 rounded leading-tight focus:ring-0 focus:outline-none focus:bg-white focus:border-green-500">
                    <option value="">Select Dose Max</option>
                    <option v-for="dosemax in dosemaxData" :value="dosemax">
                        {{ dosemax }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>