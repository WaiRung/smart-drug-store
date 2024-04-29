<script setup>
const drug = 
  {
    "ชื่อยา": "Ketoconazole",
    "ข้อบ่งใช้": "Atopic asthma",
    "วิธีรับประทาน": "รับประทานหลังอาหารลดการคลื่นไส้อาเจียน",
    "อาการไม่พึงประสงค์": {
      "ระบบประสาทส่วนกลาง": "เซื่องซึม, ตื่นกลัว, ปวดศีรษะ, วิงเวียนศีรษะ, ง่วงนอน, ไข้, หนาวสั่น, กระหม่อมบวม",
      "ระบบผิวหนัง": "ผื่นคัน, ผื่น, ผิวแห้ง",
      "ระบบต่อมไร้ท่อ และการเผาผลาญ": "adrenocortical insufficiency, ภาวะเต้านมโตในเพศชาย",
      "ระบบทางเดินอาหาร": "คลื่นไส้, อาเจียน, ไม่สบายท้อง, เลือดออกบริเวณทางเดินอาหาร, ท้องเสีย",
      "ระบบเลือด": "เม็ดเลือดขาวต่ำ, เกร็ดเลือดต่ำ, โลหิตจางจากเม็ดเลือดแดงแตก",
      "ตับ": "พิษต่อตับ, ค่า AST ALT และ alkaline phosphatase เพิ่มสูงขึ้น, ดีซ่าน",
      "อื่นๆ": "anaphylaxis"
    },
    "อันตรกิริยาระหว่างยา - ยา":
      "Alfuzosin, Cisapride, Conivaptan, Dabigatran, Etexilate, Dofetilide, Eplerenone, Everolimus, Halofantrine, Nilotinib, Nisoldipine, Pimozide, Quinidine, Ranolazine, Rivaroxaban, Salmeterol, Silodosin, Thioridazine, Tolvaptan, Topotecan, Aliskiren, Almotriptan, Alosetron, Bendamustine, Benzodiazepines, Bosentan, Buspirone,, Busulfan, Calfium channel blocker, Carbamazepine, Cardiac glycoside, Carvedilol, Ciclesonide, Cilostazol, Cinacalcet, Cisapride, Conivaptan, Corticosteroids, Dabigatran etexilate, Eocetaxel, Dofetilide, Eszopiclone, Everolimus, Fentanyl, Fesoterodine, Fexofenadine, Gefitinib, Halofantrine, HMG-CoA reductase inhibitors, Imatinib, Irinotecan, Ixabepilone, Losartan, Macrolide antibiotics, Maraviroc, Methadone, Nebivolol, Nilotinib, P-glycoprotein substrate, Phenytoin, Phosphodiesteras 5 inhibitors, Pimecrolimus, Pimozide, Praziquantel, Proteus inhibitors, Proton pump inhibitors, Quinidine, Ramelteon, Ranolazine, Rifamycin derivatives, Rivaroxaban, Salmeterol, Silodosin, Sirolimus, Solifenacin, Sorafenib, Sunitibib, Tacrolimus, Tamoxifen, Topotecan, Trimetrexate, Vitamin K antagonist, Ziprasidone, Zolpidem, Grapefruit juice, Amphotericin B, Codeine, Saccharomyces boulardil, Tramadol, Antacid, Deferasirox, Didanosine",
    // icon: "bx:bxs-briefcase",
  };
</script>

<template>
  <div class="mt-4 gap-16">
    <div v-for="(value, key) in drug" :key="key"
      class="grid grid-cols-8 gap-4 items-start">
      <h1 class="col-span-2 font-semibold text-xl">{{ key }}</h1>
      <!-- <div class=" mt-1 bg-black rounded-full p-2 w-8 h-8 shrink-0">
        <Icon class="text-white" :name="item.icon" /> 
      </div> -->
      <div class="col-span-6">
        <div v-if="key === 'อาการไม่พึงประสงค์'" class="text-lg">
          <h1
            v-for="(value, key) in value" :key="key"
            class="">
            <span class="font-semibold text-xl">{{ key }}</span> : 
            <span class="text-xl">{{ value }}</span>
          </h1>
        </div>
        <h3 v-else class=" text-lg">{{ value }}</h3>
        <p class="text-slate-500 mt-2 leading-relaxed">
          <!-- {{ item.interaction }} -->
        </p>
      </div>
    </div>
  </div>
</template>