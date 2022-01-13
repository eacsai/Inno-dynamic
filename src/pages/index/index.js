// index.js
// 获取应用实例
import { evaluate } from "eval5";
const util = require("../../utils/util.js");
import { interceptor } from "../../utils/interWx";

Page({
  data: {
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    canIUseGetUserProfile: false,
    canIUseOpenData:
      wx.canIUse("open-data.type.userAvatarUrl") &&
      wx.canIUse("open-data.type.userNickName"), // 如需尝试获取用户信息可改为false
  },
  mixins: [{
    data: {
      userAge: 25
    },
    onLoad: function () {
      console.log('mixin onLoad')
    },
  }],
  onLoad: function () {
    interceptor("showToast", {
      success: function () {
        console.log("showToast");
      },
    });
    wx.showToast({
      title: "message",
      icon: "none",
      duration: 2000,
    });
    setTimeout(() => {
      this.setData({ motto: "111" });
    }, 2000);
  },
});
// try {
//   evaluate(code,{console,Page,wx,util,interceptor})
// } catch (e) {
//   console.error(e)
// }
