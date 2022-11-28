<template>
  <div>
    <img src="../static/images/phone.jpg" />
    <div class="flex justify-between p-2">
      <div class="flex flex-col">
        <span>{{ phone.manufacturer }}</span>
        <span class="text-sm">{{ phone.name }}</span>
      </div>
      <div class="button flex justify-center rounded-lg p-1">
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
