<template>
    <LandingContainer>
        <LandingSectionhead>
            <template v-slot:title>Criteria</template>
      <template v-slot:desc>Criteria Selection</template>
        </LandingSectionhead>
    </LandingContainer>

    <div class="grid gap-10 mx-auto max-w-4xl mt-16">
        <div>
            <CriteriaSelection />
        </div>
    </div>
</template>