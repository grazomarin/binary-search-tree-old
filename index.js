class Node {
  constructor(value) {
    this.value = value || null;
    this.left = null;
    this.right = null;
  }

  changeValue(input) {
    this.value = input;
  }
}

class Tree {
  constructor(array) {
    this.array = this.#sortArray(this.#cleanArray(array));
    this.root = this.buildTree(this.array);
  }

  #sortArray(array) {
    return array.sort((a, b) => a - b);
  }
  #cleanArray(array) {
    return [...new Set(array)];
  }

  #smallestLeaf(root) {
    if (root.left === null) return root;
    return this.#smallestLeaf(root.left);
  }

  buildTree(array = this.array) {
    if (array.length === 0) return null;
    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);
    if (array.length === 1) return root;
    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));

    return root;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value, root = this.root) {
    if (root.left === null && value < root.value) {
      root.left = new Node(value);
      return;
    }
    if (root.right === null && value > root.value) {
      root.right = new Node(value);
      return;
    }
    if (root.value === value) throw new Error("there is already such value");
    if (value < root.value) this.insert(value, root.left);
    if (value > root.value) this.insert(value, root.right);
  }

  delete(value, root = this.root) {
    if (root === null) return null;
    if (root.value === value) {
      if (root.left === null && root.right === null) return null;
      if (root.left === null && root.right !== null) return root.right;
      if (root.left !== null && root.right === null) return root.left;
      if (root.left !== null && root.right !== null) {
        const replacement = this.#smallestLeaf(root.right);
        this.delete(replacement.value, root);
        root.value = replacement.value;
        return root;
      }
    }

    if (value < root.value) {
      root.left = this.delete(value, root.left);
      return root;
    }
    if (value > root.value) {
      root.right = this.delete(value, root.right);
      return root;
    }
  }

  find(value, root = this.root) {
    if (root === null) return null;
    if (value === root.value) return root;
    if (value < root.value) return this.find(value, root.left);
    if (value > root.value) return this.find(value, root.right);
  }

  levelOrder(root = this.root) {
    const queue = [root];
    const result = [];

    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current.value);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return result;
  }

  preorder(root = this.root) {
    if (!root) return [];

    return [
      root.value,
      ...this.preorder(root.left),
      ...this.preorder(root.right),
    ];
  }

  inorder(root = this.root) {
    if (!root) return [];

    return [
      ...this.inorder(root.left),
      root.value,
      ...this.inorder(root.right),
    ];
  }

  postorder(root = this.root) {
    if (!root) return [];

    return [
      ...this.postorder(root.left),
      ...this.postorder(root.right),
      root.value,
    ];
  }

  height(root = this.root, h = 0) {
    if (!root) return h;
    h++;

    const left = this.height(root.left, h);
    const right = this.height(root.right, h);
    return left > right ? left : right;
  }

  depth(value, root = this.root, d = 0) {
    if (!root) return null;
    d++;
    if (value === root.value) return d;
    if (value < root.value) return this.depth(value, root.left, d);
    if (value > root.value) return this.depth(value, root.right, d);
    return d;
  }

  isBalanced(root) {
    if (!root) return false;
    if (Math.abs(this.height(root.left) - this.height(root.right)) > 1) {
      return false;
    }

    return true;
  }

  rebalance(root) {
    return new Tree(this.inorder(root));
  }
}

const array = [];
for (let i = 1; i <= 31; i++) {
  array.push(i);
}

const myTree = new Tree(array);
myTree.prettyPrint();
