const consoleTransformPlugin = require('babel-plugin-console-transform');
module.exports = {
  presets: [
    ["@babel/preset-env", {
      // false: 不用任何的polyfill相关的代码
      // usage: 代码中需要哪些polyfill, 就引用相关的api
      // entry: 手动在入口文件中导入 core-js/regenerator-runtime, 根据目标浏览器引入所有对应的polyfill
      useBuiltIns: "usage",
      corejs: 3
    }],
    ["@babel/preset-react"],
    ["@babel/preset-typescript"]
  ],
  plugins: [
    [
      "./babel_plugin/console-plugin.js",
      {
          env: 'production',
          removeMethods: ["*g*", (args) => args.includes('xxxx')],
          additionalStyleMethods: {
              'success': 'padding:10px; color:#fff;background:green;',
              'danger': 'padding:20px; background:red;font-size:30px; color:#fff;'
          }
      }
    ],
    "./babel_plugin/transform-plugin.js"
  ],
  sourceType: "unambiguous"
}