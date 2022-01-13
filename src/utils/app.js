let _App = App;
export const excApp = function (options, app = _App) {
  const { onLaunch, onShow, onHide } = options;
  options = {
    ...options,
    onLaunch(opts) {
      onLaunch && onLaunch(opts);
      const performance = wx.getPerformance(); // 获取当前小程序性能相关的信息
      const observer = performance.createObserver((entryList) => {
        // 创建全局性能事件监听器
        const list = entryList.getEntries();
        const routeItem = list.length && list[0];
      });
      observer.observe({ entryTypes: ["navigation"] }); // 监测路由
    },
    onShow(opts) {
      onShow && onShow(opts);
      console.log("onShow");
    },
    onHide(opts) {
      onHide && onHide(opts);
      console.log("onHide");
    },
  };
  return app(options);
};
