import styles from "./Navbar.module.sass";
import logo from "../assets/logo.png";
import cart from "../assets/cart.png";
import member from "../assets/member.png";
import { Link, NavLink } from "react-router-dom";

function Navbar({ handleKeyPress, keyword, setKeyword }) {
  function onInputChange(e) {
    setKeyword(e.target.value);
  }

  function onCategoryChange() {
    setKeyword("");
  }

  let activeStyle = {
    color: "#8B572A",
  };
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
          <div className={styles.cart}>
            <img alt="cart" src={cart} />
            <div>1</div>
          </div>
          <img alt="profile" src={member} />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
