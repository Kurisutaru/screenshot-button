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
  let style = document.createElement('style');
  style.appendChild(document.createTextNode(".screenshotButton:hover{ background-color:hsla(0,0%,100%,.2); }"));
  document.getElementsByTagName('head')[0].appendChild(style);

  //Initial Injection and Watcher Injection
  //スクリーンショットのボタン設定
  let screenshotButton = document.createElement("button");
  screenshotButton.className = "screenshotButton";
  screenshotButton.style = "width: 3rem; height: 3rem; border-radius: 0.4rem; float:left; cursor: pointer";
  screenshotButton.innerHTML = '<img alt="screenshot-button" src="' + chrome.runtime.getURL("icons/icon.svg") + '" style="width:2rem;height:2rem;transform:translate(25%,0)">'
  screenshotButton.onclick = CaptureScreenshot;

  const jsInitCheckTimer = setInterval(jsLoaded, 500);
  let jsWatcherCheckTimer = null;

  function jsLoaded() {
    try {
      let playerControls = document.querySelector(".player-controls__right-control-group");
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
  let title = '';
  let headerEls = document.querySelector("h2[data-a-target='stream-title']");

  if (headerEls) {
    title = headerEls.innerText.trim();
  } else {
    title = "Twitch";
  }

  const uptimeOnLiveElements = document.querySelector(".live-time");
  if (uptimeOnLiveElements) {
    // 配信ページの配信時間があればそちらを採用
    const uptimeOnLive = uptimeOnLiveElements.textContent; //12:34:56
    // 12h34m56sに変換
    const convertedUptime = uptimeOnLive.replace(":", "h").replace(":", "m") + "s";
    title += " " + convertedUptime;
  } else {
    // プレイヤーの時間から取得
    title += "_" + Util.formatTime(player.currentTime);
  }

  return Util.getFileNameProcessedTemplate(title);
}