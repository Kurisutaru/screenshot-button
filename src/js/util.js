class Util {

  /**
   * 秒をh-m-sの形にフォーマットする
   * @param {*} time 経過秒
   */
  static formatTime(time) {

    let seconds = Math.floor(time);

    if (seconds < 60) {
      return seconds + "s";
    }

    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    if (minutes < 60) {
      return minutes + "m" + Util.paddingZero(seconds, 2) + "s";
    }

    const hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    if (hours < 24) {
      return hours + "h" + Util.paddingZero(minutes, 2) + "m" + Util.paddingZero(seconds, 2) + "s";
    }

    return Util.paddingZero(hours, 2) + "h" + Util.paddingZero(minutes, 2) + "m" + Util.paddingZero(seconds, 2) + "s";
  }

  static paddingZero(num, countOfZero) {
    return ('0'.repeat(countOfZero) + num).slice(-countOfZero);
  }

  /**
   * msまでの現在時刻の文字列を返す
   */
  static getNowStr() {
    const now = new Date();

    return now.getFullYear() + Util.paddingZero(now.getMonth() + 1, 2) + Util.paddingZero(now.getDate(), 2) +
      Util.paddingZero(now.getHours(), 2) + Util.paddingZero(now.getMinutes(), 2) + Util.paddingZero(now.getSeconds(), 2) +
      Util.paddingZero(now.getMilliseconds(), 3);
  }

  static getFilePrefix() {
    return "ss_" + this.getNowStr() + "_";
  }

  static getFileNameProcessedTemplate(title) {
    return `${Util.getFilePrefix()}-${title}.png`;
  }

  static processVideoPlayerToCanvasImage(player, fileName) {
    try {
      let clipboard = false;
      chrome.storage.sync.get(['clipboard'], function (result) {
        if ('clipboard' in result) clipboard = result.clipboard;
      });

      let canvas = document.createElement("canvas");
      canvas.width = player.videoWidth;
      canvas.height = player.videoHeight;
      canvas.getContext('2d').drawImage(player, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(async function (blob) {
        if (clipboard) {
          const item = new ClipboardItem({"image/png": blob});
          await navigator.clipboard.write([item]);
        } else {
          let downloadLink = document.createElement("a");
          downloadLink.download = fileName;
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.click();
        }
      }, 'image/png');
    } catch (e) {
      console.error(e);
    }

  }
}