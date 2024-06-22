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
  screenshotButton.className = "screenshotButton";
  screenshotButton.style = "width: auto; float: left; cursor: pointer";
  screenshotButton.innerHTML = '<img alt="screenshot-button" src="' + chrome.runtime.getURL("icons/icon.svg") + '" style="width:25px;height:25px;">'
  screenshotButton.onclick = CaptureScreenshot;

  //Initial Injection and Watcher Injection
  const jsInitCheckTimer = setInterval(jsLoaded, 500);
  let jsWatcherCheckTimer = null;

  function jsLoaded() {
    try {
      let playerControls = document.querySelector("[class^='ControlBar__BottomRightBlock']");
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
  const prefix = Util.getFilePrefix();
  const ext = ".png";
  let title;
  let headerEls = document.querySelector("h1[class^='MovieTitle__Title']");

  if (headerEls !== null) {
    title = headerEls.innerText.trim();
  } else {
    title = "OPENREC";
  }

  title += "_" + Util.formatTime(player.currentTime);

  return prefix + title + ext;
}