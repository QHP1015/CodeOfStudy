import * as THREE from "THREE";
import startPointVertex from "../shaders/startpoint/vertex.glsl";
import startPointFragment from "../shaders/startpoint/fragment.glsl";
import fireworksVertex from "../shaders/fireworks/vertex.glsl";
import fireworksFragment from "../shaders/fireworks/fragment.glsl";

export default class Fireworks {
  constructor(color, to, from = { x: 0, y: 0, z: 0 }) {
    this.color = new THREE.Color(color);
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
      uniforms: {
        uTime: {
          value: 0,
        },
        uSize: {
          value: 20,
        },
        uColor: {
          value: this.color,
        },
      },
    });

    // create firework point
    this.startPoint = new THREE.Points(this.startGeometry, this.startMaterial);

    // start timing
    this.clock = new THREE.Clock();

    // Create explosive fireworks
    this.fireworkGeometry = new THREE.BufferGeometry();
    this.fireworksCount = 180 + Math.floor(Math.random() * 180);
    const positionFireworksArray = new Float32Array(this.fireworksCount * 3);
    const directionArray = new Float32Array(this.fireworksCount * 3);
    const scaleFireArray = new Float32Array(this.fireworksCount);
    for (let i = 0; i < this.fireworksCount; i++) {
      // initial position
      positionFireworksArray[i * 3 + 0] = to.x;
      positionFireworksArray[i * 3 + 1] = to.y;
      positionFireworksArray[i * 3 + 2] = to.z;
      // initial size
      scaleFireArray[i] = Math.random();
      // Set the angle of emission around
      let theta = Math.random() * 2 * Math.PI;
      let beta = Math.random() * 2 * Math.PI;
      let r = Math.random();

      directionArray[i * 3 + 0] = r * Math.sin(theta) + r * Math.sin(beta);
      directionArray[i * 3 + 1] = r * Math.cos(theta) + r * Math.cos(beta);
      directionArray[i * 3 + 2] = r * Math.sin(theta) + r * Math.cos(beta);
    }

    this.fireworkGeometry.setAttribute("position", new THREE.BufferAttribute(positionFireworksArray, 3));
    this.fireworkGeometry.setAttribute("aScale", new THREE.BufferAttribute(scaleFireArray, 1));
    this.fireworkGeometry.setAttribute("aRandom", new THREE.BufferAttribute(directionArray, 3));
    this.fireworksMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: {
          value: 0,
        },
        uSize: {
          value: 0,
        },
        uColor: {
          value: this.color,
        },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexShader: fireworksVertex,
      fragmentShader: fireworksFragment,
    });

    this.fireworks = new THREE.Points(this.fireworkGeometry, this.fireworksMaterial);

     // audio
     this.linstener = new THREE.AudioListener();
     this.linstener1 = new THREE.AudioListener();
     this.sound = new THREE.Audio(this.linstener);
     this.sendSound = new THREE.Audio(this.linstener1);
 
     const audioLoader = new THREE.AudioLoader();
     audioLoader.load(
       `./assets/audio/pow${Math.floor(Math.random() * 4) + 1}.ogg`,
       (buffer) => {
         this.sound.setBuffer(buffer);
         this.sound.setLoop(false);
         this.sound.setVolume(1);
       }
     );
 
     audioLoader.load(`./assets/audio/send.mp3`, (buffer) => {
       this.sendSound.setBuffer(buffer);
       this.sendSound.setLoop(false);
       this.sendSound.setVolume(1);
     });
  }

  addScene(scene, camera) {
    scene.add(this.startPoint);
    scene.add(this.fireworks);
    this.scene = scene;
  }

  // update variable
  update() {
    const elapsedTime = this.clock.getElapsedTime();
    if (elapsedTime > 0.2 && elapsedTime < 1) {
      if (!this.sendSound.isPlaying && !this.sendSoundplay) {
        this.sendSound.play();
        this.sendSoundplay = true;
      }
      this.startMaterial.uniforms.uTime.value = elapsedTime;
      this.startMaterial.uniforms.uSize.value = 20;
    } else if (elapsedTime > 0.2) {
      const time = elapsedTime - 1;

      // clear point
      this.startMaterial.uniforms.uSize.value = 0;
      this.startPoint.clear();
      this.startGeometry.dispose();
      this.startMaterial.dispose();
      if (!this.sound.isPlaying && !this.play) {
        this.sound.play();
        this.play = true;
      }
      // display fireworks
      this.fireworksMaterial.uniforms.uSize.value = 20;
      this.fireworksMaterial.uniforms.uTime.value = time;

      if (time > 5) {
        this.fireworksMaterial.uniforms.uSize.value = 0;
        this.fireworks.clear();
        this.fireworkGeometry.dispose();
        this.fireworksMaterial.dispose();
        this.scene.remove(this.fireworks);
        this.scene.remove(this.startPoint);
        return "remove";
      }
    }
  }
}
