const url =
  "https://fliggy.com/demo?name=feizhu&from=home&job=frontend&extraInfo=%7B%22a%22%3A%22b%22%2C%22c%22%3A%22d%22%7D&test=[1,2,3,4]";
const paramsString = url.split("?")[1];
const searchParams = new URLSearchParams(paramsString);
const result = {};

for (let [key, value] of searchParams) {
  if (value.substring(0, 1) !== "{" && value.substring(0, 1) !== "[") {
    result[key] = value;
  } else {
    result[key] = JSON.parse(value);
  }
}

console.log(result);
