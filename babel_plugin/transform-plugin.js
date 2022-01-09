const visitor = {
  ClassDeclaration(path) {
    className = path.node.id.name;
  },
  JSXAttribute(path) {
    const node = path.node;
    const attributeName = node.name.name;
    if (attributeName === "className") {
      path.node.name.name = "class";
    }
    if (attributeName === "onClick") {
      path.node.name.name = "bindtap";
    }
  },
};
module.exports = function() {
  // 名称必须是visitor
  return { visitor };
};