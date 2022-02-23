class Node {
	constructor (value) {
    	this.value = value
    	this.next = null
	}
}

class LinkedList {
	constructor () {
    	this.head = null
    	this.tail = this.head
   		this.length = 0
	}
  
    // 在末尾添加节点
  	append (value) {
		const newNode = new Node(value)
		if (!this.head) {
			this.head = newNode
			this.tail = newNode
		} else {
			this.tail.next = newNode
			this.tail = newNode
		}
		this.length++
	}

    // 在开头添加节点
	prepend (value) {
		const node = new Node(value)
		node.next = this.head
		this.head = node
		this.length++
    }

    // 在特定索引处添加值
	insert (value, index) {
        if (index >= this.length) {
			this.append(value)
		}
        const node = new Node(value)
        const { prevNode, nextNode } = this.getPrevNextNodes(index)
        prevNode.next = node
        node.next = nextNode
        this.length++
    }

  lookup (index) {

  }

  remove (index) {

  }

  reverse () {
    
  }
}





const linkedList1 = new LinkedList()
linkedList1.append(2)
linkedList1.append(3)
linkedList1.append(4)
console.log(linkedList1)
