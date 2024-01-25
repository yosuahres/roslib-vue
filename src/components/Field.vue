<template>
  <!-- <img src="../assets/Lapangan.png" alt="" srcset="" /> -->
  <div class="flex basis-2/3 border" @click="handleClick">
    <v-stage ref="stage" :config="stageSize">
      <v-layer ref="layer">
        <v-image
          id="parent"
          :config="{
            image: lapangan,
          }"
        />
        <v-image :config="robot" />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import LapanganURL from "@/assets/Lapangan.png";
import RobotURL from "@/assets/Model_Robot/blue.png";
import { useRobotStore } from "../stores/store";

// const flex = document.getElementById("parent");
// const rect = flex.getBoundingClientRect();

let field_width = 1016;
let field_height = 716;

export default {
  setup() {
    const ROBOT_STATE = useRobotStore();
    return {
      ROBOT_STATE,
    };
  },
  data() {
    return {
      stageSize: {
        width: field_width,
        height: field_height,
      },
      lapangan: null,
      robot: null,

      //init config robot
      RobotConfig: {
        image: null,
        x: 0,
        y: 0,
        rotation: 0,
        //get the robot to the right cordinate
        offset: {
          x: 40,
          y: 40,
        },
        stroke: "red",
      },
    };
  },
  mounted() {
    window.addEventListener("keypress", this.handleKeyDown);

    const THAT = this;
    const anim = new Konva.Animation(function (frame) {
      THAT.RobotConfig.x = THAT.ROBOT_STATE.dataRobot.pos_x;
      THAT.RobotConfig.y = THAT.ROBOT_STATE.dataRobot.pos_y;
      THAT.RobotConfig.rotation = THAT.ROBOT_STATE.dataRobot.pos_theta;
    });

    anim.start();
  },
  created() {
    const Lapangan = new window.Image();
    Lapangan.src = LapanganURL;
    Lapangan.onload = () => {
      // set image only when it is loaded
      this.lapangan = Lapangan;
      // console.log(this.image);
    };

    //robot
    const that = this;
    const Robot = new window.Image();
    Robot.src = RobotURL;
    this.RobotConfig.image = Robot;

    //deploy robot
    this.robot = this.RobotConfig;
  },
  methods: {
    fieldPosition(realPos) {
      return realPos + this.padding;
    },
    handleKeyDown(event) {
      const key = event.key.toLowerCase();

      switch (key) {
        case "w":
          this.ROBOT_STATE.dataRobot.pos_y -= 5;
          break;
        case "a":
          this.ROBOT_STATE.dataRobot.pos_x -= 5;
          break;
        case "s":
          this.ROBOT_STATE.dataRobot.pos_y += 5;
          break;
        case "d":
          this.ROBOT_STATE.dataRobot.pos_x += 5;
          break;
        case "0":
          this.ROBOT_STATE.dataRobot.pos_theta += 5;
          break;
        case "9":
          this.ROBOT_STATE.dataRobot.pos_theta -= 5;
          break;
        default:
          break;
      }
    },
    handleClick(event) {
      if (this.ROBOT_STATE.bs2pc.status == 3) {
        const xCoordinate = event.offsetX - 58;
        const yCoordinate = event.offsetY - 58;
        console.log(
          `Clicked at coordinates: X=${xCoordinate}, Y=${yCoordinate}`
        );

        this.ROBOT_STATE.bs2pc.tujuan_x = xCoordinate;
        this.ROBOT_STATE.bs2pc.tujuan_y = yCoordinate;
        // console.log(event);
        // Lakukan sesuatu dengan koordinat yang didapatkan
      }
    },
  },
};
</script>
