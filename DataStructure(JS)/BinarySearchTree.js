// 初始化二叉链表
class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
        this.count = 1; // 在向二叉排序树中插入节点时，如果发现有已经有相同的节点值了，就放弃插入，但是将该节点的count变量加一
    }
}

// 二叉排序树
class BSTree {
    constructor() {
        this.root = null;
    }

    // 插入节点
    insert(data) {
        let newNode = new Node(data, null, null);
        // 判断根节点是否为空
        if (this.root == null) {
            this.root = newNode;
        } else {
            let currNode = this.root;
            let parentNode = null;

            while (true) {
                parentNode = currNode;

                if (newNode.data < currNode.data) {
                    // 更新当前指点的指向
                    currNode = currNode.left;

                    // 当前节点为空时，说明找到了正确的插入位置
                    if (!currNode) {
                        parentNode.left = newNode;
                        break;
                    }
                } else if (newNode.data > currNode.data) {
                    // 更新当前指点的指向
                    currNode = currNode.right;

                    // 当前节点为空时，说明找到了正确的插入位置
                    if (!currNode) {
                        parentNode.right = newNode;
                        break;
                    }
                } else if (newNode.data == currNode.data) {
                    // 如果给定的数据再次出现，就更新计数值
                    currNode.count++;
                    break;
                }
            }
        }
    }

    // 删除一个节点，下划线表示不应该在实例中调用此函数
    /**
     * 在删除节点时，一共可以分为三种情况：
     * 1.待删除的节点是叶子节点
     * 2.待删除的节点没有左子节点，或者没有右子节点
     * 3.待删除的节点的左右子节点均存在。
     */
    _removeNode(node, data) {
        if (node == null) {
            return null;
        }
        if (data == node.data) {
            // 叶子节点
            if (node.left == null && node.right == null) {
                return null;
            }

            // 没有左节点的节点
            if (node.left == null) return node.right;

            //没有右节点的节点
            if (node.right == null) return node.left;

            // 有两个节点的节点
            /*  
             做法：
                找到待删除节点的右子树上的最小值创建一个临时节点,
                将临时节点上的值复制到待删除节点，然后再删除临时节点
                可以有两种做法：要么查找待删除节点左子树上的最大值，要么查找其右子树上的最小值
                本例使用查找其右子树上的最小值的做法
            */

            // 寻找右子树上的最小值
            let tmpNode = this.getMinNode(node.right);
            node.data = tmpNode.data;
            node.right = this._removeNode(node.right, tmpNode.data);
            return node;
        } else if (data < node.data) { // 待删除节点在左子树上
            node.left = this._removeNode(node.left, data);
            return node;
        } else { // 待删除节点在右子树上
            node.right = this._removeNode(node.right, data);
            return node;
        }
    }

    // 删除给定的数据节点
    remove(data) {
        this.root = this._removeNode(this.root, data);
    }


    // 寻找给定数据的节点
    find(data) {
        let currNode = this.root;
        while (currNode) {
            if (currNode.data == data) {
                return currNode;
            } else if (data < currNode.data) {
                currNode = currNode.left;
            } else {
                currNode = currNode.right;
            }
        }
        return null;
    }

    // 获得最小值的节点
    getMinNode(node = this.root) {
        let currNode = node;
        while (currNode.left) {
            currNode = currNode.left;
        }
        return currNode;
    }

    // 获得最大值的节点
    getMaxNode(node = this.root) {
        let currNode = node;
        while (currNode.right) {
            currNode = currNode.right;
        }
        return currNode;
    }

    //    遍历方法
    // （1）层次遍历
    levelOrder(node = this.root) {
        let queue = [];
        let result = '';

        // 根节点入队
        queue.push(node);
        while (queue.length) {
            // 出队
            node = queue.shift();
            // 访问该节点
            result += `${node.data} `;

            // 如果它的左子树不为空
            if (node.left) {
                // 将左子树的根节点入队
                queue.push(node.left);
            }

            // 如果它的右子树不为空
            if (node.right) {
                // 将右子树的根节点入队
                queue.push(node.right);
            }
        }
        return result;
    }

