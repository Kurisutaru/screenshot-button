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
  const jsInitCheckTimer = setInterval(jsLoaded, 1000);
  let jsWatcherCheckTimer = null;

  function jsLoaded() {
    try {
      const playerControls = document.querySelector("button.st-activate__button.screenshotButton");
      if (playerControls) {
        //追加済みであれば何もしない
        if (jsWatcherCheckTimer == null) {
          clearInterval(jsInitCheckTimer);
          jsWatcherCheckTimer = setInterval(jsLoaded, 5000);
        }
        return;
      }

      //スクリーンショットのボタン設定
      let screenshotButton = document.querySelector("button.st-activate__button").cloneNode();
      screenshotButton.className += " screenshotButton";
      screenshotButton.style = "cursor: pointer;";
      screenshotButton.innerHTML = '<a><img alt="screenshot-button" src="' + chrome.runtime.getURL("icons/icon.svg") + '" style="width:25px;height:25px;"><br>スクショ</a>';
      screenshotButton.style.cssFloat = "left";
      screenshotButton.onclick = CaptureScreenshot;

      let ssLi = document.createElement("li");
      ssLi.className = "st-activate__item";
      ssLi.prepend(screenshotButton);

      let footerUl = document.querySelector("ul.st-activate__list");
      if (footerUl) {
        footerUl.append(ssLi);
      }
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
  Util.processVideoPlayerToCanvasImage(player, getFileName());
}

/**
 * ファイル名取得
 */
function getFileName() {
  let title;
  let headerEls = document.querySelector("h1.room-name");

  if (headerEls !== null) {
    title = headerEls.innerText.trim();
  } else {
    title = 'SHOWROOM';
  }

  return Util.getFileNameProcessedTemplate(title);
}