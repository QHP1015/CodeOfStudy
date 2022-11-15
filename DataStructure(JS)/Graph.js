// 顶点表节点
class Vertex {
    constructor(data) {
        this.data = data; // 顶点域
        this.firstEdge = null; // 指向第一个邻接边的指针
        this.outNum = 0; // 在无向图中表示与顶点邻接的边的数量，在有向图中为出度
        this.inNum = 0; // 在有向图中为顶点的入度
    }
}

// 边表节点
class Edge {
    constructor(data, weight = 0, nextEdge = null) {
        this.data = data; // 邻接点域
        this.nextEdge = nextEdge; // 指向下一条邻接边
        this.weight = weight; // 顶点到当前节点的权重。
    }
}

// 采用邻接表的形式
class Graph {
    constructor(isDirect) {
        // 边的数目
        this.eNum = 0;
        // 顶点表
        this.adj = [];
        // 是否是有向图
        this.isDirect = isDirect;
    }

    // 基本方法

    // 初始化顶点表
    initVertex(verArr) {
        for (let i = 0; i < verArr.length; i++) {
            let newVer = new Vertex(verArr[i]);
            this.adj[i] = newVer;
        }
    }

    // 插入新的顶点
    insertVertex(x) {
        let newVer = new Vertex(x);
        this.adj.push(newVer);
    }

    // 找到节点x在adj中所在的位置
    // 前面加上下划线表示不应该在具体实例中调用该方法
    _find(x) {
        let pos = -1;
        for (let i = 0; i < this.adj.length; i++) {
            if (x == this.adj[i].data) pos = i;
        }
        return pos;
    }

    // 判断图中是否存在边(x,y)或者<x, y>。
    hasEdge(x, y) {
        let pos = this._find(x);
        if (pos > -1) {
            let curVer = this.adj[pos].firstEdge;

            // 没有与顶点x的邻接点
            if (!curVer) {
                return false;
            }
            // 至少有一个节点与顶点x是相邻的
            else {
                // 遍历顶点的所有邻接节点
                while (curVer) {
                    if (curVer.data === y) return true;
                    curVer = curVer.nextEdge;
                }
                return false;
            }
        }
    }

    // 向图中插入边(x, y)或者边<x, y>
    addEdge(x, y, w = 0) {
        let posX = this._find(x);
        let posY = this._find(y);
        let newEdgeX = new Edge(x, w);
        let newEdgeY = new Edge(y, w);

        // 如果是无向图，在插入边(x, y)时还要插入边(y, x)
        if (!this.isDirect) {
            if (!this.hasEdge(x, y) && !this.hasEdge(y, x)) {

                // 如果顶点x在顶点表中
                if (posX > -1) {
                    let curVer = this.adj[posX].firstEdge;

                    // 如果当前顶点没有第一个边节点
                    if (!curVer) {
                        this.adj[posX].firstEdge = newEdgeY;
                        this.adj[posX].outNum++;
                    } else {
                        let len = this.adj[posX].outNum - 1;
                        while (len--) {
                            curVer = curVer.nextEdge;
                        }
                        curVer.nextEdge = newEdgeY;
                        this.adj[posX].outNum++;
                    }
                }

                // 如果顶点y在顶点表中
                if (posY > -1) {
                    let curVer = this.adj[posY].firstEdge;

                    // 如果当前顶点没有第一个边节点
                    if (!curVer) {
                        this.adj[posY].firstEdge = newEdgeX;
                        this.adj[posY].outNum++;
                    } else {
                        let len = this.adj[posY].outNum - 1;
                        while (len--) {
                            curVer = curVer.nextEdge;
                        }
                        curVer.nextEdge = newEdgeX;
                        this.adj[posY].outNum++;
                    }
                }
                this.eNum++;
            }
        }
        // 如果是有向图则只需要插入边<x, y>即可
        else {
            if (!this.hasEdge(x, y)) {
                // 如果顶点x在顶点表中
                if (posX > -1) {
                    let curVer = this.adj[posX].firstEdge;

                    // 如果当前顶点没有第一个边节点
                    if (!curVer) {
                        this.adj[posX].firstEdge = newEdgeY;
                        this.adj[posX].outNum++;
                    } else {
                        let len = this.adj[posX].outNum - 1;
                        while (len--) {
                            curVer = curVer.nextEdge;
                        }
                        curVer.nextEdge = newEdgeY;

                        // 顶点x的出度增长
                        this.adj[posX].outNum++;
                    }
                    this.eNum++;
                }

                if (posY > -1) {
                    let curVer = this.adj[posY];

                    // 顶点y的入度增长
                    curVer.inNum++;
                }
            }
        }
    }

