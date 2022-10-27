Function.prototype.myBind = function (context, ...args1) {
  return (...args2) => {
    const fn = Symbol();
    context[fn] = this;
    const result = context[fn](...args1, ...args2);
    delete context[fn];
    return result;
  };
};

function fn1(...args) {
  console.log(...args);
}

const aaa = { a: 123 };
const fn2 = fn1.myBind(aaa, 100, 200, 300);

// aaa.fn();
fn2(1, 2, 3);
