const cbMethods = ["success", "fail", "complete"];

// 备份原有微信方法
let _wx = {};
try {
  _wx = Object.assign({}, wx);
} catch (e) {
  _wx = {};
}
export const interceptor = (key, options) => {
  try {
    if (_wx[key]) {
      Object.defineProperty(wx, key, {
        writable: true,
      });
      Object.defineProperty(wx, key, {
        value: (config) => {
          // 备份业务代码传入的回调方法
          let backup = {};
          cbMethods.forEach((k) => {  
            backup[k] = config[k];
            config[k] = (res) => {
              // 执行自定义方法
              options[k] && options[k](res);
              backup[k] && backup[k](res);
            };
          });
          // 执行拦截器
          options["interceptorBefore"] && options["interceptorBefore"](config);
          _wx[key](config);
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
};