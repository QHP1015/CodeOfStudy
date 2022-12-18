## 浏览器进程与线程

- Browser进程

  - 主进程，only one
  - 负责浏览器界面显示，与用户交互
  - 负责各个页面的管理，创建和销毁其他进程
  - 将渲染进程得到的在内存中的Bitmap绘制到界面
  - 网络资源管理，下载

- GPU进程

  - 3D绘制
  - translation和animation开启GPU加速

- 渲染（Render）进程，默认每个Tab页为一个渲染进程，包含多个线程

  - GUI渲染线程
    - 渲染浏览器界面，解析HTML、CSS、构建DOM树和RenderObject树，布局和绘制等
    - 需要重绘回回流时，执行此线程
    - 与JS引擎线程互斥，JS引擎执行时，GUI更新保存在队列中等JS引擎空闲时立即执行
  - JS引擎线程
    - JS内核，处理JavaScript脚本程序
    - 解析、运行JavaScript脚本
    - 等待任务队列中任务到来，然后处理
    - 一个Tab页只有一个JS线程
    - 若JS执行过长，会导致页面渲染加载阻塞
  - 事件触发线程
    - 控制事件循环（Event Loop）
    - 当JS引擎执行如Ajax异步请求代码，会将对应任务添加到事件线程
    - 对应事件符合触发条件时，该线程将事件添加到待处理队列队尾，等待JS引擎处理
  - 定时器触发线程
    - setTimeout和setInterval所在线程
    - 定时计数器不由JS引擎执行——若JS引擎处于阻塞线程状态会影响记时准确性
    - 单独线程记时并触发定时，记时完毕添加到事件队列
    - W3C规定setTimeout低于4ms延时默认为4ms
  - 异步http请求线程
    - XMLHttpRequest连接后新开线程
    - 检测到状态变更，若设置回调函数，异步线程产生状态变更事件，将回调放入事件队列，等待JS引擎空闲执行

  