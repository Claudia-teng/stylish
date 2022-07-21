import styles from "./Navbar.module.sass";
import logo from "./assets/logo.png";
import cart from "./assets/cart.png";
import member from "./assets/member.png";

function Navbar() {
  return (
    <>
      <nav className={styles.nav}>
        <img alt="logo" className={styles.logo} src={logo} />
        <ul className={styles.ul}>
          <li>
            <p>女</p>
            <p>裝</p>
          </li>
          <li>
            <p>男</p>
            <p>裝</p>
          </li>
          <li>
            <p>配</p>
            <p>件</p>
          </li>
        </ul>
        <div className={styles.buttons}>
          <input></input>
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
