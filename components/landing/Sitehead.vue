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
            <LandingButton styleName="outline" className="mx-4" @click="onclickLink('https://amr.msdbangkok.go.th/')">คู่มือเวชปฏิบัติ</LandingButton>
            <LandingButton styleName="outline" @click="onclickLink('http://www.msdbangkok.go.th/')">เกี่ยวกับเรา</LandingButton>
        </div>
        <div class="flex items-end">
            <LandingButton styleName="outline">Exit</LandingButton>
        </div>
      </div>
  </div>
</template>