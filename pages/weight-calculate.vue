<template>
    <LandingContainer>
        <LandingSectionhead>
            <template v-slot:title>น้ำหนัก</template>
      <template v-slot:desc>คำนวนปริมาณยาโดยใช้น้ำหนัก</template>
        </LandingSectionhead>
    </LandingContainer>

    <div class="grid gap-10 mx-auto max-w-4xl mt-16">
        <div>
            <WeightWeightform />
        </div>
    </div>
</template>