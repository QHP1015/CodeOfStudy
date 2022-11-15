function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

var reverseList = function (head) {
    let prev = null,
        curr = head
    while (curr) {
        const next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    }
    return prev
};

let a = ListNode(1,2)
// let b = ListNode(2)
// let c = ListNode(3)
// a.next = b
// b.next = c

console.log(reverseList(1))