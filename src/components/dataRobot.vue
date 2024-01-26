<template>
  <div class="basis-1/3">
    <div class="p-5">
      <p><strong> STATUS : DISCONNECT</strong></p>
      <p>IP LAPTOP: 192.168.1.1</p>
      <p class="text-yellow-600">Clicked Status : {{ this.tempStatus }}</p>
      <p class="text-green-800">
        Running Status : {{ ROBOT_STATE.bs2pc.status }}
      </p>

      <br />
      <p class="text-green-600"><strong>POSISI</strong></p>
      <div class="px-5">
        <p>Posisi X : {{ ROBOT_STATE.dataRobot.pos_x - 58 }}</p>
        <p>Posisi Y : {{ ROBOT_STATE.dataRobot.pos_y - 58 }}</p>
        <p>Posisi Theta : {{ ROBOT_STATE.dataRobot.pos_theta }}</p>
      </div>
      <br />
      <p class="text-green-600"><strong>BOLA</strong></p>
      <div class="px-5">
        <p>Bola X : {{ ROBOT_STATE.dataRobot.bola_x - 58 }}</p>
        <p>Bola Y : {{ ROBOT_STATE.dataRobot.bola_y - 58 }}</p>
      </div>
      <br />
      <p class="text-green-600"><strong>KECEPATAN</strong></p>
      <div class="px-5">
        <p>Kecepatan X : {{ ROBOT_STATE.dataRobot.v_x }}</p>
        <p>Kecepatan Y : {{ ROBOT_STATE.dataRobot.v_y }}</p>
        <p>Kecepatan Theta : {{ ROBOT_STATE.dataRobot.v_theta }}</p>
      </div>
      <br />
      <p class="text-green-600"><strong>POSISI</strong></p>
      <div class="px-5">
        <p>X Tujuan : {{ ROBOT_STATE.bs2pc.tujuan_x }}</p>
        <p>Y Tujuan : {{ ROBOT_STATE.bs2pc.tujuan_y }}</p>
      </div>
    </div>
    <div class="flex flex-wrap">
      <button
        class="flex-1 m-2 p-4 bg-white border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
        @click="statusClick(1)"
      >
        Status 1
      </button>
      <button
        class="flex-1 m-2 p-4 bg-white border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
        @click="statusClick(2)"
      >
        Status 2
      </button>
      <button
        class="flex-1 m-2 p-4 bg-white border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
        @click="statusClick(3)"
      >
        Status 3
      </button>
      <button
        class="flex-1 m-2 p-4 bg-white border border-yellow-500 text-yellow-500 font-semibold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-white"
        @click="statusClick(4)"
      >
        Status 4
      </button>
    </div>
    <div class="flex flex-col md:flex-row">
      <div
        class="flex-1 m-2 p-4 text-center bg-white border border-green-500 text-green-500 font-semibold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-green-500 hover:text-white"
        @click="publish"
      >
        PUBLISH!
      </div>
    </div>
  </div>
</template>

<script>
import ROSLIB from "roslib";
import { useRobotStore } from "../stores/store";

export default {
  setup() {
    const ROBOT_STATE = useRobotStore();
    return {
      ROBOT_STATE,
    };
  },
  data() {
    return {
      ros: null,
      //topic BS to PC
      publisher: null,

      //data yang di publish
      toPC: {},

      //utils
      tempStatus: 0,
      visibilityBlueBall: false,
      visibilityTarget: false,
    };
  },
  async beforeMount() {
    await this.init();
  },
  mounted() {
    const THAT = this;
    const anim = new Konva.Animation(function (frame) {
      THAT.ROBOT_STATE.utils.tempStatus = THAT.tempStatus;
      THAT.ROBOT_STATE.utils.visibility_target = THAT.visibilityTarget;
      THAT.ROBOT_STATE.utils.visibility_blueball = THAT.visibilityBlueBall;
    });

    anim.start();
  },
  methods: {
    async init() {
      this.ros = new ROSLIB.Ros({
        url: "ws://localhost:9090", // Sesuaikan URL dengan alamat ROS Bridge Anda
      });

      this.publisher = new ROSLIB.Topic({
        ros: this.ros,
        name: "/bs2pc",
        messageType: "IRIS24/BS2PC",
      });
    },

    publish() {
      this.ROBOT_STATE.resetDataRobot();
      this.ROBOT_STATE.bs2pc.status = this.ROBOT_STATE.utils.tempStatus;
      switch (this.ROBOT_STATE.bs2pc.status) {
        case 4:
        case 1:
        case 2:
          this.ROBOT_STATE.bs2pc.tujuan_x = 0;
          this.ROBOT_STATE.bs2pc.tujuan_y = 0;
          this.toPC = new ROSLIB.Message({
            status: this.ROBOT_STATE.bs2pc.status,
            tujuan_x: this.ROBOT_STATE.bs2pc.tujuan_x,
            tujuan_y: this.ROBOT_STATE.bs2pc.tujuan_y,
          });
          break;
        case 3:
          this.toPC = new ROSLIB.Message({
            status: this.ROBOT_STATE.bs2pc.status,
            tujuan_x: this.ROBOT_STATE.bs2pc.tujuan_x,
            tujuan_y: this.ROBOT_STATE.bs2pc.tujuan_y,
          });
          break;
      }

      this.publisher.publish(this.toPC);
    },

    statusClick(number) {
      this.tempStatus = number;
      switch (this.tempStatus) {
        case 1:
        case 2:
        case 4:
          this.visibilityBlueBall = true;
          this.visibilityTarget = false;
          console.log(this.ROBOT_STATE.utils);
          break;
        case 3:
          this.visibilityBlueBall = false;
          this.visibilityTarget = true;
          console.log(this.ROBOT_STATE.utils);
          break;
      }
    },
  },
};
</script>
