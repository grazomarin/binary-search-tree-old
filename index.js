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

  insert(int, root = this.root) {
    if (root.left === null && int < root.value) {
      root.left = new Node(int);
      return;
    }
    if (root.right === null && int > root.value) {
      root.right = new Node(int);
      return;
    }
    if (root.value === int) throw new Error("there is already such value");
    if (int < root.value) this.insert(int, root.left);
    if (int > root.value) this.insert(int, root.right);
  }
}

const myTree = new Tree([2, 5, 3, 1, 7, 8, 7]);
myTree.prettyPrint();
myTree.insert(6);
myTree.prettyPrint();
