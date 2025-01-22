<template>
  <div class="flex justify-between w-full h-3/2">
    <div class="bg-yellow-500 p-4 rounded-lg shadow-md w-3/5 h-full flex items-center justify-center" @click="handleClick">
      Camera Input 1
    </div>
    <div class="bg-red-500 p-4 rounded-lg shadow-md w-3/5 h-full flex items-center justify-center" @click="handleClick">
      Camera Input 2
    </div>
  </div>
</template>

<script>
export default {
  name: "Field",
  methods: {
    handleClick(event) {
      // Placeholder for handling click event
    },
  },
};
</script>