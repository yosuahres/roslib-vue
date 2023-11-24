<script>
import ROSLIB from "roslib";

export default {
  data() {
    return {
      ros: null,
      listener: null,
      msg: "not yet",
    };
  },
  // async beforeMount() {
  //   await this.init();
  //   this.subscribe();
  //   console.log("mount ulang");
  // },

  methods: {
    async init() {
      this.ros = new ROSLIB.Ros({
        url: "ws://localhost:9090", // Sesuaikan URL dengan alamat ROS Bridge Anda
      });

      this.listener = new ROSLIB.Topic({
        ros: this.ros,
        name: "/chatter",
        messageType: "std_msgs/String",
      });
    },

    subscribe() {
      let that = this;
      that.listener.subscribe(function (message) {
        that.msg = message.data;
        console.log("Received message on " + this.listener + ": " + this.msg);
        that.count++;
      });
    },
    beforeDestroy() {
      // Berhenti mendengarkan topik sebelum komponen dihancurkan
      if (this.listener) {
        this.listener.unsubscribe();
      }
    },
  },
};
</script>

<template>
  <router-view> </router-view>
</template>
