import * as THREE from "three";
import gsap from "gsap";
import * as dat from "dat.gui";
import { updateCamera } from "./util";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Water } from "three/examples/jsm/objects/Water2";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const gui = new dat.GUI();
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerHeight / window.innerWidth, 0.1, 1000);
camera.position.set(0, 5, 5);
updateCamera(camera);

scene.add(camera);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// const water = new Water(new THREE.PlaneGeometry(1, 1, 1024, 1024), {
//   color: "#ffffff",
//   scale: 1,
//   flowDirection: new THREE.Vector2(1, 1),
//   textureHeight: 1024,
//   textureWidth: 1024,
// });
// water.rotation.x = -Math.PI / 2;
// scene.add(water);

const rgbeLoader = new RGBELoader();
rgbeLoader.loadAsync("./assets/050.hdr").then(texture => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});

const gltfLoader = new GLTFLoader();
gltfLoader.load("./assets/model/yugang.glb", gltf => {
  const yugang = gltf.scene.children[0];
  yugang.material.side = THREE.DoubleSide;

  const waterGeometry = gltf.scene.children[1].geometry;
  const water = new Water(waterGeometry, {
    color: "#ffffff",
    scale: 1,
    flowDirection: new THREE.Vector2(1, 1),
    textureHeight: 1024,
    textureWidth: 1024,
  });
  scene.add(water);
  scene.add(gltf.scene);
});

const light = new THREE.AmbientLight(0xffffff); // soft white light
light.intensity = 10;
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

const renderer = new THREE.WebGL1Renderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", () => {
  updateCamera(camera);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const clock = new THREE.Clock();
function animate(t) {
  const elapsedTime = clock.getElapsedTime();
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
