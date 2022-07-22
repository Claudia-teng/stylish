import axios from "axios";
import { useEffect, useState } from "react";
import profileIcon from "../../assets/profile.png";
import styles from "./ProfilePage.module.sass";

function Profile() {
  const [profile, setProfile] = useState({});

  // async function getProfile() {
  //   const result = await axios.get(`http://3.212.173.194/api/1.0/user/profile`);
  //   setProfile(result.data.data);
  // }

  // useEffect(() => {
  //   getProfile();
  // }, []);

  return (
    <>
      <div className={styles.container}>
        <img alt="profile" src={profileIcon} />
        {/* <p>{profile.name}</p>
        <p>{profile.email}</p> */}
      </div>
    </>
  );
}

export default Profile;
