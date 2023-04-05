import { defineStore } from "pinia";

export const UseLoginInfo = defineStore("infoLogin", {
  state: () => ({
    sessionInfo: {},
  }),
  getters: {},
  actions: {
    fetchAccessToken() {
      const info = JSON.parse(localStorage.getItem("sessionInfo"));
      if (info) {
        this.sessionInfo = info
        console.log('Token guardao')
      } else {
        this.sessionInfo = {}
        console.log('Nanai')
      }
    },
  },
});