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
  screenshotButton.className = "screenshotButton ccoLTU";
  screenshotButton.style = "width: auto; margin-right: 32px; float: left; cursor: pointer;";
  screenshotButton.innerHTML = '<img alt="screenshot-button" src="' + chrome.runtime.getURL("icons/icon.svg") + '" style="width:25px;height:25px;transform:translate(0,2px)">'
  screenshotButton.onclick = CaptureScreenshot;

  //Initial Injection and Watcher Injection
  const jsInitCheckTimer = setInterval(jsLoaded, 500);
  let jsWatcherCheckTimer = null;

  function jsLoaded() {
    try {
      const playerControls = document.querySelector(".layout-right,.vod-controller-bar");
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
  let player = document.querySelector("video");
  Util.processVideoPlayerToCanvasImage(player, getFileName(player));
}

/**
 * ファイル名取得
 */
function getFileName(player) {
  let title;

  let headerEl = document.querySelector("div .room-anchor-panel__anchor-intro");

  if (headerEl) {
    title = headerEl.getAttribute("title").toString().trim();
  } else {
    headerEl = document.querySelector("div .title");
    if (headerEl) {
      title = headerEl.getAttribute("title").toString().trim();
    } else {
      title = 'Mildom';
    }
  }

  title += "_" + Util.formatTime(player.currentTime);

  console.log(Util.getFileNameProcessedTemplate(title));

  return Util.getFileNameProcessedTemplate(title);
}