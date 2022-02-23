class HashTable {
    // 初始化哈希表
    constructor(size) {
        this.table = new Array(size)
        this.size = 0
    }

    // 哈希函数，霍纳算法取模运算
    hashFunc(value) {
        let hashCode = 0
        for (let item of value) {
            hashCode = hashCode + item.charCodeAt(0)
        }
        let key = hashCode % this.table.length
        return key
    }

    // 插入数据（线性探测）
    set(value) {
        let key = this.hashFunc(value)
        while (this.table[key] !== undefined && this.table[key] !== value) {
            key++
            if (key >= this.table.length) {
                throw new Error('已经没有可用空间')
            }
        }
        if (this.table[key] !== value) {
            this.size++
            this.table[key] = value
        }
    }

    // 获取数据
    get(value) {
        let key = this.hashFunc(value)
        while (this.table[key] !== undefined && this.table[key] !== value) {
            key++
            if (key >= this.table.length) {
                return undefined
            }
        }
        return this.table[key]
    }

    // 删除数据
    delete(value) {
        let key = this.hashFunc(value)
        while (this.table[key] !== undefined && this.table[key] !== value) {
            key++
            if (key >= this.table.length) {
                return false
            }
        }
        this.table[key] = undefined
        this.size--
        return true

    }

    // 判断哈希表中是否存在该值
    has(value) {
        let key = this.hashFunc(value)
        while (this.table[key] !== undefined && this.table[key] !== value) {
            key++
            if (key >= this.table.length) {
                return false
            }
        }
        if (this.table[key] !== undefined) {
            return true
        } else {
            return false
        }
    }

    // 展示存储到哈希表中的所有数据
    showAllData() {
        let result = []
        for (let item of this.table) {
            if (item !== undefined) {
                result.push(item)
            }
        }
        return result
    }
}