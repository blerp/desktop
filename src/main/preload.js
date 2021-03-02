const { ipcRenderer } = require("electron");
function init() {
  console.log("itit");
  // add global variables to your web page
  window.isElectron = true;
  window.ipcRenderer = ipcRenderer;
}

console.log("pre");

init();
