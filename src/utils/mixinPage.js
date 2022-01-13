import {mergeOptions} from './mergeOptions'
let _Page = Page;
export const mixinPage = (options, page = _Page) => {
  // 处理 mixins
  const mixins = options.mixins;
  if (Array.isArray(mixins)) {
    options = mergeOptions(mixins, options);
    delete options.mixins;
  }
  // 执行原始的 Page
  return page(options);
};
