import { useEffect, useState } from "react";
import styles from "./Banner.module.sass";
import axios from "axios";

function Banner() {
  let [campaigns, setCampaigns] = useState([]);

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
        {campaigns.map((campaign) => {
          return (
            <>
              <img alt="banner" src={campaign.picture}></img>
              <div dangerouslySetInnerHTML={{ __html: campaign.story }}></div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Banner;
