<script setup>
const props = defineProps({
  drugData: {
    type: Object,
    default: {}
  },
})

onMounted(() => {
  console.log(props.drugData)
})
</script>

<template>
  <div class="mt-4 gap-16">
    <div v-for="(value, key) in drugKeyDisplay(drugData)" :key="key" class="grid grid-cols-8 gap-4 items-start">
      <h1 class="col-span-2 font-semibold text-xl">{{ drugKeyTranslate(key) }}</h1>
      <!-- <div class=" mt-1 bg-black rounded-full p-2 w-8 h-8 shrink-0">
        <Icon class="text-white" :name="item.icon" /> 
      </div> -->
      <div class="col-span-6">
        <div v-if="key === 'ADR'" class="text-lg">
          <h1 v-for="(value, key) in value" :key="key" class="">
            <span class="font-semibold text-xl">{{ key }}</span> :
            <span v-for="(item, index) in value" :key="index" class="text-xl">{{ item }}{{ index !== value.length - 1 ? ',' : '' }}</span>
          </h1>
        </div>
        <h3 v-else class=" text-lg">{{ value || '-' }}</h3>
        <p class="text-slate-500 mt-2 leading-relaxed">
          <!-- {{ item.interaction }} -->
        </p>
      </div>
    </div>
  </div>
</template>