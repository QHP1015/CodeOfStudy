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

const params = {
  uWaresFrequency: 14,
  uScale: 0.03,
  uXzScale: 1.5,
  uNoiseFrequency: 10,
  uNoiseScale: 1.5,
  uTime:0,
  
};

const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uWaresFrequency: {
      value: params.uWaresFrequency,
    },
    uScale: {
      value: params.uScale,
    },
    uNoiseFrequency: {
      value: params.uNoiseFrequency,
    },
    uNoiseScale: {
      value: params.uNoiseScale,
    },
    uXzScale: {
      value: params.uXzScale,
    },
    uTime:{
        value:params.uTime,
    }
  },
  transparent: true,
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
  shaderMaterial.uniforms.uTime.value = elapsedTime;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

gui
  .add(params, "uWaresFrequency")
  .min(1)
  .max(100)
  .step(0.1)
  .onChange(value => {
    shaderMaterial.uniforms.uWaresFrequency.value = value;
  });
gui
  .add(params, "uScale")
  .min(0)
  .max(0.2)
  .step(0.001)
  .onChange(value => {
    shaderMaterial.uniforms.uScale.value = value;
  });
gui
  .add(params, "uNoiseFrequency")
  .min(1)
  .max(100)
  .step(0.1)
  .onChange(value => {
    shaderMaterial.uniforms.uNoiseFrequency.value = value;
  });
gui
  .add(params, "uNoiseScale")
  .min(0)
  .max(3)
  .step(0.001)
  .onChange(value => {
    shaderMaterial.uniforms.uNoiseScale.value = value;
  });
gui
  .add(params, "uXzScale")
  .min(0)
  .max(5)
  .step(0.1)
  .onChange(value => {
    shaderMaterial.uniforms.uXzScale.value = value;
  });
