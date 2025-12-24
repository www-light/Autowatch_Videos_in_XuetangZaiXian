# 学堂在线自动刷课脚本

可用于学堂在线（https://www.xuetangx.com）自动刷课使用

## 功能特点

- ✅ 自动播放视频
- ✅ 自动调整播放速度（默认1.5倍速）
- ✅ 视频播放完成后自动切换到下一节
- ✅ 自动处理弹窗
- ✅ 可视化提示（页面右上角显示运行状态）

## 安装方法

### 1. 安装油猴（Tampermonkey）插件

根据你使用的浏览器，安装对应的Tampermonkey扩展：

- **Chrome**: [Chrome网上应用店](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Firefox**: [Firefox附加组件](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/)
- **Edge**: [Edge加载项](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
- **Safari**: [App Store](https://apps.apple.com/app/tampermonkey/id1482490089)

### 2. 安装脚本

1. 点击下载脚本文件：[xuetangx-auto-course.user.js](xuetangx-auto-course.user.js)
2. 或者在Tampermonkey中新建脚本，复制脚本内容并保存

**快速安装**：
- 直接点击原始脚本链接，Tampermonkey会自动识别并提示安装

### 3. 使用脚本

1. 打开学堂在线课程页面：https://www.xuetangx.com/learn/
2. 脚本会自动运行，页面右上角会显示"自动刷课已启动"的绿色提示
3. 脚本会自动播放视频，并在视频结束后切换到下一节

## 配置选项

可以在脚本中修改以下配置项（在脚本编辑器中修改）：

```javascript
const config = {
    autoPlay: true,           // 自动播放视频
    playbackRate: 1.5,        // 播放速度（1.0为正常速度）
    autoNext: true,           // 自动切换到下一节
    checkInterval: 3000,      // 检查间隔（毫秒）
};
```

### 配置说明

- `autoPlay`: 是否自动播放视频（true/false）
- `playbackRate`: 视频播放速度倍率（建议1.0-2.0之间）
- `autoNext`: 视频结束后是否自动切换到下一节（true/false）
- `checkInterval`: 脚本检查页面状态的时间间隔，单位毫秒

## 注意事项

⚠️ **重要提示**：

1. 本脚本仅供学习交流使用，请勿用于违反平台规则的行为
2. 使用脚本时，建议保持页面打开，不要切换到其他标签页
3. 建议不要将播放速度设置过快，以免影响学习效果
4. 部分课程可能有防刷机制，请合理使用
5. 如遇到问题，可以尝试刷新页面或重新启动脚本

## 故障排除

### 脚本不工作？

1. 检查Tampermonkey是否已启用
2. 检查脚本是否已启用（在Tampermonkey面板中查看）
3. 刷新页面重试
4. 检查浏览器控制台是否有错误信息（F12打开开发者工具）

### 视频无法自动播放？

1. 某些浏览器需要用户交互才能自动播放，请手动点击一次播放按钮
2. 检查配置中的`autoPlay`是否为true

### 无法自动切换到下一节？

1. 检查配置中的`autoNext`是否为true
2. 某些课程可能需要完成测验才能继续，此时无法自动切换

## 免责声明

本脚本仅供学习和研究使用。使用本脚本所产生的一切后果由使用者自行承担，作者不承担任何责任。请遵守学堂在线的用户协议和相关规定。

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进这个脚本！
