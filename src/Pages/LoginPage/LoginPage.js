import styles from "./LoginPage.module.sass";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage({ setHasLogin }) {
  let navigate = useNavigate();

  // signin
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInError, setSignInError] = useState("");

  // signup
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  async function onSignIn() {
    if (!isValidEmail(signInEmail)) {
      return setSignInError("Email格式不正確");
    }

    if (!signInPassword) {
      return setSignInError("請輸入密碼");
    }

    const data = {
      email: signInEmail,
      password: signInPassword,
      provider: "native",
    };

    try {
      setSignInError("");
      const result = await axios.post(`https://claudia-teng.com/api/1.0/user/signin`, data);
      localStorage.setItem("jwt", result.data.data.access_token);
      setHasLogin(true);
      navigate("/profile", { replace: true });
    } catch (err) {
      setSignInError("Email或密碼錯誤，登入失敗");
    }
  }

  async function onSignUp() {
    if (!signUpUsername) {
      return setSignUpError("請輸入使用者名稱");
    }

    if (!isValidEmail(signUpEmail)) {
      return setSignUpError("Email格式不正確");
    }

    if (!signUpPassword) {
      return setSignUpError("請輸入密碼");
    }

    if (signUpPassword.length < 6) {
      return setSignUpError("密碼必須至少包含六個字符");
    }

    const data = {
      name: signUpUsername,
      email: signUpEmail,
      password: signUpPassword,
    };
    try {
      setSignUpError("");
      const result = await axios.post(`https://claudia-teng.com/api/1.0/user/signup`, data);
      localStorage.setItem("jwt", result.data.data.access_token);
      setHasLogin(true);
      navigate("/profile", { replace: true });
    } catch (err) {
      setSignUpError("註冊失敗");
    }
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
          <p>{signInError}</p>
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
          <p>{signUpError}</p>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
