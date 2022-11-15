// map 函数实践
let words = ["abc", "cb", "mba", "dna"]

// 在words中所有的元素后面拼接-abc
let newWords = words.map(function (word) {
    return word + "-abc"
})
console.log(newWords)

