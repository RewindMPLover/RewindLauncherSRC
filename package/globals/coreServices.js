/* 
 - Deobfuscated with <3
 - Rewind Launcher v3.0.5
*/

const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  dialog,
  ipcRenderer,
} = require("electron");
function MessagePopup(_0x64fae5) {
  ipcRenderer.send("messagePopup", _0x64fae5);
}
module.exports = {
  MessagePopup: MessagePopup,
};
