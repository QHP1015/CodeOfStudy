// 闭包隐藏数据，只提供API
function creatCache() {
  const data = {};
  return {
    set: function (key, val) {
      data[key] = val;
    },
    get: function (key) {
      return data[key];
    },
  };
}
