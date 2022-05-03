import React from "react";
import logo from "./logo.svg";
// import Mockman from "mockman-js";
import "./App.css";
import Header from "./components/Header";
import { ModalProvider } from "./contexts/ModalContext";
import { AuthProvider } from "./contexts/AuthDialogContext";
import { Loader } from "./components/Loader";

function App() {
  return (
    <div className="App">
      {/* <Mockman /> */}
      <ModalProvider>
        <AuthProvider>
          <nav className="nav-bar shadow-box" id="my-nav-bar">
            <Header />
          </nav>
        </AuthProvider>
      </ModalProvider>
    </div>
  );
}

export default App;
