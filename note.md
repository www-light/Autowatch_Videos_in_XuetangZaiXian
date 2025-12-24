## The key to solve the problem
List the problems,enable everyone rectify the code according to other website
1. 不持有 video 引用，而是不断 querySelector，
发现新 `<video>` 就重新绑定事件
   + 这个平台（学堂在线 / xt）：`<video>` 会被销毁 + 重新创建。平台在“下一节 / 切换视频”时，
不是复用 video，而是 destroy → new video
   + JS 中的 video 对象不是稳定对象
   + 组件切换 / 下一节视频 ≠ video src 变化，而是整个 video DOM 换掉
2. 有些平台播放器是video，有的是iframe
3. 没有下一节按钮，只有左侧树状目录
   + 目录是折叠树结构，下一个视频可能处于折叠状态，要
4. 在反自动化平台，永远不要只信一个信号

