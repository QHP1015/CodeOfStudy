import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
// 导入dat.gui
import * as dat from "dat.gui";

// 1.创建场景
const scene = new THREE.Scene();

// 2.创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 0, 10);
scene.add(camera);

// 3.添加物体
// 几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 修改物体位置
// cube.position.set(0, 0, 5);
cube.position.x = 0;
// 缩放
// cube.scale.set(3, 2, 1);
cube.scale.x = 1;
// 旋转
cube.rotation.set(Math.PI / 4, 0, 0);
scene.add(cube);

// 添加GUI
const gui = new dat.GUI();
gui
  .add(cube.position, "y")
  .min(0)
  .max(5)
  .step(0.01)
  .name("move y")
  // .onChange(value => {
  //   console.log("change value:", value);
  // })
  .onFinishChange(value => {
    console.log("the value when finished:", value);
  });

const animate = gsap.to(cube.position, {
  x: 5,
  duration: 5,
  ease: "power1.inOut",
  repeat: -1,
  yoyo: true,
});
const params = {
  color: "#ffff00",
  fn: () => {
    if (animate.isActive()) {
      animate.pause();
      console.log("stop");
    } else {
      animate.resume();
      console.log("animate");
    }
    // gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inOut" });
  },
  fn1: () => {},
};
gui.addColor(params, "color").onChange(value => {
  // console.log("change value:", value);
  cube.material.color.set(value);
});
gui.add(cube, "visible").name("isVisible");
let folder = gui.addFolder("cube setting");
folder.add(cube.material, "wireframe");
folder.add(params, "fn").name("animation");

// 4.初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置时钟
const clock = new THREE.Clock();

// 设置动画
// let animate1 = gsap.to(cube.position, {
//   x: 5,
//   duration: 5,
//   ease: "power1.inOut",
//   repeat: -1,
//   yoyo: true,
//   delay: 2,
//   onComplete: () => {
//     console.log("done");
//   },
//   onStart: () => {
//     console.log("start");
//   },
// });
// gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inOut" });

window.addEventListener("dblclick", () => {
  // 全屏
  const $fullScreen = document.fullscreenElement;
  !$fullScreen ? renderer.domElement.requestFullscreen() : document.exitFullscreen();
});

// 根据帧率渲染
function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});
