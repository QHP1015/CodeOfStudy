// 创建队列类
class Queue {
    constructor() {
        this.items = []
    }
    // 入队操作
    enQueue(element) {
        this.items.push(element)
    }
    // 出队操作
    deQueue() {
        return this.items.shift()
    }
    // 查看队列元素
    front() {
        return this.items[0]
    }
    // 判断队列是否为空
    isEmpty() {
        return this.items.length === 0
    }
    // 查看队列种元素个数
    size() {
        return this.items.length
    }
    // toString
    toString() {
        return this.items.join(',')
    }
}

// 队列应用：击鼓传花
let passGame = (nameList, num) => {
    // 创建队列结构
    let queue = new Queue()

    // 将所有人依次加入队列
    for(let i of nameList){
      queue.enQueue(i)
    }

    // 开始数数
    while(queue.size() > 1){
        // 队列中只剩1个人就停止数数
        // 不是num的时候，重新加入队列末尾
        // 是num的时候，将其从队列中删除
        // num数字之前的人重新放入队列的末尾(把队列前面删除的加到队列最后)
        for(let i = 0; i< num-1; i++ ){
            queue.enQueue(queue.deQueue())
        }
        // num对应这个人，直接从队列中删除
        /*
            思路：由于队列没有像数组一样的下标值不能直接取到某一元素，
            所以采用，把num前面的num-1个元素先删除后添加到队列末尾，
            这样第num个元素就排到了队列的最前面，可以直接使用deQueue方法进行删除
        */
        queue.deQueue()
   }

    // 获取剩下的那个人
    console.log(queue.size());					
    let endName = queue.front()
    console.log('最终剩下的人：' + endName);	
    return nameList.indexOf(endName);
}

// 测试击鼓传花
let names = ['lily', 'lucy', 'Tom', 'Lilei', 'Tony']
console.log(passGame(names, 3));