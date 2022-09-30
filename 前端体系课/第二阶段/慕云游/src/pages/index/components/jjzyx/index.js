import './jjzyx.css';

import render from './items.art';
import { URL } from './config';
import { getData } from 'api/getData';

const layoutEl = document.querySelector('.jjzyx .bd');

getData(URL).then(data => {
  //   console.log(data);
  //   {
  //     items: (5) [{url: "http}, {…}, {…}, {…}, {…}]
  //     more: {title: "机酒自由行产品", items: ["机票"](4)}
  //     one:{
  //     extra-info: "含机票酒店"
  //     title: "[樱花季]天津直飞东京/大阪/名古屋/冲绳/札幌2-30天往返"
  //     type: "机票"
  //     url: "http://al
  //   }
  //   }

  layoutEl.innerHTML = render(data);
});
