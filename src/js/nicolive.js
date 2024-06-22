'use strict';

/**
 * ニコニコ生放送用
 */

//スクリーンショットのボタン設定
let screenshotButton = document.createElement("button");
screenshotButton.className = "screenshotButton";
screenshotButton.style.width = "32px";
screenshotButton.innerHTML = '<img src="' + chrome.runtime.getURL("icons/icon.svg") + '" style="width:16px;height:16px;transform:translateY(2px);">'
screenshotButton.style.background = "transparent";
screenshotButton.style.border = "none";
screenshotButton.onclick = CaptureScreenshot;

/**
 * スクリーンショットボタンを追加
 */
function AddScreenshotButton() {
  let addonController = document.querySelector("[class^='___addon-controller']");
  if (addonController) {
    addonController.prepend(screenshotButton);
  }
}

AddScreenshotButton();

/**
 * キャプチャ実行
 */
function CaptureScreenshot() {
  let player = document.getElementsByTagName("video")[0];
  Util.processVideoPlayerToCanvasImage(player, getFileName(player));
}

/**
 * ファイル名取得
 */
function getFileName() {
  const prefix = Util.getFilePrefix();
  const ext = ".png";
  let title;
  let headerEls = document.querySelectorAll("h1[class^='___program-title___']");

  /**
   * ファイル名を設定
   */
  function SetTitle() {
    if (headerEls.length > 0) {
      title = Array.from(headerEls).map(el => {
        return el.innerText.trim();
      }).join("");
      return true;
    } else {
      return false;
    }
  }

  if (SetTitle() == false) {
    title = '';
  }

  title += "_" + getElapsedTimeString();

  return prefix + title + ext;
}

/**
 * コメントが流れているcanvas要素を取得
 * @returns コメントが載ったcanvas要素
 */
function getCommentCanvas() {

  let commentLayerDiv = document.getElementById("comment-layer-container");
  let canvas = commentLayerDiv.getElementsByTagName("canvas")[0];

  return canvas;
}

/**
 * プレイヤー下に表示されている経過時間を取得
 * @returns 経過時間の文字列
 */
function getElapsedTimeString() {
  let timeDiv = document.querySelector("span[class^='___time-score___']");
  let elapsedTime = timeDiv.querySelector("span[class^='___value___']");

  return elapsedTime.innerText;
}