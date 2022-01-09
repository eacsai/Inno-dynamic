// index.js
// 获取应用实例
import { evaluate } from 'eval5'
const util = require('../../utils/util.js')

const code =     
`Page({
  data: {    
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
  },
  onLoad: function() {
    console.log('start',util.formatTime(new Date()));
  }
})`
try {
  evaluate(code,{console,Page,wx,util})
} catch (e) {
  console.error(e)
}
