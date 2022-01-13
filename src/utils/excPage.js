let _Page = Page;
export const excPage = (options,page=_Page) => {
  const { onLoad, onUnload } = options;
  // debugger;
  options = {
    ...options,
    collectClick(opts) {
      // 页面点击埋点
      console.log("页面点击埋点");
      // 点击埋点逻辑
    },
    collectPage(opts) {
      // 页面生命周期埋点
      console.log("页面生命周期埋点");
      // 生命周期埋点逻辑
    },
    onLoad(opts) {
      onLoad && onLoad.call(this, opts);
      let { setData } = this;
      Object.defineProperty(this.__proto__, "setData", {
        configurable: false,
        enumerable: false,
        value: (...param) => {
          // 做一些记录，统计操作
          console.log("记录操作");
          return setData.apply(this, param);
        },
      });
      console.log("全局页面生命周期！");
      this.collectPage({
        lifeCycle: "onLoad",
        loadTime: +new Date(),
      });
    },
    onUnload() {
      onUnload && onUnload.call(this);
      this.collectClick({
        lifeCycle: "onUnload",
        stayTime: +new Date() - this._enterTime,
      });
    },
  };
  return page(options);
}
