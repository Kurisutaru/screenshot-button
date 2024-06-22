'use strict';

//スクリーンショットのボタン設定
let screenshotButton = document.createElement("button");
screenshotButton.className = "screenshotButton vjs-control";
screenshotButton.style.width = "36px";
screenshotButton.innerHTML = '<img src="' + chrome.runtime.getURL("icons/icon.svg") + '" style="width:22px;height:22px;">'
screenshotButton.style.cssFloat = "left";
screenshotButton.onclick = CaptureScreenshot;

/**
 * スクリーンショットボタンを追加
 */
function AddScreenshotButton() {

  let spacerElem = document.getElementsByClassName("vjs-custom-control-spacer vjs-spacer")[0];


  if (spacerElem) {
    spacerElem.insertAdjacentElement('afterend', screenshotButton);
  } else {
    setTimeout(() => {
      AddScreenshotButton()
    }, 1000);
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

  return prefix + "SPWN" + title + ext;
}