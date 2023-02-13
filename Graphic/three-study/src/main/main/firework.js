import * as THREE from "THREE";
import startPointVertex from "../shaders/vertex.glsl";
import startPointFragment from "../shaders/fragment.glsl";

export default class Fireworks {
  constructor(color, to, from = { x: 0, y: 0, z: 0 }) {
    console.log("color", color, "to", to);
    // create points of firework launch
    this.startGeometry = new THREE.BufferGeometry();
    const startPositionArray = new Float32Array(3);
    startPositionArray[0] = from.x;
    startPositionArray[1] = from.y;
    startPositionArray[2] = from.z;
    this.startGeometry.setAttribute("position", new THREE.BufferAttribute(startPositionArray, 3));

    const astepArray = new Float32Array(3);
    astepArray[0] = to.x - from.x;
    astepArray[1] = to.y - from.y;
    astepArray[2] = to.z - from.z;
    this.startGeometry.setAttribute("aStep", new THREE.BufferAttribute(astepArray, 3));

    // shader material
    this.startMaterial = new THREE.ShaderMaterial({
      vertexShader: startPointVertex,
      fragmentShader: startPointFragment,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // create firework point
    this.startPoint = new THREE.Points(this.startGeometry, this.startMaterial);
  }

  addScene(scene, camera) {
    scene.add(this.startPoint);
    this.scene = scene;
  }
}
