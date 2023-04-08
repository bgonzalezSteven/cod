import { defineStore } from "pinia";

export const UseLoginInfo = defineStore("infoLogin", {
  state: () => ({
    sessionInfo: null,
  }),
  getters: {
    getsessionInfo() {
      const info = JSON.parse(localStorage.getItem("sessionInfo"));
      if (info || (this.sessionInfo !== null)) {        
        this.sessionInfo = info;
        return true
      } else {
        return false
      }
    },
    getinfoMenuUser() {
      return (this.sessionInfo)
    }
  },
  actions: {
    fetchAccessToken() {
      const info = JSON.parse(localStorage.getItem("sessionInfo"));
      if (info) {
        this.sessionInfo = info;
        console.log("Token guardao");
      }
    },
    logout() {
      this.sessionInfo = null
      localStorage.clear()
    },
    login(info) {
      this.sessionInfo = info
      localStorage.setItem("sessionInfo", JSON.stringify(info));
    }
  },
});