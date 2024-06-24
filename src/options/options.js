document.title = chrome.i18n.getMessage('options_page_title');
document.getElementById("msg-shortcut-key").innerHTML = chrome.i18n.getMessage('options_page_shortcut_key');
document.getElementById("save-btn").value = chrome.i18n.getMessage('options_save');

const inputCtrl = document.getElementById("input-ctrl");
const inputAlt = document.getElementById("input-alt");
const inputShift = document.getElementById("input-shift");
const inputKey = document.getElementById("input-key");
const inputClipboard = document.getElementById("input-clipboard");

//ストレージから設定値を復元する
chrome.storage.sync.get(['ctrl', 'alt', 'shift', 'key', 'clipboard'], function(result) {
  let ctrl = false;
  let alt = false;
  let shift = false;
  let key = '';
  let clipboard = false;
  if ('ctrl' in result) {
    ctrl = result.ctrl;
    inputCtrl.checked = ctrl;
  }
  if ('alt' in result) {
    alt = result.alt;
    inputAlt.checked = alt;
  }
  if ('shift' in result) {
    shift = result.shift;
    inputShift.checked = shift;
  }
  if ('key' in result) {
    key = result.key;
    inputKey.value = key;
  }

  if ('clipboard' in result) {
    clipboard = result.clipboard;
    inputClipboard.checked = clipboard;
  }

  setCurrentKey(ctrl, alt, shift, key);
});

function setCurrentKey(ctrl, alt, shift, key) {
  // 画面に反映
  let shortcut = '';
  if (ctrl) {
    shortcut += 'Ctrl + ';
  }
  if (alt) {
    shortcut += 'Alt + ';
  }
  if (shift) {
    shortcut += 'Shift + ';
  }
  shortcut += key;

  const msgCurrentShortcutSettings = chrome.i18n.getMessage('options_page_current_shortcut_settings', shortcut);
  let mcssHtml = document.getElementById("msg-current-shortcut-settings");
  mcssHtml.innerText = msgCurrentShortcutSettings;
}

function saveSettings() {
  console.log("Save settings");
  let ctrl = inputCtrl.checked;
  let alt = inputAlt.checked;
  let shift = inputShift.checked;
  let key = inputKey.value;
  let clipboard = inputClipboard.checked;

  console.log("[Ctrl] : " + ctrl);
  console.log("[Alt] : " + alt);
  console.log("[Shift] : " + shift);
  console.log("[Key] : " + key);
  console.log("[Clipboard] : " + clipboard);

  chrome.storage.sync.set({
    "ctrl": ctrl,
    "shift": shift,
    "alt": alt,
    "key": key,
    "clipboard": clipboard,
  }).then(() => {
    console.log("save succeed!");
    setCurrentKey(ctrl, alt, shift, key);
    Toastify({
      text: chrome.i18n.getMessage('options_save_success'),
      style: { background: '#2ecc40' }
    }).showToast();
  }).catch(() => {
    console.log("save failed.");
    Toastify({
      text: chrome.i18n.getMessage('options_save_failed'),
      style: { background: '#ff851b' }
    }).showToast();
  });
}

let saveButton = document.getElementById("save-btn");
saveButton.addEventListener('click', function(event) {
  saveSettings();
});