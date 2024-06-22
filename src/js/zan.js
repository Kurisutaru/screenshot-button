'use strict';

//スクリーンショットのボタン設定
let screenshotButton = document.createElement("button");
screenshotButton.className = "screenshotButton";
screenshotButton.title = "スクリーンショットを撮る"
screenshotButton.innerHTML = '<img src="' + chrome.runtime.getURL("icons/icon.svg") + '" style="width:22px;height:22px;">'
screenshotButton.style.cssFloat = "right";
screenshotButton.style.backgroundColor = "transparent";
screenshotButton.style.border = "none";
screenshotButton.style.marginRight = "5px";
screenshotButton.onclick = CaptureScreenshot;

/**
 * スクリーンショットボタンを追加
 */
function AddScreenshotButton() {
  let ytpRightControls = document.getElementsByClassName("prism-controlbar")[0];
  if (ytpRightControls) {
    ytpRightControls.append(screenshotButton);
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
  let title = "";

  title += Util.formatTime(player.currentTime);

  return prefix + "Z-AN_" + title + ext;
}