    // 在图中删除边(x, y)或者边<x, y>
    removeEdge(x, y) {
        if (this.hasEdge(x, y)) {
            let posX = this._find(x);
            let posY = this._find(y);
            let curVerX = this.adj[posX].firstEdge;
            let curVerY = this.adj[posY].firstEdge;

            // 如果是无向图，当删除边(x, y)时也需要同时删除边(y, x);
            if (!this.isDirect) {
                // 删除边(x, y)
                if (curVerX.data === y) { // 如果顶点的第一个节点即是要找的节点
                    this.adj[posX].firstEdge = curVerX.nextEdge;
                    this.adj[posX].outNum--;
                    curVerX = null;
                }

                // curVerX如果存在，说明要找的节点不是顶点的第一个节点
                while (curVerX) {
                    let preVerX = curVerX;
                    curVerX = curVerX.nextEdge;

                    if (curVerX && curVerX.data === y) {
                        preVerX.nextEdge = curVerX.nextEdge;
                        this.adj[posX].outNum--;
                        curVerX = null;
                    }
                }

                // 删除边(y, x)
                if (curVerY.data === x) { // 如果顶点的第一个节点即是要找的节点
                    this.adj[posY].firstEdge = curVerY.nextEdge;
                    this.adj[posY].outNum--;
                    curVerY = null;
                }

                // curVerY如果存在，说明要找的节点不是顶点的第一个节点
                while (curVerY) {
                    let preVerY = curVerY;
                    curVerY = curVerY.nextEdge;

                    if (curVerY && curVerY.data === x) {
                        preVerY.nextEdge = curVerY.nextEdge;
                        this.adj[posY].outNum--;
                        curVerY = null;
                    }
                }
            } else {
                // 删除边<x, y>
                if (curVerX.data === y) { // 如果顶点的第一个节点即是要找的节点
                    this.adj[posX].firstEdge = curVerX.nextEdge;
                    this.adj[posX].outNum--;
                    curVerX = null;
                }

                // curVerX如果存在，说明要找的节点不是顶点的第一个节点
                while (curVerX) {
                    let preVerX = curVerX;
                    curVerX = curVerX.nextEdge;

                    if (curVerx && curVerX.data === y) {
                        preVerX.nextEdge = curVerX.nextEdge;
                        this.adj[posX].outNum--;
                        curVerX = null;
                    }
                }

                this.adj[posY].inNum--;
            }

            this.eNum--;
        }
    }

    // 从图中删除顶点x
    deleteVertex(x) {
        let pos = this._find(x);

        if (pos > -1) {
            // 删除从x出发的边
            let curVer = this.adj[pos].firstEdge;

            while (curVer) {
                this.removeEdge(x, curVer.data);
                curVer = curVer.nextEdge;
            }

            // 删除终点是x的边
            for (let i = 0; i < this.adj.length; i++) {
                let temVer = this.adj[i].firstEdge;

                while (temVer) {
                    if (temVer.data === x) {
                        this.removeEdge(this.adj[i].data, temVer.data);
                    }

                    temVer = temVer.nextEdge;
                }
            }

            // 删除顶点x
            this.adj.splice(pos, 1);
        }
    }

    // 与顶点x邻接的所有节点
    allNeighbors(x) {
        let pos = this._find(x);

        if (pos > -1) {
            let result = `${x}`;
            let curVer = this.adj[pos].firstEdge;

            while (curVer) {
                result += `=>${curVer.data}`;
                curVer = curVer.nextEdge;
            }
            console.log(result);
        }
    }

    // 遍历方法

