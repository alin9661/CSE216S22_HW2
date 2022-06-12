class Node {
    constructor(initKey, initData, initParent, initLeft, initRight) {
        this.key = initKey;
        this.data = initData;
        this.parent = initParent;
        this.left = initLeft;
        this.right = initRight;
    }
};

export default class BinarySearchTree {
    constructor(initKeyLength) {
        this.root = null;
        this.size = 0;
        this.keyLength = initKeyLength;
    }

    // @todo - YOU MUST UPDATE THIS METHOD SO A KEY ONLY HAS LOWERCASE LETTERS, NO NUMBERS
    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 36);
            let randomChar;
            if (randomNum < 10) {
                randomNum += 48;
                randomChar = String.fromCharCode(randomNum);
            }
            else {
                randomNum += 55;
                randomChar = String.fromCharCode(randomNum);
            }
            key += randomChar;
        }
        return key;
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, value) {
        if (this.root == null) {
            this.root = new Node(key, value, null, null, null);
        }
        this.putValueRecur(key, value, this.root);
    }

    putValueRecur(key, value, node) {
        if (key < node.key) {
            if (node.left == null) {
                node.left = new Node(key, value, node, null, null);
                this.size++;
                return;
            } else {
                this.putValueRecur(key, value, node.left);
            }
        } else if (key === node.key) {
            node.data = value;
            return;
        } else {
            if (node.right == null || node.right == undefined) {
                node.right = new Node(key, value, node, null, null);
                this.size++;
                return;
            } else {
                this.putValueRecur(key, value, node.right);
            }
        }
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        if (this.root == null) {
            return null;
        }
        return this.getValueRecur(key, this.root);
    }

    getValueRecur(key, node) {
        if (key < node.key) {
            if (node.left == null) {
                return null;
            } else {
                return this.getValueRecur(key, node.left);
            }
        } else if (key === node.key) {
            return node.data;
        } else {
            if (node.right == null || node.right == undefined) {
                return null;
            } else {
                return this.getValueRecur(key, node.right);
            }
        }
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {
        let cursor = this.root;
        let nodeFound = false;
        while(!nodeFound) {
            if (key === cursor.key) {
                if (cursor.left != null) {
                    let largestValue = cursor.left;
                    while (largestValue.right != null) {
                        largestValue = largestValue.right;
                    }
                    cursor.key = largestValue.key;
                    cursor.data = largestValue.data;
                    if (largestValue == largestValue.parent.left) {
                        largestValue.parent.left = largestValue.left;
                    } else {
                        largestValue.parent.right = largestValue.left;
                    }
                } else if (cursor.right != null) {
                    let smallestValue = cursor.right;
                    while (smallestValue.left != null) {
                        smallestValue = smallestValue.left;
                    }
                    cursor.key = smallestValue.key;
                    cursor.data = smallestValue.data;
                    if (smallestValue == smallestValue.parent.right) {
                        smallestValue.parent.right = smallestValue.right;
                    } else {
                        smallestValue.parent.left = smallestValue.right;
                    }
                } else {
                    if (cursor == this.root) {
                        this.root = null;
                    } else if (cursor == cursor.parent.left) {
                        cursor.parent.left = null;
                    } else {
                        cursor.parent.right = null;
                    }
                    this.size--;
                    nodeFound = true;
                }
            } else if(key < cursor.key) {
                if (cursor.left == null) {
                    return;
                } else {
                    cursor = cursor.left;
                }
            } else {
                if (cursor.right == null) {
                    return;
                } else {
                    cursor = cursor.right;
                }
            }
        }
    }

    toStringRecursively(traveller, level) {
        let text = "";
        if (traveller.left != null)
            text += this.toStringRecursively(traveller.left, level+1);
        for (let i = 0; i < level; i++) {
            text += "   ";
        }
        text += "   " + traveller.data.toString() + "\n";
        if (traveller.right != null)
            text += this.toStringRecursively(traveller.right, level+1);
        return text;        
    }

    toString() {
        return this.toStringRecursively(this.root, 0);
    }
}