    // （2）前序递归遍历
    /**
     * 前序遍历递归操作过程为：
     * 如果二叉树为空，直接返回，否则：
     * 1.访问根节点
     * 2.前序遍历左子树
     * 3.前序遍历右子树
     */
    preOrderRec(node = this.root) {
        //根左右(递归方法)
        let result = '';
        if (!(node == null)) {
            // 访问根节点
            result += `${node.data} `;
            // 前序遍历左子树
            result += this.preOrderRec(node.left);
            // 前序遍历右子树
            result += this.preOrderRec(node.right);
        }
        return result;
    }

    // （3）前序非递归遍历
    /**
     * 在非递归的遍历时，算法需要借助一个栈。
     * 首先访问根节点，然后将其入栈，如果此节点的左子树不为空，则再次访问此节点左子树的根节点，然后将其入栈。
     * 直到节点的左子树为空时，从堆栈中弹出一个节点，再按照相同的方法访问出栈节点的右子树。
     * 如此反复，直到堆栈为空时结束。
     */
    preOrderNonRec(node = this.root) {
        // 算法需要借助一个栈
        let stack = [];
        let result = '';

        // 当节点存在或者栈不为空时
        while (node || stack.length) {
            if (node) {
                // 访问根节点
                result += `${node.data} `;
                // 根节点入栈，后续需找到该节点的右节点
                stack.push(node);
                // 先遍历左子树
                node = node.left;
            } else {
                // 弹出根节点
                node = stack.pop();
                // 遍历根节点的右子树
                node = node.right;
            }
        }
        return result;
    }

    // （4）中序递归遍历
    /**
     * 中序遍历的递归操作过程为：
     * 如果二叉树为空，则直接返回，否则：
     * 1.中序遍历左子树
     * 2.访问根节点
     * 3.中序遍历右子树
     */
    inOrderRec(node = this.root) {
        // 左根右(递归方法)
        let result = '';
        if (node) {
            // 中序遍历左子树
            result += this.inOrderRec(node.left);
            // 访问根节点
            result += `${node.data} `;
            // 中序遍历右子树
            result += this.inOrderRec(node.right);
        }
        return result;
    }

    // （5）中序非递归遍历
    inOrderNonRec(node = this.root) {
        // 算法需要借助一个栈
        let stack = [];
        let result = '';

        // 当节点存在或者栈不为空时
        while (node || stack.length) {
            if (node) {
                // 依次进栈
                stack.push(node);
                // 扫描该节点的所有左子节点
                node = node.left;
            } else {
                // 进栈一个节点
                node = stack.pop();
                // 访问该节点
                result += `${node.data} `;
                // 扫描该节点的右子节点
                node = node.right;
            }
        }
        return result;
    }

    // （6）后序递归遍历
    /**
     * 后序遍历的操作过程为：
     * 如果二叉树为空，则直接返回。否则：
     * 1.后序遍历左子树
     * 2.后序遍历右子树
     * 3.访问根节点
     */
    postOrderRec(node = this.root) {
        let result = '';
        if (!(node == null)) {
            // 后序遍历左子树
            result += this.postOrderRec(node.left);
            // 后序遍历右子树
            result += this.postOrderRec(node.right);
            // 访问根节点
            result += `${node.data} `;
        }
        return result;
    }

    // （7）后序非递归遍历
    /**
     * 后序非递归遍历二叉树的顺序是先访问左子树，再访问右子树，最后访问根节点。
     * 当用堆栈来存储节点，必须分清楚返回根节点时，是从左子树返回的，还是从右子树返回的。
     * 所以使用辅助指针ret，其指向最近访问过的节点。
     * 当访问一个节点时，栈中的节点恰好是该节点的所有祖先。
     * 从栈底到栈顶节点在加上该节点，刚好构成从根节点到该节点的一条路径
     */
    postOrderNonRec(node = this.root) {
        let stack = [];
        let ret = node;
        let result = '';

        // 当节点存在或者栈不为空时
        while (node || stack.length) {
            // 根节点进栈，遍历左子树
            if (node) {
                stack.push(node);
                // 找到最左端的节点，路径上的节点全部入栈，包括叶子节点
                node = node.left;
            } else {
                // 获取栈顶节点
                node = stack[stack.length - 1];

                // 如果node有右节点且未访问过
                if (node.right && node.right != ret) {
                    node = node.right;
                    stack.push(node);
                    // 再找到最左的节点
                    node = node.left;
                } else {
                    node = stack.pop();
                    result += `${node.data} `;
                    ret = node;
                    node = null;
                }
            }
        }
        return result;
    }

