import * as THREE from "three";
import gsap from "gsap";
import * as dat from "dat.gui";
import vertexShader from "./shaders/water/vertex.glsl";
import fragmentShader from "./shaders/water/fragment.glsl";
import { updateCamera } from "./util";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const gui = new dat.GUI();
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerHeight / window.innerWidth, 0.1, 1000);
camera.position.set(0, 0, 2);
updateCamera(camera);

scene.add(camera);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 512, 512), shaderMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

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

const clock = new THREE.Clock();
function animate(t) {
  const elapsedTime = clock.getElapsedTime();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
