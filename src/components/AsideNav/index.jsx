import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./aside-nav.css";
import { useNavigate } from "react-router-dom";
import Button from "../Buttons/Button";
import { useAuth } from "../../contexts/AuthDialogContext";
import { useModal } from "../../contexts/ModalContext";
import {useLocation} from 'react-router-dom';

const AsideNav = ({open,setOpen}) => {
  const { setAuthType, logoutHandler, user } = useAuth();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const location = useLocation();
  const currentLocation = location.pathname;
  const handleLogin = () => {
    showModal();
    setAuthType("login");
  };

  return (
    <div className={`${open ? 'show-aside-nav' : 'hide-aside-nav'} aside-nav-container `}>
      {open ? (
      <div>
        <span onClick={()=>setOpen(false)} className="close-button">
          {/* <Close /> */}
        </span>
      </div>
        
      ):null}
        <Button
          buttonText="Notes"
          buttonStyle={`aside-nav-item body-typo-md text-medium-weight secondary-button ${currentLocation==='/explore' ? 'active-nav' : ''}`}
          icon={
            <span style={{ marginRight: "1rem" }}>
              {/* <Explore /> */}
            </span>
          }
          onClick={() => navigate("/explore")}
        />
        <Button
          buttonText="Label"
          buttonStyle={`aside-nav-item body-typo-md text-medium-weight secondary-button ${currentLocation==='/liked-videos' ? 'active-nav' : ''}`}
          icon={
            <span style={{ marginRight: "1rem" }}>
              {/* <Like /> */}
            </span>
          }
          onClick={() => {
            user.isAuthenticated ? navigate("/liked-videos") : handleLogin();
          }}
        />
        <Button
          buttonText="Archive"
          buttonStyle={`aside-nav-item body-typo-md text-medium-weight secondary-button ${currentLocation==='/playlists' ? 'active-nav' : ''}`}
          icon={
            <span style={{ marginRight: "1rem" }}>
              {/* <PlaylistAddCheck /> */}
            </span>
          }
          onClick={() => {
            user.isAuthenticated ? navigate("/playlists") : handleLogin();
          }}
        />
        <Button
          buttonText="Trash"
          buttonStyle={`aside-nav-item body-typo-md text-medium-weight secondary-button ${currentLocation==='/watch-later' ? 'active-nav' : ''}`}
          icon={
            <span style={{ marginRight: "1rem" }}>
              {/* <WatchLater /> */}
            </span>
          }
          onClick={() => {
            user.isAuthenticated ? navigate("/watch-later") : handleLogin();
          }}
        />
        <Button
          buttonText="Profile"
          buttonStyle={`aside-nav-item body-typo-md text-medium-weight secondary-button ${currentLocation==='/history' ? 'active-nav' : ''}`}
          icon={
            <span style={{ marginRight: "1rem" }}>
              {/* <History /> */}
            </span>
          }
          onClick={() => {
            user.isAuthenticated ? navigate("/history") : handleLogin();
          }}
        />
    </div>
  );
};

export default AsideNav;