    // 广度优先求出图中所有的连通分量，从给定的顶点x开始
    /**
     * 首先访问起始顶点v，接着由v出发，依次访问v的各个未访问过的邻接顶点w1，w2，……，然后再依次访问w1，w2，……，wi的所有未被访问过的邻接顶点。
     * 再从这些访问过的顶点出发，再访问他们所有未被访问过的邻接顶点，依次类推，直到所有的顶点都被访问过。
     * 如果无向图是连通的，则从给定的顶点出发，仅需一次遍历就能够访问图中所有的顶点，
     * 如果无向图是非连通的，则给定的顶点出发，一次遍历只能访问到该顶点所在的连通分量的所有顶点，而对于图中其他连通分量的顶点，则无法通过这次遍历访问。
     * 对于有向图来说，如果从初始点到图中的每个顶点都有路径，则能够访问到图中所有的顶点，否则不能访问到所有的顶点
     * 使用一个visited数组来标记顶点是否被访问过。
     */
    // x为广度优先遍历的起始顶点
    BFSTraverse(x = this.adj[0].data) {
        // 访问标记数组，标记数组和顶点表唯一的联系就是下标
        let visited = [];
        let result = '';

        for (let i = 0; i < this.adj.length; i++) {
            visited[i] = false;
        }

        // 求以x为起始点的连通分量
        result = this._BFS(x, visited);

        // 如果还有未被访问过的顶点，则以该顶点再次出发
        for (let i = 0; i < visited.length; i++) {
            if (!visited[i]) {
                let x = this.adj[i].data;

                // 其他的连通分量
                result += `&${this._BFS(x, visited)}`;
            }
        }

        return result;
    }

    // 实际进行广度遍历的函数，每次遍历都是得到一个以顶点x为起点的连通分量
    /**
     * _BFS()函数中使用了两个循环，外层循环每次从队列中取出一个顶点，使用内层循环依次访问该顶点的边表中的所有节点
     * 内层循环不断的将当前起始节点的所有边表节点加入队列（只有在这些节点未被访问过时）
     * 当遍历完当前顶点的所有的边表节点后，从队列中取出一个节点再次开始循环，直到队列为空结束
     */
    _BFS(x, visited) {
        let result = '';
        // 辅助队列
        let queue = [];
        // 找到顶点x在顶点表中的位置
        let pos = this._find(x);

        if (pos > -1) {
            result += `${x}`;
            // 在标记数组相应的位置上做已访问标识
            visited[pos] = true;

            // 当前顶点
            let curVer = this.adj[pos];
            // 顶点x入队列
            queue.push(curVer);

            while (queue.length) {
                // 取出一个顶点
                curVer = queue.shift();
                // 注意要回到顶点的表中再次出发
                pos = this._find(curVer.data);
                curVer = this.adj[pos].firstEdge;

                // 检测顶点的所有邻接点
                while (curVer) {
                    pos = this._find(curVer.data);

                    // 如果当前节点未被访问过
                    if (!visited[pos]) {
                        result += `->${curVer.data}`;
                        // 做已访问标识
                        visited[pos] = true;
                        queue.push(curVer);
                    }

                    curVer = curVer.nextEdge;
                }
            }
        }
        return result;
    }

    // 深度优先求出图中所有的连通分量，从给定的顶点x开始
    /**
     * 首先访问图中某一个起始顶点x，然后由x出发，访问与x邻接且未被访问的任一个顶点w1，再访问与w1邻接的未被访问的任一个顶点w2
     * 重复这个过程，当不能再继续向下访问时，依次退回到最近被访问的顶点
     * 若它还有邻接顶点未被访问过，则从该点开始继续上述搜索过程，直到图中所有的顶点都被访问过为止
     * 
     * 如果无向图是连通的，则这个给定的顶点出发，仅需一次遍历就能够访问图中所有的顶点
     * 如果无向图是非连通的，则从这个顶点出发，一次遍历只能访问到该顶点所在的连通分量的所有顶点
     * 而对于图中其他连通分量的顶点，则无法通过这次遍历访问
     * 对于有向图来说，如果从初始点到图中的每个顶点都有路径，则能够访问到图中所有的顶点，否则不能访问到所有的顶点。
     */
    DFSTraverse(x = this.adj[0].data) {
        let result = '';
        let visited = []; // 标记数组

        for (let i = 0; i < this.adj.length; i++) {
            visited[i] = false;
        }

        result = this._DFS(x, visited);

        // 如果还有未被访问过的顶点，则以该顶点再次出发
        for (let i = 0; i < visited.length; i++) {
            if (!visited[i]) {
                let x = this.adj[i].data;
                result += `&${this._DFS(x, visited)}`;
            }
        }

        return result;
    }

