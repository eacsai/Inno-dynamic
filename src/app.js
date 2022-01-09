App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  },
  generator: function(){
    const decodeName = decodeURI("./pages/index/index.wxml")
    const generatorFunc = $gwx(decodeName)
    return generatorFunc
  }
})

