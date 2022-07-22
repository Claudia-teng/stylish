import styles from "./LoginPage.module.sass";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  let navigate = useNavigate();

  // signin
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // signup
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  async function onSignIn() {
    const data = {
      email: signInEmail,
      password: signInPassword,
      provider: "native",
    };
    console.log("data", data);

    // try {
    //   const result = await axios.post(`http://3.212.173.194/api/1.0/user/signin`, data);
    //   navigate("/profile", { replace: true });
    // } catch (err) {}
  }

  async function onSignUp() {
    const data = {
      name: signUpUsername,
      email: signUpEmail,
      password: signUpPassword,
    };
    console.log("data", data);
    // try {
    //   const result = await axios.post(`http://3.212.173.194/api/1.0/user/signup`, data);
    // } catch (err) {}
  }

  return (
    <>
      <div className={styles.container}>
        <form>
          <h1>登入</h1>
          <label htmlFor="email">Email</label>
          <input value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} type="email" id="email" />
          <label htmlFor="password">使用者密碼</label>
          <input
            value={signInPassword}
            onChange={(e) => setSignInPassword(e.target.value)}
            type="password"
            id="password"
          />
          <button onClick={onSignIn} type="button">
            登 入
          </button>
        </form>
        <form>
          <h1>註冊</h1>
          <label htmlFor="username">使用者名稱</label>
          <input value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} type="text" />
          <label htmlFor="email">Email</label>
          <input value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} type="email" />
          <label htmlFor="password">使用者密碼</label>
          <input value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} type="password" />
          <button onClick={onSignUp} type="button">
            註 冊
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
