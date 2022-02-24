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
}