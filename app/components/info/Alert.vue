<script setup lang="ts">
const route = useRoute()
const { find } = useStrapi()

import {
    FwbCard,
    FwbAlert,
    FwbAccordion,
    FwbAccordionPanel,
    FwbAccordionHeader,
    FwbAccordionContent,
} from 'flowbite-vue';

import { useMsdcpgStore } from '~/stores/msdcpg'

const msdcpgStore = useMsdcpgStore()

await msdcpgStore.fetchMsdcpgByDocumentId(route.params.documentId)
const msdcpgDetail = computed(() => {
    return msdcpgStore.getMsdcpg()
})

const alert: any = reactive({
    GENERIC: msdcpgDetail.value?.GENERIC,
    CONTRAIND: null,
    LIMITATION: null,
    RESIST_AWARE: null,
})

const filterGeneric: any = {
    'GENERIC': {
        $eqi: msdcpgDetail.value?.GENERIC
    }
}
const { data, pending, refresh, error } = await useAsyncData(
    'atb-info-alerts',
    () => find<any>('atb-info-alerts', {
        fields: [
            'GENERIC',
            'CONTRAIND',
            'LIMITATION',
            'RESIST_AWARE',
        ],
        filters: filterGeneric,
    })
)
if (data.value && data.value.data && data.value.data.length > 0) {
    // Assign data to reactive alert object
    Object.assign(alert, data.value.data[0])
}
console.log(alert);


</script>
<template>
    <div class="max-w-xl mx-auto mt-10">
        <!-- Header -->
        <fwb-card class="mx-auto bg-white shadow-lg rounded-lg mb-5 !max-w-full">
            <div class="bg-green-700 mb-3 p-4 rounded-t-lg">
                <h1 class="text-5xl font-bold text-white">{{ alert.GENERIC }}</h1>
                <!-- <p class="text-blue-100 text-sm">Macrolide Antibiotic</p> -->
            </div>

            <!-- Alert Banner -->
            <fwb-alert class="border-l-4 rounded-none" icon type="danger">
                <div class="flex items-start">
                    <span v-if="alert.RESIST_AWARE" class="text-2xl">{{ alert.RESIST_AWARE }}</span>
                    <span v-else class="text-2xl">-</span>
                </div>
            </fwb-alert>

            <!-- Content Sections -->
            <div class="mt-4">
                <!-- Contraindications Section -->
                <fwb-accordion>
                    <fwb-accordion-panel>
                        <fwb-accordion-header class="rounded-t-none">
                            <span class="text-3xl">Contraindications</span>
                        </fwb-accordion-header>
                        <fwb-accordion-content>

                            <!-- <ul class="list-disc pl-5 space-y-2 text-2xl text-gray-700">
                                <li>Hypersensitivity to azithromycin, erythromycin, any macrolides or ketolides</li>
                                <li>History of cholestatic jaundice/hepatic dysfunction associated with prior use of
                                    azithromycin</li>
                            </ul> -->
                            <span v-if="alert.CONTRAIND" class="text-2xl text-gray-700">
                                {{ alert.CONTRAIND }}
                            </span>
                            <span v-else class="text-2xl text-gray-700">
                                -
                            </span>
                        </fwb-accordion-content>
                    </fwb-accordion-panel>
                </fwb-accordion>

                <!-- Not Recommended Section -->
                <fwb-accordion class="mt-2">
                    <fwb-accordion-panel>
                        <fwb-accordion-header class="rounded-t-none">
                            <span class="text-3xl">Not Recommended For</span>
                        </fwb-accordion-header>
                        <fwb-accordion-content>
                            <!-- <p class="pl-1 mb-2 text-sm text-gray-700">
                                <span class="text-2xl">Pneumonia with moderate to severe illness or any of the following
                                    risks:</span>
                            </p>
                            <ul class="list-disc pl-5 space-y-2 text-2xl text-gray-700">
                                <li>Patients with cystic fibrosis</li>
                                <li>Patients with nosocomial infections</li>
                                <li>Patients with known or suspected bacteremia</li>
                                <li>Patients requiring hospitalization</li>
                                <li>Elderly or debilitated patients</li>
                                <li>Immunocompromised patients (i.e., immunodeficiency or functional asplenia)</li>
                            </ul> -->

                            <span v-if="alert.LIMITATION" class="text-2xl text-gray-700">
                                {{ alert.LIMITATION }}
                            </span>
                            <span v-else class="text-2xl text-gray-700">
                                -
                            </span>
                        </fwb-accordion-content>
                    </fwb-accordion-panel>
                </fwb-accordion>

                <!-- Usage Guidelines Section -->
                <fwb-accordion class="mt-2">
                    <fwb-accordion-panel>
                        <fwb-accordion-header class="rounded-t-none">
                            <span class="text-3xl">Usage Guidelines</span>
                        </fwb-accordion-header>
                        <fwb-accordion-content>
                            <fwb-alert border type="warning" class="mt-2">
                                <span v-if="alert.RESIST_AWARE" class="text-warning">
                                    {{ alert.RESIST_AWARE }}
                                </span>
                                <span v-else class="text-warning">-</span>
                            </fwb-alert>
                        </fwb-accordion-content>
                    </fwb-accordion-panel>
                </fwb-accordion>
            </div>

            <!-- Footer -->
            <!-- <div class="mt-4 text-xs text-gray-500 text-center">
                Always consult with a healthcare professional before use.
            </div> -->
        </fwb-card>
    </div>
</template>

<style scoped >
.text-warning {
    color: #ff9800;
    font-size: 24px;
}
</style>