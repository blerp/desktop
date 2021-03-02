import React from "react";

const App = () => {
  // const version = document.getElementById("version");
  // const notification = document.getElementById("notification");
  // const message = document.getElementById("message");
  // const restartButton = document.getElementById("restart-button");
  console.log(window);
  if (window.isElectron) {
    window.ipcRenderer.send("get-version")
        window.ipcRenderer.on("set-version", (event, message) => {
            console.log(message)
            document.getElementById("version").innerText = message
        })
    window.ipcRenderer.send("app_version");
    window.ipcRenderer.on("app_version", (event, arg) => {
      window.ipcRenderer.removeAllListeners("app_version");
      version.innerText = "Version " + arg.version;
    });
    window.ipcRenderer.on("update_available", () => {
      window.ipcRenderer.removeAllListeners("update_available");
      const notification = document.getElementById("notification");
      const message = document.getElementById("message");
      message.innerText = "A new update is available. Downloading now...";
      notification.classList.remove("hidden");
    });
    window.ipcRenderer.on("update_downloaded", () => {
      window.ipcRenderer.removeAllListeners("update_downloaded");
      const notification = document.getElementById("notification");
      const message = document.getElementById("message");
      const restartButton = document.getElementById("restart-button");
      message.innerText =
        "Update Downloaded. It will be installed on restart. Restart now?";
      restartButton.classList.remove("hidden");
      notification.classList.remove("hidden");
    });
  }
  const closeNotification = () => {
    const notification = document.getElementById("notification");
    notification.classList.add("hidden");
  };
  const restartApp = () => {
    window.ipcRenderer.send("restart_app");
  };
  const checkForUpdate = () => {
    window.ipcRenderer.send("check-for-update");
  };
  return (
    <>
      <h1>Electron Auto Update Example CHANGE</h1>
      <p id="version"></p>
      <button onClick={() => checkForUpdate()}>check</button>
      <div id="notification" className="hidden">
        <p id="message"></p>
        <button id="close-button" onClick={() => closeNotification()}>
          Close
        </button>
        <button
          id="restart-button"
          onClick={() => restartApp()}
          className="hidden"
        >
          Restart
        </button>
      </div>
    </>
  );
};

export default App;
