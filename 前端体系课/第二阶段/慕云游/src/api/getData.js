import { SUCC_CODE, TIMEOUT } from "./config";
import { getJSON } from "./ajax";

// 获取数据
const getData = (url, options) => {
  return getJSON(url, {
    timeoutTime: TIMEOUT,
    ...options,
  })
    .then(response => {
      if (response.code !== SUCC_CODE) throw new Error(`出错了：${response.code}`);

      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

// 延时
const delay = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

// 获取延迟的数据
const getDelayedData = (url, options) => {
  return delay(1000).then(() => {
    return getData(url, options);
  });
};

export { getData, getDelayedData };
