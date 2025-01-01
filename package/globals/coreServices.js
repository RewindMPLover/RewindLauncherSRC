/* 
 - Deobfuscated with <3
 - Rewind Launcher v2.1.1
*/

const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  dialog,
  ipcRenderer,
} = require("electron");
function MessagePopup(_0x57aea5) {
  ipcRenderer.send("messagePopup", _0x57aea5);
}
module.exports = {
  MessagePopup: MessagePopup,
};
