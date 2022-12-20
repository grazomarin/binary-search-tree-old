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
}

const array = [];
for (let i = 1; i <= 20; i++) {
  array.push(i);
}

const myTree = new Tree(array);
