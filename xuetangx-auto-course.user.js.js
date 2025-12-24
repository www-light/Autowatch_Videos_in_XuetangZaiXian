
// ==UserScript==
// @name         XuetangX XtPlayer 自动播放下一个视频（目录版）
// @namespace    https://tampermonkey.net/
// @version      1.2.0
// @description  视频播放结束后，自动点击侧边栏目录中的下一个【视频】
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  let currentVideo = null;
  let timer = null;
  let jumping = false;

  const log = (...args) => console.log('[AutoNext]', ...args);

  /* ============ 展开被折叠的父 menu ============ */
  function expandParents(el) {
    let p = el.parentElement;
    while (p) {
      if (p.classList?.contains('menu-content') && p.style.display === 'none') {
        p.style.display = '';
      }
      const title = p.previousElementSibling;
      if (title?.classList?.contains('menu-title')) {
        title.click();
      }
      p = p.parentElement;
    }
  }

  /* ============ 找下一个【视频】目录项 ============ */
  function findNextVideoItem() {
    const items = Array.from(
      document.querySelectorAll('.menu-content-item')
    );

    const currentIndex = items.findIndex(i =>
      i.classList.contains('is-active')
    );

    if (currentIndex === -1) return null;

    for (let i = currentIndex + 1; i < items.length; i++) {
      const type = items[i].querySelector('.item-type');
      if (type && type.innerText.trim() === '视频') {
        return items[i];
      }
    }
    return null;
  }

  /* ============ 跳转核心 ============ */
  function goNext() {
    if (jumping) return;
    jumping = true;

    const next = findNextVideoItem();
    if (!next) {
      log('已经是最后一个视频');
      return;
    }

    expandParents(next);
    log('➡ 自动进入下一个视频：', next.innerText.trim());
    next.click();

    setTimeout(() => (jumping = false), 5000);
  }

  /* ============ 绑定 video ============ */
  function bindVideo(video) {
    if (!video || video === currentVideo) return;
    currentVideo = video;

    log('🎬 绑定新 video');

    video.addEventListener('ended', () => {
      log('⏹ video ended');
      goNext();
    });

    clearInterval(timer);
    timer = setInterval(() => {
      if (!video.duration) return;
      if (video.currentTime / video.duration >= 0.995) {
        log('⏱ 进度到 99.5%');
        goNext();
      }
    }, 1000);
  }

  /* ============ 扫描 video（XtPlayer 会重建） ============ */
  function scan() {
    const v = document.querySelector('video.xt_video_player, video');
    if (v) bindVideo(v);
  }

  scan();

  new MutationObserver(scan).observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  log('✅ 自动播放下一个视频（目录模式）已启动');
})();
