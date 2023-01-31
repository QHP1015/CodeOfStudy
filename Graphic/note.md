## Three.js基本使用

### 搭建基本Three.js场景

1. 创建场景

   ```js
   const scene = new THREE.Scene();
   ```

2. 创建相机

   ```js
   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
   
   camera.position.set(0, 0, 10);
   scene.add(camera);
   ```

   **透视相机：PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )**

   - fov： 摄像机视锥体垂直视野角度
   - aspect：摄像机视锥体长宽比
   - near：摄像机视锥体近端面
   - far：摄像机视锥体远端面

3. 创建物体

   ```js
   // 几何体
   const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
   // 材质
   const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
   // 根据几何体和材质创建物体
   const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
   scene.add(cube);
   ```

   Geometry：几何体

   Material：材质

   Mesh：物体

4. 初始化渲染器

   ```js
   const renderer = new THREE.WebGL1Renderer();
   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement);
   ```

5. 创建轨道控制器

   ```js
   const controls = new OrbitControls(camera, renderer.domElement);
   ```

6. 添加坐标轴辅助器（可选）

   ```js
   const axesHelper = new THREE.AxesHelper(5);
   scene.add(axesHelper);
   ```

7. 渲染场景

   ```js
   // 使用渲染器，通过相机将场景渲染进来
   // renderer.render(scene, camera);
   
   // 根据帧率渲染
   function render() {
     renderer.render(scene, camera);
     requestAnimationFrame(render);
   }
   
   render();
   ```

8. 监听画面变化，更新渲染画面（可选）

   ```js
   window.addEventListener("resize", () => {
     camera.aspect = window.innerWidth / window.innerHeight;
     // 更新摄像机的投影矩阵
     camera.updateProjectionMatrix();
   
     // 更新渲染器
     renderer.setSize(window.innerWidth, window.innerHeight);
     renderer.setPixelRatio(window.devicePixelRatio);
   });
   ```



### 使用Gsap动画库

1. 导入[Gsap](https://greensock.com/get-started/)动画库

   ```js
   import gsap from "gsap";
   ```

2. 设置动画

   ```js
   gsap.to(cube.position, {
     x: 5,
     duration: 5,
     ease: "power1.inOut",
     repeat: -1,
     yoyo: true,
     delay: 2,
     onComplete: () => {
       console.log("done");
     },
     onStart: () => {
       console.log("start");
     },
   });
   ```

   - gsap.to()：gsap方法
   - cube.position：需要修改的属性
   - duration：持续时间
   - ease：动画速度
   - repeat：重复次数，-1表示无限次
   - yoyo：是否循环，若从左到右，再从右回到左边
   - onComplete：完成时回调
   - onStart：开始时回调



### 使用dat.gui

1. 导入[dat.gui](https://github.com/dataarts/dat.gui/blob/master/API.md)

   ```js
   import * as dat from "dat.gui";
   ```

2. 添加GUI

   ```js
   const gui = new dat.GUI();
   gui
     .add(cube.position, "y")
     .min(0)
     .max(5)
     .step(0.01)
     .name("move y")
     .onFinishChange(value => {
       console.log("the value when finished:", value);
     });
   ```

   - add：添加属性
   - min：最小值
   - max：最大值
   - step：步长
   - name：显示的名字



### 几何体

创建几何体

```js
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  -1.0, -1.0, 1.0,
  1.0, -1.0, 1.0,
  1.0, 1.0, 1.0,

  1.0, 1.0, 1.0,
  -1.0, 1.0, 1.0,
  -1.0, -1.0, 1.0
]);

// 每个顶点是一个三元组
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
```

#### 属性

- attributes：几何体属性，可用于shader中
- 

#### 方法

- setAttribute(name: String, attribute: BufferAttribute)：设置attribute属性
- getAttribute(name: String)：返回指定名称的attribute
