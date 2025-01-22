<template>
  <div class="basis-1/3 h-full relative flex flex-col justify-between">
    <img src="@/assets/Model_Robot/logo.png" alt="Logo" class="absolute top-0 m-4 h-16 z-50" />
    <br />
    <br />
    <div class="p-5 mt-24">
      <p><strong> STATUS ROS : {{ status }}</strong></p>
      <p>IP LAPTOP: 192.168.1.1</p>

      <br />
      <p class="text-green-600"><strong>Detected Object</strong></p>
      <div class="px-5">
        <p>Class : </p>
      </div>

      <br />
      <p class="text-green-600"><strong>KECEPATAN</strong></p>
      <div class="px-5">
        <p>Speed: </p>
      </div>

      <br />
      <p class="text-green-600"><strong>POSISI CURRENT</strong></p>
      <div class="px-5">
        <p>Current Position: </p>
      </div>
      
      <br />
      <p class="text-blue-600"><strong>POSISI TARGET</strong></p>
      <div class="px-5">
        <p>Target Position: </p>
      </div>

      <p class="text-green-600"><strong>Button</strong></p>
      <div class="px-5 flex flex-col space-y-4">
        <div class="flex space-x-4">
          <button @click="statusClick(1)" :class="{'border-green-500': activeButton === 1, 'border-blue-500': activeButton !== 1}" class="text-black px-4 py-2 rounded w-1/4 border-2 bg-transparent">Button 1</button>
          <button @click="statusClick(2)" :class="{'border-green-500': activeButton === 2, 'border-blue-500': activeButton !== 2}" class="text-black px-4 py-2 rounded w-1/4 border-2 bg-transparent">Button 2</button>
          <button @click="statusClick(3)" :class="{'border-green-500': activeButton === 3, 'border-blue-500': activeButton !== 3}" class="text-black px-4 py-2 rounded w-1/4 border-2 bg-transparent">Button 3</button>
          <button @click="statusClick(4)" :class="{'border-green-500': activeButton === 4, 'border-blue-500': activeButton !== 4}" class="text-black px-4 py-2 rounded w-1/4 border-2 bg-transparent">Button 4</button>
        </div>
        <div class="flex">
          <button @click="statusClick(0)" :class="{'border-green-500': activeButton === 0, 'border-blue-500': activeButton !== 0}" class="text-black px-4 py-2 rounded w-full border-2 bg-transparent">Default Button</button>
        </div>
      </div>
      <p class="text-red-500"><strong>Button Status: {{ buttonStatus }}</strong></p>
    </div>  
  </div>
</template>

<script>
import ROSLIB from "roslib";
import { useRobotStore } from "../stores/store";
import LogoURL from "@/assets/Model_Robot/logo.png"

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
      status: 'DISCONNECT',
      buttonStatus: 'Idle',
      activeButton: null,
    };
  },
  async beforeMount() {
    await this.init();
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

    statusClick(number) {
      this.tempStatus = number;
      this.buttonStatus = number === 0 ? 'Idle' : `Button ${number} clicked`;
      this.activeButton = number;
    },
  },
};
</script>