import * as THREE from "three";
import Fireworks from "./firework";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerHeight / window.innerWidth, 0.1, 1000);
camera.position.set(0, 0, 20);
camera.aspect = window.innerHeight / window.innerHeight;
camera.updateProjectionMatrix();
scene.add(camera);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.1;
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

function animate(t) {
  //   controls.update();
  // const elapsedTime = clock.getElapsedTime();
  requestAnimationFrame(animate);
  // 使用渲染器渲染相机看这个场景的内容渲染出来
  renderer.render(scene, camera);
}

animate();

// firework array
let fireworks = [];
// a function of creating Firework
function createFirework() {
  // Randomly generate colors and positions for fireworks
  let color = `hsl(${Math.floor(Math.random() * 360)},100%,80%)`;
  let position = {
    x: (Math.random() - 0.5) * 40,
    z: (Math.random() - 0.5) * 40,
    y: 7 + Math.random() * 25,
  };
  let firework = new Fireworks(color, position);
  firework.addScene(scene, camera);
  fireworks.push(firework);
}

window.addEventListener("click", createFirework);
