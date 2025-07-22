<script setup lang="ts">
</script>

<template>
    <LandingContainer>
        <HomeNavbar />
        <LandingSectionhead>
            <template v-slot:title>Antibiotic Dose Calculators for Pediatrics</template>
            <template v-slot:desc>List of Recommended Antibiotics</template>
        </LandingSectionhead>

        <!-- <LandingLoadingsquare /> -->
        <div class="grid gap-10 mx-auto max-w-5xl mt-12">
            <div>
                <CpgTable />
            </div>
        </div>
    </LandingContainer>
</template>