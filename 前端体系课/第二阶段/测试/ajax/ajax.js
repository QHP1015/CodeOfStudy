// 默认参数
import DEFAULTS from "./defaults.js";
// 工具函数
import { serialize, serializeJSON, addURLData } from "./utils.js";
// 常量
import { HTTP_GET, CONTENT_TYPE_FORM_URLENCODED, CONTENT_TYPE_JSON } from "./constants.js";

// Ajax class
export default class Ajax {
  constructor(url, options) {
    this.url = url;
    this.options = Object.assign({}, DEFAULTS, options);

    // 初始化
    this.init();
  }

  // 初始化
  init() {
    const xhr = new XMLHttpRequest();

    this.xhr = xhr;
    this.bindEvents();

    xhr.open(this.options.method, this.url + this.addParam(), true);

    // 设置 responseType
    this.setResponseType();

    // 设置超时
    this.setTimeout();

    // 设置跨域是否携带 cookie
    this.setCookie();

    // 发送请求
    this.sendData();
  }

  // 绑定响应事件处理程序
  bindEvents() {
    const xhr = this.xhr;

    const { success, httpCodeError, error, abort, timeout } = this.options;

    // load
    xhr.addEventListener(
      "load",
      () => {
        if (this.ok()) {
          success(xhr.response, xhr);
        } else {
          httpCodeError(xhr.status, xhr);
        }
      },
      false
    );

    // error
    // 当请求遇到错误时，将触发 error 事件
    xhr.addEventListener(
      "error",
      () => {
        error(xhr);
      },
      false
    );

    // abort
    xhr.addEventListener(
      "abort",
      () => {
        abort(xhr);
      },
      false
    );

    // timeout
    xhr.addEventListener(
      "timeout",
      () => {
        timeout(xhr);
      },
      false
    );
  }

  // 检测相应的HTTP状态码是否正常
  ok() {
    const xhr = this.xhr;
    return (xhr.status >= 200) & (xhr.status < 300) || xhr.status === 304;
  }

  // 在url上添加数据
  addParam() {
    const { params } = this.options;

    if (!params) return "";

    // if (typeof params !== Object) {
    //   throw new Error("params is not a object");
    // }

    return addURLData(this.url, serialize(params));
  }

  // 设置 responseType
  setResponseType() {
    this.xhr.responseType = this.options.responseType;
  }

  // 设置超时
  setTimeout() {
    const { timeoutTime } = this.options;

    if (timeoutTime > 0) {
      this.xhr.timeout = timeoutTime;
    }
  }

  // 设置跨域是否携带 cookie
  setCookie() {
    if (this.options.withCredentials) {
      this.xhr.withCredentials = true;
    }
  }

  // 发送请求
  sendData() {
    const xhr = this.xhr;

    if (!this.isSendData()) {
      return xhr.send(null);
    }

    let resultData = null;
    const { data } = this.options;

    // 发送 FormData 格式的数据
    if (this.isFormData()) {
      resultData = data;
    }
    // 发送 application/x-www-form-urlencoded 格式的数据
    else if (this.isFormURLEncodedData()) {
      this.setContentType();
      resultData = serialize(data);
    }
    // 发送 application/json 格式的数据
    else if (this.isJSONData()) {
      this.setContentType();
      resultData = serializeJSON(data);
    }
    // 发送其他格式的数据
    else {
      this.setContentType();
      resultData = data;
    }

    xhr.send(resultData);
  }

  // 是否需要使用 send 发送数据
  isSendData() {
    const { data, method } = this.options;

    if (!data) return false;

    if (method.toLowerCase() === HTTP_GET.toLowerCase()) return false;

    return true;
  }

  // 是否发送 FormData 格式的数据
  isFormData() {
    // FormData 是通过 new 生成的，判断是不是 FormData 的实例就可以判断是不是发送 FormData 格式数据
    return this.options.data instanceof FormData;
  }

  // 是否发送 application/x-www-form-urlencoded 格式的数据
  isFormURLEncodedData() {
    return this.options.contentType.toLowerCase().includes(CONTENT_TYPE_FORM_URLENCODED);
  }

  // 是否发送 application/json 格式的数据
  isJSONData() {
    return this.options.contentType.toLowerCase().includes(CONTENT_TYPE_JSON);
  }

  // 设置 Content-Type
  setContentType(contentType = this.options.contentType) {
    if (!contentType) return;

    this.xhr.setRequestHeader("Content-Type", contentType);
  }

  // 获取 XHR 对象
  getXHR() {
    return this.xhr;
  }
}
