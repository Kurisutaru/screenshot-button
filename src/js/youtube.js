'use strict';

/**
 * スクリーンショットボタンを追加
 */
function AddScreenshotButton() {
  window.addEventListener("load", main, false);
}

/**
 * CMでプレイヤーの更新が走るので定期的に 存在チェック→なければ追加 を繰り返す
 */
function main(e) {
  //スクリーンショットのボタン設定
  let screenshotButton = document.createElement("button");
  screenshotButton.className = "screenshotButton ytp-button";
  screenshotButton.title = "スクリーンショットを撮る"
  screenshotButton.style = "float:left; cursor: pointer";
  screenshotButton.innerHTML = '<img alt="screenshot-button" src="' + chrome.runtime.getURL("icons/icon.svg") + '" style="width:22px;height:22px;transform:translate(11px,7px)">'
  screenshotButton.onclick = CaptureScreenshot;

  //Initial Injection and Watcher Injection
  const jsInitCheckTimer = setInterval(jsLoaded, 500);
  let jsWatcherCheckTimer = null;

  function jsLoaded() {
    try {
      let playerControls = document.querySelector(".ytp-right-controls");
      const isExist = playerControls.querySelector(".screenshotButton");
      if (isExist) {
        //追加済みであれば何もしない
        if (jsWatcherCheckTimer == null) {
          clearInterval(jsInitCheckTimer);
          jsWatcherCheckTimer = setInterval(jsLoaded, 5000);
        }
        return;
      }
      playerControls.prepend(screenshotButton);
    } catch (e) {
      console.error(e);
    }
  }
}

AddScreenshotButton();

/**
 * キャプチャ実行
 */
function CaptureScreenshot() {
  let player = document.querySelector(".video-stream");
  Util.processVideoPlayerToCanvasImage(player, getFileName(player));
}

/**
 * ファイル名取得
 */
function getFileName(player) {
  let title = '';
  /**
   * ファイル名を設定
   */
  let headerEls = document.querySelectorAll("h1.title");
  if (headerEls.length > 0) {
    title = Array.from(headerEls).map(el => {
      return el.innerText.trim();
    }).join("");
  }
  headerEls = document.querySelectorAll("h1.watch-title-container");
  if (headerEls.length > 0) {
    title = Array.from(headerEls).map(el => {
      return el.innerText.trim();
    }).join("");
  }

  title += "_" + Util.formatTime(player.currentTime);

  return Util.getFileNameProcessedTemplate(title);
}