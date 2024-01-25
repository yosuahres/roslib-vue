import { defineStore } from "pinia";

export const useRobotStore = defineStore("alerts", {
  id: "store",
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      dataRobot: {
        pos_x: 0,
        pos_y: 0,
        pos_theta: 0,
        v_x: 0,
        v_y: 0,
        v_theta: 0,
        bola_x: 0,
        bola_y: 0,
      },
      bs2pc: {
        status: 0,
        tujuan_x: 0,
        tujuan_y: 0,
      },
      utils: {
        publish_switch: false,
      },
    };
  },
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    resetDataRobot() {
      this.dataRobot.pos_x = 58;
      this.dataRobot.pos_y = 58;
      this.dataRobot.pos_theta = 0;
      this.dataRobot.v_x = 0;
      this.dataRobot.v_y = 0;
      this.dataRobot.v_theta = 0;
      this.dataRobot.bola_x = 58;
      this.dataRobot.bola_y = 58;
    },
    // randomizeCounter() {
    //   this.count = Math.round(100 * Math.random());
    // },
  },
});
