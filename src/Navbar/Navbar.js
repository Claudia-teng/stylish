import styles from "./Navbar.module.sass";
import logo from "../assets/logo.png";
import cart from "../assets/cart.png";
import cartHover from "../assets/cart-hover.png";
import member from "../assets/member.png";
import memberHover from "../assets/member-hover.png";
import search from "../assets/search.png";
import searchHover from "../assets/search-hover.png";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar({ hasLogin, onSearchProduct, handleKeyPress, keyword, setKeyword }) {
  const [cartIcon, setCartIcon] = useState(cart);
  const [memberIcon, setMemberIcon] = useState(member);
  const [searchIcon, setSearchIcon] = useState(search);
  const [hasToken, setHasToken] = useState(false);

  function onInputChange(e) {
    setKeyword(e.target.value);
  }

  function onCategoryChange() {
    setKeyword("");
  }

  function onCartHover() {
    setCartIcon(cartIcon === cart ? cartHover : cart);
  }

  function onMemberHover() {
    setMemberIcon(memberIcon === member ? memberHover : member);
  }

  function onSearchHover() {
    setSearchIcon(searchIcon === search ? searchHover : search);
  }

  let activeStyle = {
    color: "#8B572A",
  };

  useEffect(() => {
    setHasToken(localStorage.getItem("jwt") ? true : false);
  }, []);

  return (
    <>
      <nav className={styles.nav}>
        <Link to="/">
          <img onClick={onCategoryChange} alt="logo" className={styles.logo} src={logo} />
        </Link>
        <ul className={styles.ul}>
          <li onClick={onCategoryChange}>
            <NavLink to="/women" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              <p>女裝</p>
            </NavLink>
          </li>
          <li onClick={onCategoryChange}>
            <NavLink to="/men" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              <p>男裝</p>
            </NavLink>
          </li>
          <li onClick={onCategoryChange}>
            <NavLink to="/accessories" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              <p>配件</p>
            </NavLink>
          </li>
        </ul>
        <div className={styles.buttons}>
          <input value={keyword} onChange={onInputChange} onKeyUp={handleKeyPress}></input>
          <img
            className={styles.searchIcon}
            alt="search"
            src={searchIcon}
            onClick={onSearchProduct}
            onMouseOver={onSearchHover}
            onMouseOut={onSearchHover}
          />
          <NavLink to="/cart" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            <div className={styles.cart}>
              <img alt="cart" src={cartIcon} onMouseOver={onCartHover} onMouseOut={onCartHover} />
              <div>1</div>
            </div>
          </NavLink>
          {!hasToken && (
            <NavLink to="/login">
              <img alt="profile" src={memberIcon} onMouseOver={onMemberHover} onMouseOut={onMemberHover} />
            </NavLink>
          )}
          {hasToken && (
            <NavLink to="/profile">
              <img alt="profile" src={memberIcon} onMouseOver={onMemberHover} onMouseOut={onMemberHover} />
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
