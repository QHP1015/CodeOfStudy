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



### 几何体(Geometry)

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

#### 方法

- setAttribute(name: String, attribute: BufferAttribute)：设置attribute属性
- getAttribute(name: String)：返回指定名称的attribute



#### 类型

##### 立方缓冲几何体（BoxGeometry）

BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)

- width — X轴上面的宽度，默认值为1
- height — Y轴上面的高度，默认值为1
- depth — Z轴上面的深度，默认值为1
- widthSegments — （可选）宽度的分段数，默认值是1
- heightSegments — （可选）高度的分段数，默认值是1
- depthSegments — （可选）深度的分段数，默认值是1



##### 平面缓冲几何体（PlaneGeometry）

PlaneGeometry(width : Float, height : Float, widthSegments : Integer, heightSegments : Integer)

- width — 平面沿着X轴的宽度。默认值是1
- height — 平面沿着Y轴的高度。默认值是1
- widthSegments — （可选）平面的宽度分段数，默认值是1
- heightSegments — （可选）平面的高度分段数，默认值是1



创建平面

```js
// 添加平面
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const plane = new THREE.Mesh(planeGeometry, basicMaterial);
plane.position.set(3, 0, 1);
planeGeometry.setAttribute("uv2", new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2));

scene.add(plane);
```



### 材质(Material)

材质可以使用Three.js自带的材质类型，也可以使用Shader自己写材质

#### 属性

- alphaTest：设置运行alphaTest时要使用的alpha值。如果不透明度低于此值，则不会渲染材质。默认值为**0**

- opacity：透明度

- shadowSide：定义投影的面

  | Material.side    | Side casting shadows |
  | :--------------- | :------------------- |
  | THREE.FrontSide  | 背面                 |
  | THREE.BackSide   | 前面                 |
  | THREE.DoubleSide | 双面                 |

- side：定义将要渲染哪一面 - 正面，背面或两者。 默认为 THREE.FrontSide。其他选项有 THREE.BackSide和 THREE.DoubleSide

- transparent：定义此材质是否透明，设置为true时，通过设置材质的opacity属性来控制材质透明的程度，默认值为**false**

  > 透明对象需要特殊处理，并在非透明对象之后渲染

  

#### 类型

##### 基础网格材质(MeshBasicMaterial)

```js
const material = new THREE.MeshBasicMaterial({
  // 属性，包含从Material继承的属性
  parameters:Object
});
```

> 不受光照影响

###### 属性

- alphaMap：灰度纹理，控制整个表面的不透明度
- aoMap：环境遮挡贴图，默认值为null
- color：材质颜色
- envMap：环境贴图
- lightMap：光照贴图
- map：颜色贴图
- reflectivity：环境贴图对表面的影响程度，默认值为1，有效范围介于0（无反射）和1（完全反射）之间
- wireframe：将几何体渲染为线框



##### 标准网格材质(MeshStandardMaterial)

基于物理的渲染（PBR），受光照影响

###### 属性

- alphaMap：灰度纹理，控制整个表面的不透明度
- aoMap：环境遮挡贴图，默认值为null
- bumpMap：凹凸贴图，映射与光照相关的感知深度
- color：材质颜色
- envMap：环境贴图
- lightMap：光照贴图
- map：颜色贴图
- metalness：金属度
- normalMap：法线贴图
- roughness：粗糙度，0.0表示平滑的镜面反射，1.0表示完全漫反射。默认值为1.0。如果还提供roughnessMap，则两个值相乘
- wireframe：将几何体渲染为线框



##### 着色器材质(ShaderMaterial)







### 纹理(Texture)

导入纹理

```js
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
```

#### 属性

- image：图片对象
- offset（Vector2）：纹理偏移
- rotation：纹理旋转
- center：旋转中心点
- minFilter：当一个纹素覆盖小于一个像素时，贴图如何采样
- magFilter：当一个纹素覆盖大于一个像素时，贴图如何采样









### 组(Group)

将多个物体绑定在一起

```js
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

const cubeA = new THREE.Mesh( geometry, material );
cubeA.position.set( 100, 100, 0 );

const cubeB = new THREE.Mesh( geometry, material );
cubeB.position.set( -100, -100, 0 );

//create a group and add the two cubes
//These cubes can now be rotated / scaled etc as a group
const group = new THREE.Group();
group.add( cubeA );
group.add( cubeB );

scene.add( group );
```



### 时钟(Clock)

Clock( autoStart : Boolean )：autoStart — (可选) 是否要在第一次调用 getDelta() 时自动开启时钟。默认值是 **true**

```js
const clock = new THREE.Clock();
```

#### 属性

- （startTime : Float）：存储时钟最后一次调用 start 方法的时间。默认值是 0
- （oldTime : Float）：存储时钟最后一次调用 start, .getElapsedTime() 或 .getDelta() 方法的时间。默认值是 0
- （elapsedTime : Float）：保存时钟运行的总时长。默认值是 0
- （running : Boolean）：判断时钟是否在运行。默认值是 false

#### 方法

- start ()：启动时钟，同时将 startTime 和 oldTime 设置为当前时间，设置 elapsedTime 为 0，并且设置 running 为 true
- stop ()：停止时钟，同时将 oldTime 设置为当前时间

- getElapsedTime ()：获取自时钟启动后的秒数，同时将 oldTime 设置为当前时间。如果 autoStart 设置为 true 且时钟并未运行，则该方法同时启动时钟

- getDelta ()：获取自 oldTime 设置后到当前的秒数。 同时将 oldTime 设置为当前时间。如果 autoStart 设置为 true 且时钟并未运行，则该方法同时启动时钟





### LoadingManager