    // 实际进行深度遍历的函数，每次遍历都是得到一个以顶点x为起点的连通分量
    /**
     * 如果发现这个节点的相邻节点中有未被访问过的，则访问这个节点，并将其压入堆栈，做已访问标识，再访问这个节点的一个相邻节点...
     * 如果这个节点的所有相邻节点都被访问过了，而此时堆栈还不为空，就将其弹出去。
     * 再取堆栈的栈顶元素重复步骤1的操作，如果这个节点的所有相邻节点又全被访问过了，就再将其弹出去...，
     * 依此往复，直到堆栈为空结束
     */
    _DFS(x, visited) {
        let result = '';
        let stack = []; // 辅助堆栈
        let pos = this._find(x);
        let curVer = this.adj[pos]; // 根据给的x值找到具体的顶点

        if (pos > -1) {
            stack.push(curVer); // 顶点x入栈
            result += `${x}`;
            visited[pos] = true;

            while (stack.length) {
                // 获取栈顶元素
                curVer = stack[stack.length - 1];
                // 获取栈顶元素在顶点表中的位置
                pos = this._find(curVer.data);
                // 获取顶点的第一个邻接点
                curVer = this.adj[pos].firstEdge;

                while (curVer) {
                    pos = this._find(curVer.data);

                    // 如果该节点已经访问过了,则访问该节点的下一个相邻的节点
                    if (visited[pos]) {
                        curVer = curVer.nextEdge;
                    } else {
                        stack.push(curVer);
                        result += `->${curVer.data}`;
                        visited[pos] = true;
                        break;
                    }
                }

                // 如果顶点的所有邻接点都访问过
                if (!curVer) stack.pop();
            }
        }

        return result;
    }

    // 最小生成树

    // 获取边(x, y)或<x, y>对应的权值
    getEdgeWeight(x, y) {
        let pos = this._find(x);
        if (pos > -1) {
            let curVer = this.adj[pos].firstEdge;

            while (curVer) {
                if (curVer.data === y) {
                    return curVer.weight;
                }

                curVer = curVer.nextEdge;
            }

            return 0;
        }
    }

    // 获得图中权重之和
    getSumOfWeight() {
        // 当图不是连通的时候，获取权重之和没有意义
        if (!this.isConnected()) return;

        let sum = 0;
        let vertex = this.adj;

        // 如果是无向图
        if (!this.isDirect) {
            for (let i = 0; i < vertex.length - 1; i++) {
                for (let j = i; j < vertex.length; j++) {
                    let weight = this.getEdgeWeight(vertex[i].data, vertex[j].data);

                    if (weight) sum += weight;
                }
            }
        } else {
            for (let i = 0; i < vertex.length; i++) {
                for (let j = 0; j < vertex.length; j++) {
                    let weight = this.getEdgeWeight(vertex[i].data, vertex[j].data);

                    if (weight) sum += weight;
                }
            }
        }

        return sum;
    }

    // 判断当前的图是否是连通图
    isConnected(x = this.adj[0].data) {
        // 任选一个顶点作为起点
        let len = this.adj.length;
        let visited = new Array(len);

        for (let i = 0; i < len; i++) {
            visited[i] = false;
        }

        this._BFS(x, visited);

        // 如果遍历一边之后仍有顶点未被访问，则该图不是连通的
        for (let i = 0; i < len; i++) {
            if (!visited[i]) return false;
        }

        return true;
    }

