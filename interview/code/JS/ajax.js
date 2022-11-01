function ajax(url, method, data) {
  const p = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else if (xhr.status === 404) {
        reject(new Error("404 not found"));
      }
    };
    xhr.send(data ? JSON.stringify(data) : null);
  });
  return p;
}