    // 已知先序序列和中序序列重建二叉树
    /**
     * @param {Array} preArr 先序序列
     * @param {Array} inArr 中序序列
     * @param {Number} pBeg 先序序列的第一个下标
     * @param {Number} pEnd 先序序列的最后一个下标
     * @param {Number} iBeg 中序序列的第一个下标
     * @param {Number} iEnd 中序序列的最后一个下标
     */
    preInCreate(preArr, inArr, pBeg, pEnd, iBeg, iEnd) {
        let lLen = 0,
            rLen = 0;
        let splitIdx = -1;
        // 建立根节点
        let node = new Node(preArr[pBeg], null, null);

        if (!this.root) {
            this.root = node;
        }

        // 利用根节点在中序序列中进行划分
        for (let i = iBeg; i <= iEnd; i++) {
            if (inArr[i] == preArr[pBeg]) {
                splitIdx = i;
                break;
            }
        }

        if (splitIdx > -1) {
            // 左子树的长度
            lLen = splitIdx - iBeg;
            // 右子树的长度
            rLen = iEnd - splitIdx;
        }

        // 递归建立左子树
        if (lLen) {
            node.left = this.preInCreate(preArr, inArr, pBeg + 1, pBeg + lLen, iBeg, iBeg + lLen - 1);
        } else {
            node.left = null;
        }

        // 递归建立右子树
        if (rLen) {
            node.right = this.preInCreate(preArr, inArr, pEnd - rLen + 1, pEnd, iEnd - rLen + 1, iEnd);
        } else {
            node.right = null;
        }
        return node;
    }

    // 获得二叉树中节点个数
    /**
     * 获取二叉树中的节点个数可以有递归和非递归两种方法
     * 1.递归：根节点加上左子树节点的个数，加上右子树节点的个数返回
     * 2.非递归：利用层次遍历操作，只要在每次节点出队的时候计数加一
     */
    getNodeNumber1(node = this.root) {
        // 统计二叉树中结点个数的算法 （先根遍历）
        let count = 0;
        if (node) {
            // 根结点+1
            count++;
            // 加上左子树上结点数
            count += this.getNodeNumber(node.left);
            // 加上右子树上结点数
            count += this.getNodeNumber(node.right);
        }
        return count;
    }

    getNodeNumber2(node = this.root) {
        // 层次遍历（使用队列）==》最快
        let count = 0;
        if (node) {
            let queue = [];
            // 根节点入队列
            queue.push(node);
            while (queue.length) {
                node = queue.shift();
                // 只要一个节点出队，计数就加一
                count++;
                if (node.left) {
                    queue.push(node.left);
                }
                if (node.right) {
                    queue.push(node.right);
                }
            }
        }
        return count;
    }

    // 获得二叉树中叶子节点的个数
    /**
     * 获取二叉树中的叶子节点个数可以有递归和非递归两种方法
     * 1.递归：在当前节点为空时返回0，为叶子节点时返回1，其他情况再次调用自身
     * 2.非递归：利用层次遍历，只有出队列的节点同时没有左右子树时，计数才加一
     */
    getLeafNodeNumber1(node = this.root) {
        // 每次递归的结束条件
        if (!node) {
            return 0;
        }
        if (!node.left && !node.right) {
            return 1;
        }
        let leftNum = this.getLeafNodeNumber(node.left);
        let rightNum = this.getLeafNodeNumber(node.right);
        return leftNum + rightNum;
    }

    getLeafNodeNumber2(node = this.root) {
        // 层次遍历
        let queue = []; // 辅助队列
        let count = 0;
        if (node) {
            queue.push(node);
            while (queue.length) {
                node = queue.shift();
                if (node.left) {
                    queue.push(node.left);
                }
                if (node.right) {
                    queue.push(node.right);
                }
                if (!node.right && !node.left) {
                    // 没有左右子节点时计数加一
                    count++;
                }
            }
        }
        return count;
    }

