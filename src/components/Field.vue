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
        <v-image :config="target" />
        <v-image :config="robot" />
        <v-image :config="bola" />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import LapanganURL from "@/assets/Lapangan.png";
import RobotURL from "@/assets/Model_Robot/blue.png";
import BolaURL from "@/assets/Model_Robot/bola_biru.png";
import RobotCiumBola from "@/assets/Model_Robot/blue1_ball.png";
import TargetURL from "@/assets/red_dot-1.png";
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
      bola: null,
      target: null,

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
        // stroke: "red",
      },

      //config bola
      BolaConfig: {
        image: null,
        x: 99,
        y: 99,
        // stroke: "red",
        width: 25,
        height: 25,
        offset: {
          x: 12.5,
          y: 12.5,
        },
        visible: true,
      },

      TargetConfig: {
        image: null,
        x: 58,
        y: 58,
        width: 50,
        height: 50,
        offset: {
          x: 25,
          y: 25,
        },
        visible: false,
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
      THAT.BolaConfig.x = THAT.ROBOT_STATE.dataRobot.bola_x;
      THAT.BolaConfig.y = THAT.ROBOT_STATE.dataRobot.bola_y;

      //
      THAT.TargetConfig.visible = THAT.ROBOT_STATE.utils.visibility_target;
      THAT.BolaConfig.visible = THAT.ROBOT_STATE.utils.visibility_blueball;

      if (THAT.ROBOT_STATE.utils.tempStatus != 3)
        if (
          THAT.BolaConfig.x == THAT.RobotConfig.x &&
          THAT.BolaConfig.y == THAT.RobotConfig.y
        ) {
          const Robot = new window.Image();
          Robot.src = RobotCiumBola;
          THAT.RobotConfig.image = Robot;

          //deploy robot
          THAT.robot = THAT.RobotConfig;

          //ngilangin bola
          THAT.BolaConfig.visible = false;
        } else {
          const Robot = new window.Image();
          Robot.src = RobotURL;
          THAT.RobotConfig.image = Robot;

          //deploy robot
          THAT.robot = THAT.RobotConfig;

          //muculin bola
          THAT.BolaConfig.visible = true;
        }
      else {
        const Robot = new window.Image();
        Robot.src = RobotURL;
        THAT.RobotConfig.image = Robot;

        //deploy robot
        THAT.robot = THAT.RobotConfig;
      }
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

    //target
    const Target = new window.Image();
    Target.src = TargetURL;
    this.TargetConfig.image = Target;

    //deploy Target
    this.target = this.TargetConfig;

    //bola
    const Bola = new window.Image();
    Bola.src = BolaURL;
    this.BolaConfig.image = Bola;

    //deploy bola
    this.bola = this.BolaConfig;
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
      if (this.ROBOT_STATE.utils.tempStatus == 3) {
        console.log(this.ROBOT_STATE.utils);
        const xCoordinate = event.offsetX - 58;
        const yCoordinate = event.offsetY - 58;
        console.log(
          `Clicked at coordinates: X=${xCoordinate}, Y=${yCoordinate}`
        );

        this.ROBOT_STATE.bs2pc.tujuan_x = xCoordinate;
        this.ROBOT_STATE.bs2pc.tujuan_y = yCoordinate;

        this.TargetConfig.x = this.ROBOT_STATE.bs2pc.tujuan_x + 58;
        this.TargetConfig.y = this.ROBOT_STATE.bs2pc.tujuan_y + 58;
        // console.log(event);
        // Lakukan sesuatu dengan koordinat yang didapatkan
      }
    },
  },
};
</script>
