import styles from "./Footer.module.sass";
import line from "../assets/line.png";
import twitter from "../assets/twitter.png";
import facebook from "../assets/facebook.png";

function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div>
          <div className={styles.link}>
            <ul>
              <li>關於STYLiSH</li>
              <li>服務條款</li>
              <li>隱私政策</li>
              <li>聯絡我們</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className={styles.socialMedia}>
            <img alt="line" src={line} />
            <img alt="twitter" src={twitter} />
            <img alt="facebook" src={facebook} />
            <p>© 2022. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
