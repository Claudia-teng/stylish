import styles from "./Navbar.module.sass";
import logo from "../assets/logo.png";
import cart from "../assets/cart.png";
import member from "../assets/member.png";
import { Link, NavLink } from "react-router-dom";

function Navbar({ setKeyword }) {
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      setKeyword(e.target.value);
    }
  }

  let activeStyle = {
    color: "#8B572A",
  };
  return (
    <>
      <nav className={styles.nav}>
        <Link to="/">
          <img alt="logo" className={styles.logo} src={logo} />
        </Link>
        <ul className={styles.ul}>
          <li>
            <NavLink to="/women" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              <p>女裝</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/men" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              <p>男裝</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/accessories" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              <p>配件</p>
            </NavLink>
          </li>
        </ul>
        <div className={styles.buttons}>
          <input onKeyUp={handleKeyPress}></input>
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
