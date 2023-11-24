<template>
  <v-stage ref="stage" :config="stageSize">
    <v-layer ref="layer">
      <v-image :config="field_config" />
    </v-layer>
  </v-stage>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;

export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height,
      },
      field_config: {
        x: 0,
        y: 0,
        image: new Image(),
        width: null,
        height: null,
        rotation: 0,
        offset: {
          x: 0,
          y: 0,
        },
      },
    };
  },
  created() {
    this.field_config.image.src = "https://konvajs.org/assets/yoda.jpg";
    // image.onload = () => {
    //   // set image only when it is loaded
    //   this.image = image;
    // };
  },
};
</script>
