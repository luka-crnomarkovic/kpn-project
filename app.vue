<template>
  <div>
    <h1 class="text-3xl font-bold underline text-center">KPN Mobilel shop</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      phones: [],
    };
  },
  methods: {
    async getPhones() {
      try {
        await axios.get("http://localhost:3000/phones").then((res) => {
          this.phones = res.data.products;
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
