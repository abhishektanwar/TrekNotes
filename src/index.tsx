import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { makeServer } from "./server";
import { ModalProvider } from "./contexts/ModalContext";
import { AuthProvider } from "./contexts/AuthDialogContext";
import { BrowserRouter as Router } from "react-router-dom";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ModalProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ModalProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
