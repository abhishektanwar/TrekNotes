import React from "react";
import { useAuth } from "../../contexts/AuthDialogContext";
import { useModal } from "../../contexts/ModalContext";
import BadgeIconButton from "../Buttons/BadgeIconButton";
// import Button from "./Buttons/Button";
import SearchBar from "./SearchBar";
import { ReactComponent as MobileLogo } from "../../assets/images/logo/logo.svg";
import { ReactComponent as DetailedLogo } from "./TREK-NOTES-LOGO.svg";
import { Link } from "react-router-dom";
import Button from "../Buttons/Button";
import { useNotesFilter } from "../../contexts/FilterContext";
import { dispatchActionTypes } from "../../reducers/dispatchActionTypes";

const Header = () => {
  const { setAuthType, logoutHandler, user } = useAuth();
  const { showModal } = useModal();
  const { filterDispatch } = useNotesFilter();
  const { SET_FILTER_NOTES_SEARCH } = dispatchActionTypes;

  const handleLoginBtnClick = () => {
    showModal();
    setAuthType("login");
  };
  return (
    <>
      <Link to="/">
        <DetailedLogo />
        <span className="show-mobile-logo">
          <MobileLogo />
        </span>
      </Link>
      <SearchBar
        handleSearch={(searchInput) =>
          filterDispatch({
            type: SET_FILTER_NOTES_SEARCH,
            payload: searchInput,
          })
        }
      />
      <div className="nav-section">
        <Button
          buttonText={user.isAuthenticated ? "Logout" : "Login"}
          buttonStyle={"headerButton typo-sm"}
          onClick={() =>
            user.isAuthenticated ? logoutHandler() : handleLoginBtnClick()
          }
        />
      </div>
    </>
  );
};

export default Header;
