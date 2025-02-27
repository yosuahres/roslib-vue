<template>
  <div class="flex flex-row items-start space-x-4">
    <div class="flex flex-col w-full md:w-2/3 space-y-4">
      <div class="w-full">
        <img :src="frame1" alt="Video Frame 1" class="w-full h-auto" />
      </div>
      <div class="w-full">
        <img :src="frame2" alt="Video Frame 2" class="w-full h-auto" />
      </div>
    </div>

    <div class="basis-1/3 p-5">
      <p><strong> STATUS : {{ rosStatus }}</strong></p>
      <p>IP LAPTOP: 192.168.1.1</p>
      <p class="text-yellow-600">Clicked Status : {{ tempStatus }}</p>
      <p class="text-green-800">
        Map Status : {{ ROBOT_STATE.utils.mapStatus }}
      </p>

      <br />
      <p class="text-green-600"><strong>POSISI</strong></p>
      <div class="px-5">
        <p>Posisi X : {{ ROBOT_STATE.dataRobot.pos_x }}</p>
        <p>Posisi Y : {{ ROBOT_STATE.dataRobot.pos_y }}</p>
        <p>Posisi Theta : {{ ROBOT_STATE.dataRobot.pos_theta * -1 }}</p>
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

    <div class="basis-1/3 flex flex-col items-center space-y-6">
      <button
        class="w-full m-4 p-12 bg-green-100 border border-green-500 text-yellow-500 font-semibold text-4xl rounded transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
        @click="statusClick(1)"
      >
        Start Robot
      </button>
      <button
        class="w-full m-4 p-12 bg-red-300 border border-red-500 text-black font-semibold text-4xl rounded transition duration-300 ease-in-out hover:bg-red-500 hover:text-white"
        @click="statusClick(2)"
      >
        Map Merah
      </button>
      <button
        class="w-full m-4 p-12 bg-blue-300 border border-blue-500 text-black font-semibold text-4xl rounded transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
        @click="statusClick(3)"
      >
        Map Biru
      </button>
      <button
        class="w-full m-4 p-12 bg-green-100 border border-green-500 text-yellow-500 font-semibold text-4xl rounded transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-white"
        @click="publish"
      >
        Publish
      </button>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import ROSLIB from "roslib";
import { useRobotStore } from "../stores/store";

export default {
  setup() {
    const ROBOT_STATE = useRobotStore();
    return { ROBOT_STATE };
  },
  data() {
    return {
      frame1: "",
      frame2: "",
      ros: null,
      publisher: null,
      toPC: {},
      tempStatus: null,
      rosConnected: false,
    };
  },
  computed: {
    rosStatus() {
      return this.rosConnected ? "ROS Bridge Connected" : "ROS Bridge Disconnected";
    },
  },
  async beforeMount() {
    await this.init();
  },
  mounted() {
    const socket = io("http://127.0.0.1:5001");
    socket.on("video_frame", (data) => {
      this.frame1 = `data:image/jpeg;base64,${data.frame}`;
      this.frame2 = `data:image/jpeg;base64,${data.frame}`;
    });
  },
  methods: {
    async init() {
      this.ros = new ROSLIB.Ros({
        url: "ws://localhost:9090",
      });

      this.publisher = new ROSLIB.Topic({
        ros: this.ros,
        name: "/bs2pc",
        messageType: "std_msgs/String",
      });

      this.ros.on("connection", () => {
        console.log("Connected to ROS Bridge");
        this.rosConnected = true;
      });

      this.ros.on("error", (error) => {
        console.error("Error connecting to ROS:", error);
        this.rosConnected = false;
      });

      this.ros.on("close", () => {
        console.log("Disconnected from ROS");
        this.rosConnected = false;
      });
    },
    publish() {
      this.ROBOT_STATE.bs2pc.status = this.tempStatus; // Assign status properly
      this.ROBOT_STATE.bs2pc.mapStatus = this.ROBOT_STATE.utils.mapStatus;

      console.log("Publishing Data:", {
        status: this.ROBOT_STATE.bs2pc.status,
        mapStatus: this.ROBOT_STATE.bs2pc.mapStatus,
      });

      this.publisher.publish(this.ROBOT_STATE.bs2pc);
    },
    statusClick(number) {
      this.tempStatus = number; // Ensure tempStatus is updated
      this.ROBOT_STATE.utils.tempStatus = number; // Sync with store
      console.log("Button Clicked:", number); // Debugging log

      switch (number) {
        case 1:
          console.log("Starting Robot");
          break;
        case 2:
          console.log("Setting Map to Red");
          this.ROBOT_STATE.utils.mapStatus = "red";
          break;
        case 3:
          console.log("Setting Map to Blue");
          this.ROBOT_STATE.utils.mapStatus = "blue";
          break;
        case 4:
          console.log("Publishing Data");
          this.publish();
          break;
      }
    },
  },
};
</script>

