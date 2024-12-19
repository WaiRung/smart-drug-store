<script setup>
defineProps({
  align: {
    default: "center",
  },
});
</script>

<template>
  <div >

      <div>
        <img
          class=""
          src="~/assets/img/header.png"
          alt="header bma"
          loading="eager"
        />
      </div>
      <div class="flex justify-between">
        <div class="flex items-start mt-8">
            <LandingButton styleName="outline" className="mx-4">คู่มือเวชปฏิบัติ</LandingButton>
            <LandingButton styleName="outline">เกี่ยวกับเรา</LandingButton>
        </div>
        <div class="flex items-end">
            <LandingButton styleName="outline">Exit</LandingButton>
        </div>
      </div>
  </div>
</template>