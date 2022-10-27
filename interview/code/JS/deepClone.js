function deepClone(obj) {
  if (typeof obj !== "object" || typeof obj == null) {
    return obj;
  }

  let result;

  if (Array.isArray(obj)) {
    result = [];
  } else {
    result = {};
  }

  for (let key in obj) {
    result[key] = deepClone(obj[key])
  }
  return result;
}



    console.log(1 < undefined);