import styles from "./LoginPage.module.sass";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  let navigate = useNavigate();

  async function onSignIn() {
    // try {
    navigate("/profile", { replace: true });
    // const result = await axios.get(`http://3.212.173.194/api/1.0//user/signin`);
    // } catch (err) {}
  }

  async function onSignUp() {
    // try {
    //   const result = await axios.get(`http://3.212.173.194/api/1.0//user/signup`);
    // } catch (err) {}
  }

  return (
    <>
      <div className={styles.container}>
        <form>
          <h1>登入</h1>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
          <label htmlFor="password">使用者密碼</label>
          <input type="password" id="password" />
          <button onClick={onSignIn} type="button">
            登 入
          </button>
        </form>
        <form>
          <h1>註冊</h1>
          <label htmlFor="username">使用者名稱</label>
          <input type="text" />
          <label htmlFor="email">Email</label>
          <input type="email" />
          <label htmlFor="password">使用者密碼</label>
          <input type="password" />
          <button onClick={onSignUp} type="button">
            註 冊
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
