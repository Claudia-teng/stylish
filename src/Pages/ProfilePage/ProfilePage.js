import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileIcon from "../../assets/profile.png";
import styles from "./ProfilePage.module.sass";

function Profile({ setHasLogin }) {
  let navigate = useNavigate();
  const [profile, setProfile] = useState({});

  async function getProfile() {
    let token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login", { replace: true });
    }
    try {
      const result = await axios.get(`https://claudia-teng.com/api/1.0/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(result.data.data);
    } catch (err) {
      navigate("/login", { replace: true });
    }
  }

  function onLogout() {
    localStorage.removeItem("jwt");
    setHasLogin(false);
    navigate("/", { replace: true });
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <img alt="profile" src={profileIcon} />
        <label>使用者名稱</label>
        <p>{profile?.name}</p>
        <label>Email</label>
        <p>{profile?.email}</p>
        <div>
          <button onClick={onLogout}>登出</button>
        </div>
      </div>
    </>
  );
}

export default Profile;
