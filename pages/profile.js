import Head from "next/head";
import styles from "../styles/profile.module.css";
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import Navbar from "../src/Common/Navbar";
import Boxes from "../src/Profile/Boxes";
import Section from "../src/Profile/Section";
import PubTable from "../src/Profile/Table";
import Loader from "../src/Common/Loader";
import Image from "next/image";
import { useRouter } from "next/router";
import { UserContext } from "../src/userContext";
import URLObj from "../src/baseURL";

const Profile = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(true);

  const { user, setUser } = useContext(UserContext);
  if (typeof window !== "undefined" && user.token === "") router.push("/");

  const [pubs, setPubs] = useState([]);
  const [conf, setConf] = useState([]);

  const [lawrd, setLawrd] = useState(0);
  const [lpubs, setLpubs] = useState(0);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${URLObj.base}/user/profile/${user.id}`,
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then(res => {
        setUser({
          id: user.id,
          picture: user.picture,
          role: user.role,
          token: user.token,
          name: res.data.name,
          email: res.data.email,
          dept: res.data.department,
        });
      })
      .catch(err => {
        setUser(user);
      });
  }, []);

  useEffect(() => {
    if (user.name != "" && user.token != "") {
      axios({
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
        url: `${URLObj.base}/publication/view/${user.name}`,
      })
        .then(res => setPubs(res.data.data))
        .catch(err => setPubs([]));

      axios({
        method: "GET",
        url: `${URLObj.base}/user/stats`,
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then(res => {
          setLawrd(res.data.awards);
          setLpubs(res.data.publications);
        })
        .catch(err => {
          setLawrd(0);
          setLpubs(0);
        });

      axios({
        method: "GET",
        url: `${URLObj.base}/conference/${user.name}/view`,
      })
        .then(res => {
          setConf(
            res.data.data.map(d => ({
              name: d.conference_name,
              time: d.date,
              venue: d.location,
              pdf: d.certificate ?? "",
            }))
          );
        })
        .catch(err => setConf([]));
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Loader visible={visible} />
        <Navbar />

        <div className={styles.profile_wrapper}>
          <Section data={pubs} extra={[lawrd, lpubs]} />
          <Boxes title="Awards & Achievements" data={[]} />
          <Boxes title="Patents" data={[]} />
          <PubTable pubData={pubs} setLoader={setVisible} />
          <Boxes title="Conferences" data={conf} />

          <a href="https://www.qtanea.com/" rel="noreferrer" target="_blank">
            <Image
              alt="Q"
              width={60}
              height={60}
              className={styles.foot}
              src="/logos/qtanea-colour.png"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Profile;