    // 普里姆算法
    /**
     * 假设V是图中所有所有顶点的集合，VT初始时在V中任选一个顶点（算法实现里假设总是选择第一个顶点）
     * 找出VT与V-VT中所有能构成的边的组合，选择其中权重最小的组合，然后取出这个组合在V-VT的中顶点放入VT中，直到VT=V
     */
    getPrimMSTree() {
        // 不是连通图时求最小生成树没有意义
        if (!this.isConnected()) {
            return;
        }

        // 顶点集V
        let V = this.adj;
        // 添加任意一个顶点
        let Vt = [V[0]];
        // VVt = V - Vt
        let VVt = V.filter(x => Vt.indexOf(x) === -1);
        // 初始化空树
        let MSTree = new Graph(this.isDirect);
        // 图方便先将所有顶点都放入树中
        V.forEach(x => MSTree.insertVertex(x.data));

        // 若树中不含全部顶点
        while (Vt.length !== V.length) {
            // 当找到权值最小的边时，mVT是边的一个顶点
            let mVt = null;
            // 当找到权值最小的边时，mV_VT是边的另一个顶点
            let mVVt = null;
            // 先将minW赋个极大的数值
            let minW = Number.MAX_SAFE_INTEGER;

            // 在VT和V_VT中找到边中的最小权值
            // 从VT中取出一个顶点
            for (let i = 0; i < Vt.length; i++) {

                // 从VVt中取出一个顶点
                for (let j = 0; j < VVt.length; j++) {
                    let weight = this.getEdgeWeight(Vt[i].data, VVt[j].data);

                    if (weight && minW > weight) {
                        minW = weight;
                        mVt = Vt[i];
                        mVVt = VVt[j];
                    }
                }
            }

            Vt.push(mVVt);
            MSTree.addEdge(mVt.data, mVVt.data, minW);
            VVt = V.filter(x => Vt.indexOf(x) === -1);
        }

        return MSTree;
    }

    // 获取图中所有的边
    getAllEdges() {
        let vertex = this.adj;
        // 在edges中存放图中所有的边
        let edges = [];

        // 如果是无向图
        if (!this.isDirect) {
            for (let i = 0; i < vertex.length - 1; i++) {
                for (let j = i; j < vertex.length; j++) {
                    if (this.hasEdge(vertex[i].data, vertex[j].data)) {
                        let weight = this.getEdgeWeight(vertex[i].data, vertex[j].data);
                        edges.push([vertex[i].data, vertex[j].data, weight]);
                    }
                }
            }
        } else {
            for (let i = 0; i < vertex.length; i++) {
                for (let j = 0; j < vertex.length; j++) {
                    if (this.hasEdge(vertex[i].data, vertex[j].data)) {
                        let weight = this.getEdgeWeight(vertex[i].data, vertex[j].data);
                        edges.push([vertex[i].data, vertex[j].data, weight]);
                    }
                }
            }
        }

        return edges;
    }

    // 克鲁斯卡尔算法
    /**
     * 先找权重最小的边，再找权重次小的边...，如果找到的边加入最小生成树中不构成回路就保留，否则舍弃
     */
    // 算法的基本思想是先找权重最小的边，再找权重次小的边
    getKruskalMST() {
        // 不是连通图时求最小生成树没有意义
        if (!this.isConnected()) {
            return;
        }

        // 顶点集V
        let V = this.adj;
        // 树中的连通分量
        let numS = V.length;
        // 在E中存放图中所有的边
        let E = this.getAllEdges();
        let mEdge = null;

        // 初始化空树
        let MSTree = new Graph(this.isDirect);
        // 树中只有顶点
        V.forEach(x => MSTree.insertVertex(x.data));

        while (numS > 1) {
            let mWeight = Number.MAX_SAFE_INTEGER;

            // 从图中取出权值最小的边(u, v);
            for (let i = 0; i < E.length; i++) {
                if (E[i][2] < mWeight) {
                    mEdge = E[i];
                    mWeight = mEdge[2];
                }
            }

            // 广度优先遍历
            let result = MSTree.BFSTraverse(mEdge[0]);
            // 只取&前面的字符串
            result = result.split('&')[0];
            let pos = result.indexOf(mEdge[1]);

            // 如果u和v属于树中不同的连通分量，就将此边加入生成树中
            // 从顶点mEdge[0]遍历一遍发现没有mEdge[1]，说明两个顶点不在一个连通分量之中
            if (pos === -1) {
                MSTree.addEdge(mEdge[0], mEdge[1], mEdge[2]);
                numS--;
            }

            // 去掉E中权值最小的边
            E = E.filter(x => x !== mEdge);
        }

        return MSTree;
    }


