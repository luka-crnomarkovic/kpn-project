<template>
  <div>
    <h1 class="text-3xl font-bold underline text-center mb-10">
      KPN Mobilel shop
    </h1>
    <div class="mobile-container flex justify-center flex-wrap">
      <div
        class="mobile-card flex justify-center flex-col flex-wrap"
        v-for="item in phones"
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
    };
  },
  methods: {
    getPhones() {
      try {
        axios.get("http://localhost:3000/phones").then((res) => {
          this.phones = JSON.parse(JSON.stringify(res.data.products));
        });
      } catch (error) {
        console.log("error", error);
      }
    },
  },
  mounted() {
    this.getPhones();
  },
};
</script>
