import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

const gui = new dat.GUI();
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerHeight / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
scene.add(camera);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

let basicMaterial = new THREE.MeshBasicMaterial({
  color: "#00ff00",
  side: THREE.DoubleSide,
});
basicMaterial.onBeforeCompile = (shader,renderer)=>{
    console.log(shader);
    console.log(shader.vertexShader);
    console.log(shader.fragmentShader);
}

let standardMaterial = new THREE.MeshStandardMaterial({
  color: "#ffff00",
});

const floor = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 64, 64), basicMaterial);
scene.add(floor);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const renderer = new THREE.WebGLRenderer({ alpha: true });
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

const clock = new THREE.Clock();
function animate(t) {
  const elapsedTime = clock.getElapsedTime();

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
