// Initial welcome page. Delete the following line to remove it.
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// const appElem = document.getElementById("app");
// appElem.innerHTML = "<h1>Hello World!</h1>";
function render() {
  console.log(window.isElectron);
  ReactDOM.render(<App />, document.getElementById("app"));
}

render();
