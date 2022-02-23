class HashTable {
    // 初始化哈希表
    constructor(size) {
        // 存储数据，最后数据格式应该是 [[[key,value],[key,value]]],这里采用的是数组形式
        this.storage = [];
        // 初始化数组长度，尽量取质数，容量不够时，需要扩容
        this.size = size;
        // loadFactor = this.count / this.size 如果超过0.75，则需要扩容
        this.count = 0;
    }

    // 创建hash函数，根据霍纳算法取模
    hashFunc(value) {
        const H = 37; // 质数
        let hashCode = 0
        // 采用霍纳算法求出index
        for (let i = 0; i < value.length; i++) {
            hashCode = H * hashCode + i.charCodeAt(i)
        }
        return hashCode % this.size
    }

    // 插入和修改数据
    // 1. 如果this.storage[index] === undefined ,则需要创建 this.storage[index] = [[]]
    // 2. this.storage[index] = [[key, value]] ,遍历，有key则更新值，无key则push添加上
    put = (key, value) => {
        const index = this.hashFunc(key);
        // 判断是否存在 this.storage[index] = [[]]， 这里称为basket，有没有篮子存放对应存放key，value
        if (this.storage[index] === undefined) {
            this.storage[index] = []
        }
        // 遍历basket里面的数组数据
        const basket = this.storage[index]
        if (basket.length) {
            for (let i = 0; i < basket.length; i++) {
                const tuple = basket[i]
                // 若key对应，则直接修改数据，跳出
                if (tuple[0] === key) {
                    tuple[1] = value;
                    return
                }
            }
        }
        // 若找不到key，则直接添加在数组后面
        basket.push([key, value])
        this.count++;

        // 当装填因子 >= 0.75，则需要扩容
        if (this.count >= this.size * 0.75) {
            // 找出最小的质数
            const newSize = smallerPrime(this.size * 2)
            this.resize(newSize)
        }
    }

    // get 获取对应的value
    /*
     * 1 根据hashFunc，获取出key对应的index
     * 2 找到storage[index],为undefined，则直接返回null，否则，获取出对应数据bucket
     * 3 遍历对应的bucket，拿到value，否则返回null
     */
    get = (key) => {
        const index = this.hashFunc(key);
        const bucket = this.storage[index]
        if (bucket === undefined) {
            return null
        }
        let res = null;
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                res = bucket[i][1]
                break;
            }
        }
        return res;
    }

    /**
     * 删除操作
     * 根据hashFunc，获取出key对应的index
     * 找到storage[index],为undefined，则直接返回null，否则，获取出对应数据bucket
     * 遍历对应的bucket，若bucket[i][0] === key,则调用splice，否则返回null
     */
    delete = (key) => {
        const index = this.hashFunc(key);
        const bucket = this.storage[index];
        let res = null
        if (bucket === undefined) {
            return null
        }
        for (let i = 0; i < bucket.length; i++) {
            const tuple = bucket[i];
            if (tuple[0] === key) {
                bucket.splice(i, 1)
                this.count--;
                res = tuple[1]
                // 假设初始数组长度为7
                if (this.size > 7 && this.count < this.size * 0.25) {
                    const num = smallerPrime(Math.floor(this.size / 2));
                    this.resize(num)
                }
            }
        }
        return res
    }

    // isEmpty 是否为空
    isEmpty = () => {
        return this.count === 0
    }

    // size 长度
    length = () => {
        return this.count
    }

    /**
     * 扩容，当添加元素时，loadFactor（装载因子）> 0.75时，需要扩容
     * 缩容，当删除元素时，loadFactor（装载因子）< 0.25 && this.size > 初始数组长度时，需要缩容
     * 当需要执行扩容后，哈希表中storage数组中的元素需要重新存放
     * 因为这时候的size不一样，取模后的索引也就不一样了，需要将旧的数组重新放入到新的数组中
     */
    resize = (limit) => {
        const oldStore = this.storage;
        // 重置storage，count，size
        this.storage = [];
        this.count = 0;
        this.size = limit;
        // 将原有的数据重新添加到store中
        for (let i = 0; i < oldStore.length; i++) {
            const basket = oldStore[i]
            if (basket === undefined) {
                continue
            }
            for (let i = 0; i < basket.length; i++) {
                const tuple = basket[i]
                this.put(tuple[0], tuple[1])
            }
        }
    }

    /**
     * 找出扩容2倍后距离最近的质数，保证质数是避免模数相同的数之间具备公共因数
     */
    // 判断是不是质数
    isPrime(num) {
        // 开根号
        const sqr = parseInt(Math.sqrt(num))
        for (let i = 2; i <= sqr; i++) {
            if (num % i === 0) {
                return false
            }
        }
        return true
    }
    // 求出相邻最小的质数
    smallerPrime(num) {
        while (!isPrime(num)) {
            num++
        }
        return num;
    }

}