<script setup lang="ts">
import { useSlideStore } from '@/stores/slide'

function onClickBack() {

    definePageMeta({
    pageTransition: {
        name: 'slide-left',
        mode: 'out-in'
    },
    middleware(to, from) {
        const slideStore = useSlideStore()
        if (to.meta.pageTransition && typeof to.meta.pageTransition !== 'boolean') {
            to.meta.pageTransition.name = slideStore.getDirection
        }
    }
})
    const slideStore = useSlideStore()
    slideStore.setDirection('slide-right')
    navigateTo('/criteria-selection')

}
</script>

<template>
    <LandingContainer>
        <CpgSectionhead>
            <template v-slot:desc1>Criteria Selection</template>
            <template v-slot:desc2>Criteria Selection</template>
            <template v-slot:desc3>Criteria Selection</template>
            <template v-slot:desc4>Criteria Selection</template>
        </CpgSectionhead>
        <div class="grid gap-10 mx-auto max-w-4xl mt-12">
            <div>
                <CpgTable />
            </div>
            <div>
                <LandingButton type="button" @click="onClickBack" size="lg">
                    <p class="text-xl">back</p>
                </LandingButton>
            </div>

        </div>
    </LandingContainer>
</template>