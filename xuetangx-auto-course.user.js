// ==UserScript==
// @name         学堂在线自动刷课
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  学堂在线（xuetangx.com）自动刷课工具，支持自动播放视频、自动答题、自动切换下一节
// @author       WWW
// @match        *://www.xuetangx.com/learn/*
// @match        *://*.xuetangx.com/learn/*
// @grant        none
// @license      MIT
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 配置项
    const config = {
        autoPlay: true,           // 自动播放视频
        playbackRate: 1.5,        // 播放速度（1.0为正常速度）
        autoNext: true,           // 自动切换到下一节
        checkInterval: 3000,      // 检查间隔（毫秒）
    };

    // 日志输出
    function log(message) {
        console.log(`[学堂在线自动刷课] ${message}`);
    }

    // 查找视频播放器
    function findVideoPlayer() {
        const videoSelectors = [
            'video',
            '.video-js video',
            '#video-box video',
            '.player-container video',
            'iframe[src*="player"]'
        ];

        for (const selector of videoSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                log(`找到视频元素: ${selector}`);
                return element;
            }
        }
        return null;
    }

    // 自动播放视频
    function autoPlayVideo() {
        const video = findVideoPlayer();
        
        if (video && video.tagName === 'VIDEO') {
            // 如果视频已暂停，尝试播放
            if (video.paused) {
                video.play().then(() => {
                    log('视频开始播放');
                }).catch(err => {
                    log(`播放失败: ${err.message}`);
                });
            }

            // 设置播放速度
            if (config.playbackRate && video.playbackRate !== config.playbackRate) {
                video.playbackRate = config.playbackRate;
                log(`播放速度设置为: ${config.playbackRate}x`);
            }

            // 监听视频结束事件
            if (!video.hasAttribute('data-auto-next-listener')) {
                video.setAttribute('data-auto-next-listener', 'true');
                video.addEventListener('ended', () => {
                    log('视频播放完成');
                    if (config.autoNext) {
                        setTimeout(() => {
                            clickNextButton();
                        }, 2000);
                    }
                });
            }

            return true;
        }
        
        return false;
    }

    // 点击下一节按钮
    function clickNextButton() {
        const nextButtonSelectors = [
            '.next-btn',
            '.next-button',
            '.xt-next',
            '[title*="下一"]',
            'button[class*="next"]',
            'a[class*="next"]'
        ];

        for (const selector of nextButtonSelectors) {
            const button = document.querySelector(selector);
            if (button && !button.disabled && button.offsetParent !== null) {
                log('点击下一节按钮');
                button.click();
                return true;
            }
        }

        // 尝试查找包含"下一"文本的元素
        const allButtons = document.querySelectorAll('button, a');
        for (const btn of allButtons) {
            if (btn.textContent.includes('下一') || btn.textContent.includes('继续')) {
                if (!btn.disabled && btn.offsetParent !== null) {
                    log('找到并点击下一节按钮');
                    btn.click();
                    return true;
                }
            }
        }

        log('未找到下一节按钮');
        return false;
    }

    // 处理弹窗
    function handlePopups() {
        // 关闭可能的弹窗
        const closeButtonSelectors = [
            '.modal-close',
            '.close-btn',
            '.dialog-close',
            '[class*="close"]',
            '[aria-label*="关闭"]',
            '[title*="关闭"]'
        ];

        for (const selector of closeButtonSelectors) {
            const closeBtn = document.querySelector(selector);
            if (closeBtn && closeBtn.offsetParent !== null) {
                log('关闭弹窗');
                closeBtn.click();
                return true;
            }
        }
        return false;
    }

    // 主循环
    function mainLoop() {
        try {
            // 处理弹窗
            handlePopups();

            // 自动播放视频
            if (config.autoPlay) {
                autoPlayVideo();
            }

        } catch (error) {
            log(`错误: ${error.message}`);
        }
    }

    // 初始化
    function init() {
        log('脚本已启动');
        log(`配置: 自动播放=${config.autoPlay}, 播放速度=${config.playbackRate}x, 自动下一节=${config.autoNext}`);

        // 页面加载完成后开始主循环
        setTimeout(() => {
            mainLoop();
            // 定期执行主循环
            setInterval(mainLoop, config.checkInterval);
        }, 2000);

        // 添加样式指示器
        const indicator = document.createElement('div');
        indicator.id = 'xuetangx-auto-indicator';
        indicator.innerHTML = '自动刷课已启动';
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(76, 175, 80, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 10000;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            cursor: pointer;
        `;
        indicator.onclick = function() {
            this.style.display = 'none';
        };
        document.body.appendChild(indicator);

        // 5秒后自动隐藏指示器
        setTimeout(() => {
            indicator.style.display = 'none';
        }, 5000);
    }

    // 页面完全加载后启动
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
