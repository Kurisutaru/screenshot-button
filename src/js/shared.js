let ctrl = true;
let alt = true;
let shift = false;
let key = 's';

//判定
const check = function (e) {
  if (ctrl === true && e.ctrlKey === false) {
    return false;
  }

  if (shift === true && e.shiftKey === false) {
    return false;
  }

  if (alt === true && e.altKey === false) {
    return false;
  }

  return key === e.key.toLowerCase();
};

chrome.storage.sync.get(['ctrl', 'alt', 'shift', 'key'], function (result) {
  if ('ctrl' in result) ctrl = result.ctrl;
  if ('alt' in result) alt = result.alt;
  if ('shift' in result) shift = result.shift;
  if ('key' in result) key = result.key;
});

document.addEventListener("keydown", (e) => {
  if (check(e) && CaptureScreenshot !== undefined) {
    CaptureScreenshot();
  }
});

//prettifyPrintIntoConsole
//https://developer.chrome.com/docs/devtools/console/format-style
//Using ansi escape style
function pConsole(message, type) {
  switch (type) {
    case "success":
      console.log(`\x1B[32;4m[SUCCESS]\x1B[m ` + `${message}`);
      break;
    case "info":
      console.log(`\x1B[34;4m[INFO]\x1B[m ` + `${message}`);
      break;
    case "error":
      console.log(`\x1B[31;4m[ERROR]\x1B[m ` + `${message}`);
      break;
  }
}
