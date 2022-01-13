import React, { memo } from "react";
import { evaluate } from "eval5";
import { createPageConfig } from "../../runtime-core/npm/app.js";
import { View, Text, Button } from "../../runtime-core/npm/components";
import "./index.scss";
// export const Index = memo(()=>{
//   const click = () => {
//     console.log('wqw click', wx)  // wqwRemove
//     // wqwRem
//     console.log('wqw click', wx)
//   }
//   return(
//     <View className='title' onClick={click}>hello world</View>
//   )
// })
const code = `
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Index = void 0;
var Index = memo(function () {
  var click = function click() {
    console.log('wqw click', wx); // wqwRemove
    // wqwRem
    console.log('wqw click', wx);
  };
  return /*#__PURE__*/React.createElement(View, {
    class: "title",
    bindtap: click
  }, "hello world");
});
Page(createPageConfig(Index))
`;
try {
  evaluate(code, {
    console,
    Page,
    wx,
    React,
    memo,
    createPageConfig,
    exports,
    View,
    Text,
    Button,
  });
} catch (e) {
  console.error(e);
}
