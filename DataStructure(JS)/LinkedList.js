// class Node {
// 	constructor (value) {
//     	this.value = value
//     	this.next = null
// 	}
// }

// class LinkedList {
// 	constructor () {
//     	this.head = null
//     	this.tail = this.head
//    		this.length = 0
// 	}
  
//     // 在末尾添加节点
//   	append (value) {
// 		const newNode = new Node(value)
// 		if (!this.head) {
// 			this.head = newNode
// 			this.tail = newNode
// 		} else {
// 			this.tail.next = newNode
// 			this.tail = newNode
// 		}
// 		this.length++
// 	}

//     // 在开头添加节点
// 	prepend (value) {
// 		const node = new Node(value)
// 		node.next = this.head
// 		this.head = node
// 		this.length++
//     }

//     // 在特定索引处添加值
// 	insert (value, index) {
//         if (index >= this.length) {
// 			this.append(value)
// 		}
//         const node = new Node(value)
//         const { prevNode, nextNode } = this.getPrevNextNodes(index)
//         prevNode.next = node
//         node.next = nextNode
//         this.length++
//     }

//   lookup (index) {

//   }

//   remove (index) {

//   }

//   reverse () {
    
//   }
// }

// 封装链表的构造函数
function LinkedList() {
    // 封装一个Node类, 用于保存每个节点信息
    function Node(element) {
        this.element = element
        this.next = null
    }

    // 链表中的属性
    this.length = 0  // 链表的长度
    this.head = null // 链表的第一个节点
    
    // 链表中的方法
}

// 链表尾部追加元素方法
LinkedList.prototype.append = function (element) {
    // 1.根据新元素创建节点
    var newNode = new Node(element)

    // 2.判断原来链表是否为空
    if (this.head === null) { // 链表尾空
        this.head = newNode
    } else { // 链表不为空
        // 2.1.定义变量, 保存当前找到的节点
        var current = this.head
        while (current.next) {
            current = current.next
        }

        // 2.2.找到最后一项, 将其next赋值为node
        current.next = newNode
    }

    // 3.链表长度增加1
    this.length++
}





const linkedList1 = new LinkedList()
linkedList1.append(2)
linkedList1.append(3)
linkedList1.append(4)
console.log(linkedList1)
