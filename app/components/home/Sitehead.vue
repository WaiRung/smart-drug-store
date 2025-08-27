<script setup>

defineProps({
  align: {
    default: "center",
  },
});

function onclickLink(url) {
  window.open(url, '_blank');
}
</script>

<template>
  <div>
      <div>
        <img
          class=""
          src="~/assets/img/header.png"
          alt="header bma"
          loading="eager"
        />
      </div>
      <div class="flex justify-between">
        <div class="flex-col items-start xs:flex-col mt-8">
            <LandingButton styleName="outline" className="mx-2" @click="onclickLink('https://amr.msdbangkok.go.th/')">
              <span class="text-2xl">
                คู่มือเวชปฏิบัติ
              </span>
            </LandingButton>
            <LandingButton styleName="outline" className="mx-2 mt-2 sm:mt-0" @click="onclickLink('http://www.msdbangkok.go.th/')">
              <span class="text-2xl">
                เกี่ยวกับเรา
              </span>
            </LandingButton>
        </div>
        <div class="flex items-end">
            <LandingButton styleName="outline">
              <span class="text-2xl">
                Exit
              </span>
            </LandingButton>
        </div>
      </div>
  </div>

</template>

<style scoped>
</style>