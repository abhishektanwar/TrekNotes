import React from "react";
// import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthDialogContext";
import { useModal } from "../../contexts/ModalContext";
// import { useWishlist } from "../../Contexts/WishlistContext";
import BadgeIconButton from "./BadgeIconButton";
import Button from "./Button";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
// import {useNavigate} from 'react-router-dom'
// import { useCart } from "../../Contexts/CartContext";
// import {ReactComponent as DetailedLogo} from '../../assets/images/logo/TREK-SHARK-Logo.svg';
// import {ReactComponent as MobileLogo} from '../../assets/images/logo/logo.svg';

const Header = () => {
  // const { setAuthType, logoutHandler, user } = useAuth();
  const { showModal } = useModal();
  // const {wishlistProducts}= useWishlist();
  // const {cartProducts} = useCart();
  // const navigate = useNavigate();
  
  const handleLoginBtnClick = () => {
    showModal();
    // setAuthType("login");
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

        {/* <BadgeIconButton
          badgeIconButtonWrapper={"badge-icon-button-wrapper"}
          badgeNumber={user.isAuthenticated ? wishlistProducts.length : null}
          icon={"far fa-heart"}
          onClick={()=> user.isAuthenticated ? navigate('/wishlist') : handleLoginBtnClick()}
        />

        <BadgeIconButton
          badgeIconButtonWrapper={"badge-icon-button-wrapper"}
          badgeNumber={user.isAuthenticated ? cartProducts.length : null}
          icon={"fas fa-shopping-cart badge-icon-class"}
          onClick={()=> user.isAuthenticated ? navigate('/cart') : handleLoginBtnClick()}
        /> */}

        <Button
          // buttonText={user.isAuthenticated ? "Logout" : "Login"}
          buttonText="Test"
          buttonStyle={"headerButton typo-sm"}
          // onClick={() => (user.isAuthenticated ? logoutHandler() : handleLoginBtnClick())}
        />
      </div>
    </>
  );
};

export default Header;
