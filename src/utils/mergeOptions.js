const pageHooks = [
  "onLoad",
  "onShow",
  "onReady",
  "onHide",
  "onUnload",
  "onPullDownRefresh",
  "onReachBottom",
  "onShareAppMessage",
  "onPageScroll",
  "onResize",
  "onTabItemTap"
]

const hasOwnProperty = Object.prototype.hasOwnProperty;
const toString = Object.prototype.toString

function toRawType(value) {
  return toString.call(value).slice(8, -1);
}

function isPlainObject(value) {
  return toRawType(value) === "Object";
}

function isFunction(value) {
  return toRawType(value) === "Function";
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}


export const mergeOptions = (mixins, options) => {
  mixins.forEach(mixin => {
    if (!isPlainObject(mixin)) {
      throw new Error("typeof mixin must be plain object") 
    }

    // 支持混入对象中嵌套混入对象，递归处理
    if (mixin.mixins) {
      mixin = mergeOptions(mixin.mixins, mixin, hooks)
    }

    // 处理混入对象的每一个值, 可能是生命周期函数、可能是对象、也可能是方法
    for (const key in mixin) {
      // 暂存页面中原始的值
      const originValue = options[key]
      // 暂存混入对象的值
      const mixinValue = mixin[key]
      // 处理混入对象的生命周期函数
      if (pageHooks.includes(key)) {
        if (!isFunction(mixinValue)) {
          throw new Error(`typeof ${key} must be function`)
        }
        // 重写页面中对应的生命周期函数
        options[key] = function () {
          let res;
          // 先执行混入对象的生命周期函数
          res = mixinValue.apply(this, arguments)
          // 页面中定义了同名的生命周期函数，后执行
          if (originValue) res = originValue.apply(this, arguments)
          return res
        }
      }
      // 处理混入对象，值可能是 data
      else if (isPlainObject(mixinValue)) {
        options[key] = {
          ...mixinValue,
          ...originValue
        }
      }
      // 处理混入对象的属性或方法
      else {
        // 页面中不存在同名的属性或方法，才使用混入对象的属性或方法
        if (!hasOwn(options, key)) {
          options[key] = mixinValue
        }
      }
    }
  })

  return options
}