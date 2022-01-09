import VNode from './VNode';
import { generate } from './util';

export default class Container {
  constructor(context, rootKey = 'root') {
    this.context = context;
    this.root = new VNode({
      id: generate(),
      type: 'root',
      container: this,
    });
    this.root.mounted = true;
    this.rootKey = rootKey;
  }

  toJson(nodes ,data) {
    const json = data || []
    nodes.forEach(node => {
      const nodeData = {
        type: node.type,
        props: node.props || {},
        text: node.text,
        id: node.id,
        children: []
      }
      if (node.children) {
        this.toJson(node.children, nodeData.children)
      }
      json.push(nodeData)
    })
    console.log('json',json)
    return json
  }

  applyUpdate() {
    console.log('applyUpdate')
    const root = this.toJson([this.root])[0]
    this.context.setData({ root});
  }

  createCallback(name, fn) {
    console.log('createCallback')
    this.context[name] = fn
  }

  appendChild(child) {
    console.log('appendChild')
    this.root.appendChild(child);
  }

  removeChild(child) {
    console.log('removeChild')
    this.root.removeChild(child);
  }

  insertBefore(child, beforeChild) {
    console.log('insertBefore')
    this.root.insertBefore(child, beforeChild);
  }
}