    // 获取二叉树的深度
    /**
     * 二叉树的深度指的是从根节点到叶子节点中最长路径的长度为树的深度。根节点的深度为1
     * 这里采用递归的方法实现，思路是：
     * 1.一颗树只有一个节点，它的深度是1
     * 2.二叉树的根节点只有左子树而没有右子树，二叉树的深度应该是其左子树的深度加1
     * 3.二叉树的根节点只有右子树而没有左子树，二叉树的深度应该是其右子树的深度加1
     * 4.二叉树的根节点既有右子树又有左子树，那么二叉树的深度应该是其左右子树的深度较大值加1。
     */
    getTreeDepth(node = this.root) {
        let depth = 0;
        if (node) {
            depth++;
            // 只有左子树
            if (node.left && !node.right) {
                depth = this.getTreeDepth(node.left) + 1;
            }
            // 只有右子树
            if (node.right && !node.left) {
                depth = this.getTreeDepth(node.right) + 1;
            }
            // 既有右子树又有左子树
            if (node.left && node.right) {
                depth = (this.getTreeDepth(node.left) >
                    this.getTreeDepth(node.right) ?
                    this.getTreeDepth(node.left) : this.getTreeDepth(node.right)) + 1;
            }
        }
        return depth;
    }

    // 计算给定层数节点的个数
    /**
     * 使用层次遍历
     * 具体做法是使用一个变量来保存当前层数节点的个数，用这个变量作为内层循环结束的标识
     * 当内层循环结束时，队列中保存的就是下一层的节点了
     * 这时判断是否等于给定层数，如果相等就直接返回，不相等再进行下一轮循环。
     */
    getLevelNodeNumber(level, node = this.root) {
        if (node) {
            let depth = 1; // 当前层数为1
            let queue = [];
            queue.push(node);
            if (depth == level) return queue.length;
            while (true) {
                // size保存当前层数节点的个数
                let size = queue.length;

                if (size == 0) break;

                // 当前节点全部出队时，队列中保存的就是下一层节点
                while (size) {
                    node = queue.shift();
                    if (node.left) {
                        queue.push(node.left);
                    }
                    if (node.right) {
                        queue.push(node.right);
                    }
                    size--;
                }
                depth++;

                // 判断是否等于给定层数
                if (depth == level) return queue.length;
            }
        }
    }

    // 判断二叉树是不是完全二叉树
    /**
     * 完全二叉树：若二叉树的深度为h，则除第 h 层外，其它各层 (1～h-1) 的结点数都达到最大个数，且第 h 层所有的结点都连续集中在最左边的二叉树
     */

    /**
     * 思路1：补洞法
     * 完全二叉树指的是除了最后一层可能不是满的以外其他层都是满的二叉树，在最后一层在不满的情况下，节点全部分布在左端。
     * 因此可以利用这个特征，如果层次遍历时遇到一个空节点后，再向后的遍历的时候依然还有节点，则这个二叉树肯定不是完全二叉树。
     * 即，只要遍历到一个空节点，其后的节点必须全为空才行。
     */
    isCompleteTree1(node = this.root) {
        let queue = [];
        let flag = false;
        queue.push(node);
        while (queue.length) {
            node = queue.shift();

            // 如果节点不空
            if (node) {
                if (flag) {
                    return false;
                }
                // 关键就在于不管node的left和right是否存在依然加入队列
                queue.push(node.left);
                queue.push(node.right);
            } else {
                flag = true;
            }
        }
        return true;
    }

    /**
     * 思路2：
     * 如果一个节点只有右子节点，则不是完全二叉树。
     * 当遍历到一个不是叶子节点的节点时，如果其前面的节点没有右孩子节点，则不是完全二叉树。
     */
    isCompleteTree2(node = this.root) {
        let queue = [];
        let noRight = false;
        queue.push(node);
        while (queue.length) {
            node = queue.shift();
            // 如果当前节点只有右孩子节点
            if (!node.left && node.right) {
                return false;
            }

            // 遇到一个非叶子节点且其前面的节点没有右孩子节点
            if ((node.left || node.right) && noRight) {
                return true;
            }

            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            } else {
                noRight = true;
            }
        }
        return true;
    }

    // 求二叉树的镜像（翻转二叉树）
    invertTree(node = this.root) {
        // 递归
        if (!node) return;

        // 交换当前节点的左右子树
        let tmpNode = node.left;
        node.left = node.right;
        node.right = tmpNode;
        
        this.invertTree(node.left);
        this.invertTree(node.right);
    }
}