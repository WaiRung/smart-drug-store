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
</script>

<template>
    <div class="w-full flex flex-wrap">
        <div :class="['w-full', 'md:w-1/4', 'sm:w-1/2', 'mt-1', align === 'center' && 'text-center']">
            <p class="text-2xl mt-4 text-green-600">
                <span class="font-bold">ddd : </span>
                <slot name="desc1">Some description goes here</slot>
            </p>
        </div>
        <div :class="['w-full', 'md:w-1/4', 'sm:w-1/2', 'mt-1', align === 'center' && 'text-center']">
            <p class="text-2xl mt-4 text-green-600">
                <span class="font-bold">ddd : </span>
                <slot name="desc2">Some description goes here</slot>
            </p>
        </div>
        <div :class="['w-full', 'md:w-1/4', 'sm:w-1/2', 'mt-1', align === 'center' && 'text-center']">
            <p class="text-2xl mt-4 text-green-600">
                <span class="font-bold">ddd : </span>
                <slot name="desc3">Some description goes here</slot>
            </p>
        </div>
        <div :class="['w-full', 'md:w-1/4', 'sm:w-1/2', 'mt-1', align === 'center' && 'text-center']">
            <p class="text-2xl mt-4 text-green-600">
                <span class="font-bold">ddd : </span>
                <slot name="desc4">Some description goes here</slot>
            </p>
        </div>
    </div>
</template>