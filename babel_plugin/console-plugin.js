module.exports = function ({ types: t }, { env }) {
  let same = ''
  return {
    visitor: {
      CallExpression(path, state) {
        const parentPath = path.parentPath;
        const node = parentPath.node;
        let leadingReserve = false;
        let trailReserve = false;
        if (
          path.node.callee &&
          t.isIdentifier(path.node.callee.object, { name: "console" }) &&
          env === "production"
        ) {
          if (node.leadingComments) {
            // 遍历所有的前缀注释
            if(node.leadingComments && same === "wqwRemove") {
              node.leadingComments.splice(0,1)
              same = ''
            }
            node.leadingComments && node.leadingComments.forEach((comment) => {
              if (comment.value.trim() === "wqwRemove") {
                leadingReserve = true;
              }
              // 有保留字 并且不是上个兄弟节点的尾注释
            });
          }
          if (node.trailingComments) {
            // 遍历所有的后缀注释
            node.trailingComments && node.trailingComments.forEach((comment) => {
              const {
                loc: {
                  start: { line: commentLine },
                },
              } = comment;
              // 对于尾部注释 需要标记出 该注释是属于当前的尾部 还是属于下个节点的头部 通过其所属的行来判断
              const {
                loc: {
                  start: { line: expressionLine },
                },
              } = node.expression;
              if (commentLine === expressionLine) {
                comment.belongPrevTrail = true;
              }
              if (comment.value.trim() === "wqwRemove" && comment.belongPrevTrail) {
                same = comment.value.trim();
                trailReserve = true;
              }
              // 有保留字 并且是本行的
            });
          }
          if (leadingReserve || trailReserve) {
            path.remove();
          }
        }
      },
    },
  };
};
