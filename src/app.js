import { excPage } from './utils/excPage'
import { mixinPage } from './utils/mixinPage'
import { excApp as App } from './utils/app'

Page = [
  excPage,
  mixinPage,
].reduce((currentPage, fn) => (options, _page = currentPage) => fn(options, _page))
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
  },
  globalData: {
    userInfo: null
  }
})

