<template>
  <div>
    <img src="../static/images/phone.jpg" />
    <div class="flex justify-between">
      <div class="flex flex-col">
        <span>{{ phone.manufacturer }}</span>
        <span>{{ phone.name }}</span>
      </div>
      <div class="button">
        <button>View</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    phone: {
      type: Object,
      required: true,
    },
  },
};
</script>
