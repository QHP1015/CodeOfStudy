class jQuery {
  constructor(sellector) {
    const result = document.querySelectorAll(sellector);
    const length = result.length;
    for (let i = 0; i < length; i++) {
      this[i] = result[i];
    }
    this.length = length;
    this.sellector = sellector;
  }

  get(index) {
    return this[index];
  }

  each(fn) {
    for (let i = 0; i < this.length; i++) {
      const elem = this[i];
      fn(elem);
    }
  }

  on(type, fn) {
    return this.each(elem => {
      elem.addEventListener(type, fn, false);
    });
  }
}

jQuery.prototype.dialog = function (info) {
  alert(info);
};
