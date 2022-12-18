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

// 导入纹理
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
// const texture = textureLoader.load("./textures/minecraft.png");

const doorAplhaTexture = textureLoader.load("./textures/door/alpha.jpg");
// 环境贴图
const doorAoTexture = textureLoader.load("./textures/door/ambientOcclusion.jpg");
// 置换贴图
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");

// 设置纹理偏移
// doorColorTexture.offset.x = 0.5;

// 设置旋转原点
// doorColorTexture.center.set(0.5, 0.5);

// 设置纹理旋转
// doorColorTexture.rotation = Math.PI / 4;

// 设置纹理重复
// doorColorTexture.repeat.set(2, 3);
// doorColorTexture.wrapS = THREE.MirroredRepeatWrapping;
// doorColorTexture.wrapT = THREE.RepeatWrapping;

// 纹理显示设置
// texture.minFilter = THREE.NearestFilter;
// texture.magFilter = THREE.NearestFilter;
// texture.minFilter = THREE.LinearFilter;
// texture.magFilter = THREE.LinearFilter;

// 3.添加物体
// 几何体
const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 100, 100, 100);
const basicMaterial = new THREE.MeshStandardMaterial({
  color: "#ffff00",
  map: doorColorTexture,
  alphaMap: doorAplhaTexture,
  aoMap: doorAoTexture,
  // map: texture,
  transparent: true,
  // opacity: 0.5,
  // side: THREE.DoubleSide,
  displacementMap: doorHeightTexture,
  displacementScale: 0.05,
  roughness:1.0,
});

const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube);
cubeGeometry.setAttribute("uv2", new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2));

// 添加平面
const planeGeometry = new THREE.PlaneGeometry(1, 1, 200, 200);
const plane = new THREE.Mesh(planeGeometry, basicMaterial);
plane.position.set(1.5, 0, 0);
planeGeometry.setAttribute("uv2", new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2));

scene.add(plane);

// 灯光（环境光）
const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(light);

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

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