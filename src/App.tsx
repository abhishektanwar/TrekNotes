import React, { FC, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { ModalProvider } from "./contexts/ModalContext";
import { AuthProvider, useAuth } from "./contexts/AuthDialogContext";
import { Loader } from "./components/Loader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./screens/LandingPage";
import HomePage from "./screens/HomePage";
import AsideNav from "./components/AsideNav";

const App: FC = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  return (
    <div className="App">
      {/* <Mockman /> */}
      {/* <Router> */}
        {/* <ModalProvider> */}
        {/* <AuthProvider> */}
        <nav className="nav-bar shadow-box" id="my-nav-bar">
          <Header />
        </nav>
        <div className={user.isAuthenticated ? "main-container" : ""}>
          {user?.isAuthenticated && <AsideNav open={open} setOpen={setOpen} />}
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/home" element={<HomePage />} />
          </Routes>
        </div>
        {/* </AuthProvider> */}
        {/* </ModalProvider> */}
      {/* </Router> */}
    </div>
  );
};

export default App;
