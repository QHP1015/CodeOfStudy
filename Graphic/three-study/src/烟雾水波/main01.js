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
  uTime: 0,
  uLowColor: "#ff0000",
  uHightColor: "#ffff00",
  uXspeed: 1,
  uZspeed: 1,
  uNoiseSpeed: 1,
  uOpactity: 1,
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
    uTime: {
      value: params.uTime,
    },
    uLowColor: {
      value: new THREE.Color(params.uLowColor),
    },
    uHightColor: {
      value: new THREE.Color(params.uHightColor),
    },
    uXspeed: {
      value: params.uXspeed,
    },
    uZspeed: {
      value: params.uZspeed,
    },
    uNoiseSpeed: {
      value: params.uNoiseSpeed,
    },
    uOpacity: {
      value: params.uOpacity,
    },
  },
  transparent: true,
});

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1024, 1024), shaderMaterial);
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
controls.dampingFactor = 0.05;

const clock = new THREE.Clock();
function animate(t) {
  const elapsedTime = clock.getElapsedTime();
  shaderMaterial.uniforms.uTime.value = elapsedTime;
  requestAnimationFrame(animate);
  controls.update();
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
gui
  .add(params, "uXspeed")
  .min(0)
  .max(5)
  .step(0.001)
  .onChange(value => {
    shaderMaterial.uniforms.uXspeed.value = value;
  });
gui
  .add(params, "uZspeed")
  .min(0)
  .max(5)
  .step(0.001)
  .onChange(value => {
    shaderMaterial.uniforms.uZspeed.value = value;
  });
gui
  .add(params, "uNoiseSpeed")
  .min(0)
  .max(5)
  .step(0.001)
  .onChange(value => {
    shaderMaterial.uniforms.uNoiseSpeed.value = value;
  });
gui
  .add(params, "uOpactity")
  .min(0)
  .max(1)
  .step(0.01)
  .onChange(value => {
    shaderMaterial.uniforms.uOpactity.value = value;
  });
gui.addColor(params, "uLowColor").onFinishChange(value => {
  shaderMaterial.uniforms.uLowColor.value = new THREE.Color(value);
});
gui.addColor(params, "uHightColor").onFinishChange(value => {
  shaderMaterial.uniforms.uHightColor.value = new THREE.Color(value);
});
