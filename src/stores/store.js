import { defineStore } from "pinia";

export const useRobotStore = defineStore("alerts", {
  id: "store",
  state: () => {
    return {
      dataRobot: {
        pos_x: 0,
        pos_y: 0,
        pos_theta: 0,
        v_x: 0,
        v_y: 0,
        v_theta: 0,
      },
      bs2pc: {
        status: 0,
        tujuan_x: 0,
        tujuan_y: 0,
      },
      utils: {
        mapStatus: "Blue", 
        tempStatus: 0,
      },
    };
  },
  actions: {
    resetDataRobot() {
      this.dataRobot.pos_x = 0;
      this.dataRobot.pos_y = 0;
      this.dataRobot.pos_theta = 0;
      this.dataRobot.v_x = 0;
      this.dataRobot.v_y = 0;
      this.dataRobot.v_theta = 0;
    },
    setMapStatus(status) {
      this.utils.mapStatus = status;
    },
  },
});
