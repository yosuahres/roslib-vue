<script setup>
import dataRobot from "../components/dataRobot.vue";
import cameraInput from "../components/cameraInput.vue";
</script>

<template>
  <div class="flex flex-col md:flex-row m-2">
    <cameraInput></cameraInput>
    <dataRobot></dataRobot>
  </div>
</template>
