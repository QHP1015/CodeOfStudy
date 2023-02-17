import * as THREE from "three";
import Fireworks from "./firework";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "../shaders/flylight/vertex.glsl";
import fragmentShader from "../shaders/flylight/fragment.glsl";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// 导入水模块
import { Water } from "three/examples/jsm/objects/Water2";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerHeight / window.innerWidth, 0.1, 1000);
camera.position.set(0, 0, 20);
camera.aspect = window.innerHeight / window.innerHeight;
camera.updateProjectionMatrix();
scene.add(camera);

// const light = new THREE.AmbientLight(0xffffff, 1);
// const moon = new THREE.AmbientLight(0xffffff, 1);
// scene.add(light);

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// 创建纹理加载器对象
const rgbeLoader = new RGBELoader();
rgbeLoader.loadAsync("./assets/2k.hdr").then(texture => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});

// 创建着色器材质;
const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {},
  side: THREE.DoubleSide,
  //   transparent: true,
});

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.1;

const gltfLoader = new GLTFLoader();
let LightBox = null;
gltfLoader.load("./assets/model/newyears_min.glb", gltf => {
  console.log(gltf);
  scene.add(gltf.scene);

  // 创建水面
  const waterGeometry = new THREE.PlaneBufferGeometry(100, 100);
  let water = new Water(waterGeometry, {
    scale: 4,
    textureHeight: 1024,
    textureWidth: 1024,
  });
  water.position.y = 1;
  water.rotation.x = -Math.PI / 2;
  scene.add(water);
});
gltfLoader.load("./assets/model/flyLight.glb", gltf => {
  LightBox = gltf.scene.children[0];
  LightBox.material = shaderMaterial;

  for (let i = 0; i < 150; i++) {
    let flyLight = gltf.scene.clone(true);
    let x = (Math.random() - 0.5) * 300;
    let z = (Math.random() - 0.5) * 300;
    let y = Math.random() * 60 + 5;
    flyLight.position.set(x, y, z);
    scene.add(flyLight);
  }
});

renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// firework array
let fireworks = [];

// a function of creating Firework
// function createFirework() {
//   // Randomly generate colors and positions for fireworks
//   let color = `hsl(${Math.floor(Math.random() * 360)},100%,80%)`;
//   let position = {
//     x: (Math.random() - 0.5) * 40,
//     z: (Math.random() - 0.5) * 40,
//     y: 7 + Math.random() * 25,
//   };
//   let firework = new Fireworks(color, position);
//   firework.addScene(scene, camera);
//   fireworks.push(firework);
// }

// add click event on window
window.addEventListener("click", () => {
  // Randomly generate colors and positions for fireworks
  let color = `hsl(${Math.floor(Math.random() * 360)},100%,80%)`;
  let position = {
    x: (Math.random() - 0.5) * 40,
    z: (Math.random() - 0.5) * 40,
    y: 3 + Math.random() * 15,
  };
  let firework = new Fireworks(color, position);
  firework.addScene(scene, camera);
  fireworks.push(firework);
});

function animate(t) {
  controls.update();
  // const elapsedTime = clock.getElapsedTime();
  //   console.log(fireworks);
  fireworks.forEach((item, i) => {
    const type = item.update();
    if (type == "remove") {
      fireworks.splice(i, 1);
    }
  });

  requestAnimationFrame(animate);
  // 使用渲染器渲染相机看这个场景的内容渲染出来
  renderer.render(scene, camera);

}

animate();
