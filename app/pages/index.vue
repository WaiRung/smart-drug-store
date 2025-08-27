<script setup>
definePageMeta({
    pageTransition: {
        name: 'slide-left',
        mode: 'out-in'
    },
    middleware: ['slide-direction']
})
</script>

<template>
    <LandingContainer>
        <HomeSitehead />
        <HomeSectionhead />
        <div class="grid gap-10 mx-auto max-w-5xl mt-16">
            <HomeButtons />
        </div>
    </LandingContainer>
</template>