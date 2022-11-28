<template>
  <div>
    <h1 class="text-3xl font-bold underline text-center mb-10">
      KPN Mobilel shop
    </h1>
    <div v-show="phones" class="flex m-10 justify-center">
      <div>
        <span> Brand </span>
        <div v-for="(brand, index) in brands" :key="index">
          <input
            type="checkbox"
            :id="brand"
            :value="brand"
            v-model="checkedBrands"
            @change="() => updateFilters('manufacturer', brand)"
          />
          <label class="ml-2" :for="brand">{{ brand }}</label>
        </div>
      </div>
      <div class="ml-5">
        <span> Have 5g? </span>
        <div v-for="(fiveG, index) in fiveGOptions" :key="index">
          <input
            type="checkbox"
            :id="fiveG.label"
            :value="fiveG.value"
            v-model="checkedFiveG"
            @change="() => updateFilters('has_5g', fiveG.value)"
          />
          <label class="ml-2" :for="fiveG">{{ fiveG.label }}</label>
        </div>
      </div>
      <div class="ml-5">
        <span> Operating system </span>
        <div v-for="(operatingSystem, index) in operatingSystems" :key="index">
          <input
            type="checkbox"
            :id="operatingSystem"
            :value="operatingSystem"
            v-model="checkedOperatingSystems"
            @change="() => updateFilters('operating_system', operatingSystem)"
          />
          <label class="ml-2" :for="operatingSystem">{{
            operatingSystem
          }}</label>
        </div>
      </div>
      <div class="ml-5">
        <span> E-sim </span>
        <div v-for="(eSim, index) in eSimOptions" :key="index">
          <input
            type="checkbox"
            :id="eSim.label"
            :value="eSim.value"
            v-model="checkedESim"
            @change="() => updateFilters('has_esim', eSim.value)"
          />
          <label class="ml-2" :for="eSim">{{ eSim.label }}</label>
        </div>
      </div>
      <div class="ml-5">
        <span> Refurbished </span>
        <div v-for="(refurbished, index) in refurbishedOptions" :key="index">
          <input
            type="checkbox"
            :id="refurbished.label"
            :value="refurbished.value"
            v-model="checkedRefurbishedOptions"
            @change="() => updateFilters('refurbished', refurbished.value)"
          />
          <label class="ml-2" :for="refurbished">{{ refurbished.label }}</label>
        </div>
      </div>
    </div>
    <div class="mobile-container flex justify-center flex-wrap">
      <div
        class="mobile-card flex justify-center flex-col flex-wrap rounded-xl m-2"
        v-for="item in displayedPhones"
      >
        <Phone :phone="item" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Phone from "./components/Phone.vue";

export default {
  data() {
    return {
      phones: null,
      brands: [],
      hasFiveG: [],
      fiveGOptions: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
      eSimOptions: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
      refurbishedOptions: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
      operatingSystems: [],
      checkedBrands: [],
      checkedFiveG: [],
      checkedOperatingSystems: [],
      checkedESim: [],
      checkedRefurbishedOptions: [],
      displayedPhones: [],
      filters: [],
    };
  },
  methods: {
    filterPhones(propertyName, value) {
      if (this.filters.every((f) => f.propertyName !== propertyName)) {
        this.filters.push({
          propertyName,
          values: [],
        });
      }

      this.filters = this.filters.map((f) => {
        if (f.propertyName === propertyName) {
          return {
            ...f,
            values: f.values.includes(value)
              ? f.values.filter((v) => v !== value)
              : [...f.values, value],
          };
        }

        return f;
      });

      this.filters = this.filters.filter((f) => f.values.length > 0);
      this.displayedPhones = this.phones.filter((phone) =>
        this.filters.every((f) => f.values.includes(phone[f.propertyName]))
      );
    },
    getPhones() {
      try {
        axios.get("http://localhost:3000/phones").then((res) => {
          this.phones = JSON.parse(JSON.stringify(res.data.products));
          this.displayedPhones = this.phones;
          this.getBrands();
          this.getOperatingSystems();
        });
      } catch (error) {
        console.log("error", error);
      }
    },
    getBrands() {
      this.brands = this.phones.map((el) => el.manufacturer);
      let unique = [...new Set(this.brands)];
      this.brands = unique;
    },
    getOperatingSystems() {
      this.operatingSystems = this.phones.map((el) => el.operating_system);
      let unique = [...new Set(this.operatingSystems)];
      this.operatingSystems = unique;
    },
  },
  mounted() {
    this.getPhones();
  },
};
</script>
