import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Initalizing root component
ReactDOM.render(
  // Adding strict mode for more bug free components
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);