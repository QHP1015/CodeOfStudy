function unique(arr) {
  return arr.filter((item, index, arr) => {
    return arr.indexOf(item, 0) === index;
  });
}

function unique2(arr) {
  return [...new Set(arr)];
}

let arr = [1, 2, 3, 2, 4, 5, 5];
console.log(unique2(arr));
