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
  screenshotButton.className = "screenshotButton pzp-button pzp-pc-ui-button pzp-pc__setting-button";
  screenshotButton.title = "Take screenshot";
  screenshotButton.style = "width: 36px; height:36px; cursor: pointer;";
  screenshotButton.innerHTML = '<img alt="screenshot-button" src="' + chrome.runtime.getURL("icons/icon.svg") + '" style="width:22px;height:22px;">';
  screenshotButton.onclick = CaptureScreenshot;

  //Initial Injection and Watcher Injection
  const jsInitCheckTimer = setInterval(jsLoaded, 500);
  let jsWatcherCheckTimer = null;

  function jsLoaded() {
    try {
      const playerControls = document.querySelector(".pzp-pc__bottom-buttons-right");
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

function CaptureScreenshot() {
  let player = document.getElementsByClassName("webplayer-internal-video")[0];
  Util.processVideoPlayerToCanvasImage(player, getFileName());
}


function getFileName() {
  const titleOnDefaultMode = document.querySelector("[class^=video_information_title__]");

  let title = titleOnDefaultMode != null ?
    titleOnDefaultMode.textContent :
    document.querySelector("[class^=live_information_player_title__]").textContent; // for wide mode

  return Util.getFileNameProcessedTemplate(title);
}