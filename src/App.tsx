import React from "react";
import logo from "./logo.svg";
import Mockman from "mockman-js";
import "./App.css";
import Header from "./components/Header";
import { ModalProvider } from "./contexts/ModalContext";
import { AuthProvider } from "./contexts/AuthDialogContext";
import { Loader } from "./components/Loader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      {/* <Mockman /> */}
      <Router>
      <ModalProvider>
        <AuthProvider>
          <nav className="nav-bar shadow-box" id="my-nav-bar">
            <Header />
          </nav>
          <Routes>
            <Route path="/" element={<Loader />} />
          </Routes>
        </AuthProvider>
      </ModalProvider>
      </Router>
    </div>
  );
}

export default App;
