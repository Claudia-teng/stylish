import { useEffect, useState } from "react";
import styles from "./Banner.module.sass";
import axios from "axios";

function Banner() {
  const [campaigns, setCampaigns] = useState([]);

  async function getCampaigns() {
    const result = await axios.get(`http://3.212.173.194/api/1.0/marketing/campaigns`);
    setCampaigns(result.data.data);
  }

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <>
      <div className={styles.banner}>
        {campaigns.length && (
          <div>
            <img alt="banner" src={campaigns[0].picture}></img>
            <div dangerouslySetInnerHTML={{ __html: campaigns[0].story }}></div>
          </div>
        )}
      </div>
    </>
  );
}

export default Banner;
