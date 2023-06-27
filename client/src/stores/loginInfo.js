import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const UseLoginInfo = defineStore("infoLogin", {
  state: () => ({
    sessionInfo: null,
  }),
  getters: {
    getsessionInfo() {
      const info = JSON.parse(localStorage.getItem("sessionInfo"));
      if (info || this.sessionInfo !== null) {
        this.sessionInfo = info;
        return true;
      } else {
        return false;
      }
    },
    getinfoMenuUser() {
      return { name: this.sessionInfo.role, email: this.sessionInfo.email };
    },
  },
  actions: {
    fetchAccessToken() {
      const info = JSON.parse(localStorage.getItem("sessionInfo") ? localStorage.getItem('sesionInfo') : null);
      console.log(info)
      if (info) {
        this.sessionInfo = info;
        console.log("Token guardao");
      }
    },
    logout() {
      this.sessionInfo = null;
      localStorage.clear();
      api.post("sesionClose").then((res) => {
        console.log(res);
      });
    },
    login(info) {
      this.sessionInfo = info;
      localStorage.setItem("sessionInfo", JSON.stringify(info));
    },
    can(state) {
      const userInfo = JSON.parse(localStorage.getItem("sessionInfo"));
      const per =
        userInfo !== null
          ? userInfo.permissions.filter((item) => {
              return item === state;
            }).length
          : 0;
      if (per > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
});