    // 最短路径 

    /**
     * 求带权图顶点x到其他顶点的最短路径
     * 从x到y可能有多条路径，把带权路径长度最短的那条路径称为最短路径
     * 求解最短路径的算法通常都依懒于一种性质
     * 也就是两点之间的最短路径也包含了路径上的其他顶点间的最短路径
     */
    getShortestPath(x) {
        // 使用Dijkstra算法
        // 如果是无向图或者边有负的权值时退出
        // 如果x不存在于图中时退出
        // 如果从顶点x到不了图中任意一个顶点则退出
        if (!this.isDirect ||
            this.getMinEdgeWeight() < 0 ||
            this._find(x) === -1 ||
            !this.isConnected(x)) {
            return -1;
        }

        var MAX = Number.MAX_SAFE_INTEGER;

        // 初始化
        var len = this.adj.length;

        // 在dist数组中，dist[i]的初值为顶点x到顶点i之间的权值，
        // x到i没有路径时，dist[i]记为无穷大
        var dist = [];
        var path = []; // path[i]表示顶点x到i的最短路径
        var vers = []; // 顶点集
        var exts = [x]; // 已找到最短路径的点的集合

        // 初始化path和dist数组
        for (let i = 0; i < len; i++) {
            vers[i] = this.adj[i].data;
            dist[i] = this.getEdgeWeight(x, vers[i]) || MAX;
            if (dist[i] !== MAX) {
                path[i] = `${x}->${vers[i]}`;
            } else {
                path[i] = '';
            }
        }

        var rem = vers.filter(x => exts.indexOf(x) === -1); // 剩余的顶点
        var n = 1;

        while (n < len) {
            // 在dist中寻找最小值
            var min = MAX;
            var idx = -1;

            for (let i = 0; i < len; i++) {
                if (min > dist[i]) {
                    min = dist[i];
                    idx = i;
                }
            }

            // 直接找到Vj
            var Vj = vers[idx];

            dist[idx] = MAX;
            exts.push(Vj);
            rem = vers.filter(x => exts.indexOf(x) === -1);

            // 输出最短路径
            console.log(path[idx]);

            // 松弛工作
            for (let i = 0; i < rem.length; i++) {
                // Vj到其他节点的距离
                var w = this.getEdgeWeight(Vj, rem[i]) || MAX;
                var k = vers.indexOf(rem[i]);

                if (w + min < dist[k]) {
                    dist[k] = w + min;
                    path[k] = `${path[idx]}->${rem[i]}`;
                }
            }
            n++;
        }
    }

}



// 测试 
let arr = ['A', 'B', 'C', 'D', 'E'];
let myGraph = new Graph(0); // 0表示无向图
myGraph.initVertex(arr);

myGraph.addEdge('A', 'B', 5);
myGraph.addEdge('A', 'C', 7);
myGraph.addEdge('A', 'E', 6);
myGraph.addEdge('B', 'D', 2);
myGraph.addEdge('B', 'E', 4);
myGraph.addEdge('C', 'D', 4);
myGraph.addEdge('C', 'E', 2);
myGraph.addEdge('D', 'E', 3);

let MSTree1 = myGraph.getPrimMSTree();

console.log(MSTree1.BFSTraverse()); // 广度优先遍历下看看
// 输出A->B->D->E->C
console.log(MSTree1.DFSTraverse()); // 深度优先遍历下看看
// 输出A->B->D->E->C
console.log(MSTree1.getSumOfWeight());
// 输出12

let MSTree2 = myGraph.getKruskalMST();
console.log(MSTree2.BFSTraverse()); // 广度优先遍历下看看
// 输出A->B->D->E->C
console.log(MSTree2.DFSTraverse()); // 深度优先遍历下看看
// 输出A->B->D->E->C
console.log(MSTree2.getSumOfWeight());
// 输出12




// https://www.zhihu.com/column/c_1208759212668518400