import React from "react";
// import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthDialogContext";
import { useModal } from "../../contexts/ModalContext";
// import { useWishlist } from "../../Contexts/WishlistContext";
import BadgeIconButton from "./BadgeIconButton";
import Button from "./Button";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import {ReactComponent as MobileLogo} from '../../assets/images/logo/logo.svg';

const Header = () => {
  const { setAuthType, logoutHandler, user } = useAuth();
  const { showModal } = useModal();
  
  const handleLoginBtnClick = () => {
    showModal();
    setAuthType("login");
  };
  return (
    <>
      {/* <Link to="/">
          <Logo />
        <span className="show-mobile-logo">
          <MobileLogo />
        </span>
      </Link> */}
      {/* <SearchBar /> */}
      <div className="nav-section">

        <Button
          buttonText={user.isAuthenticated ? "Logout" : "Login"}
          buttonStyle={"headerButton typo-sm"}
          onClick={() => (user.isAuthenticated ? logoutHandler() : handleLoginBtnClick())}
        />
      </div>
    </>
  );
};

export default Header;
