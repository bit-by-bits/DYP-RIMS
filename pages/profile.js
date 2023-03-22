import Head from "next/head";
import styles from "../styles/profile.module.css";
import axios from "axios";
import React, { useState, useContext } from "react";

import Navbar from "../src/Common/Navbar";
import Boxes from "../src/Profile/Boxes";
import Table from "../src/Profile/Table";
import Section from "../src/Profile/Section";
import Loader from "../src/Common/Loader";
import Image from "next/image";
import { useRouter } from "next/router";
import { UserContext } from "../src/userContext";

const Profile = () => {
  const router = useRouter(),
    [visible, setVisible] = useState(true);

  const { user, setUser } = useContext(UserContext);
  if (typeof window !== "undefined" && user.token === "") router.push("/");

  const [pubs, setPubs] = useState([]),
    [data, setData] = useState([]);

  const [lawrd, setLawrd] = useState(0),
    [lpubs, setLpubs] = useState(0);

  function callback() {
    axios({
      method: "GET",
      url: `https://rimsapi.journalchecker.com/api/v1/publication`,
      headers: { Authorization: `Bearer ${user.token}` },
    }).then(response =>
      setPubs(
        response.data.publications.map(e => ({
          id: e.id,
          pubmed_id: e.pubmed_id,
          doi_id: e.doi_id,
          type: e.publication_type,
          title: e.publication_title,
          name: e.journal_name,
          year: e.year,
          i_factor: e.impact_factor,
          h_index: e.h_index,
          region: e.region,
          citations: e.citations,
          dept: e.department.name,
          authors: e.author_name,
          sjr: e.sjr,
          doaj: e.in_doaj,
          embase: e.in_embase,
          medline: e.in_medline,
          pmc: e.in_pmc,
          scie: e.in_scie,
          scopus: e.in_scopus,
          volume: e.volume,
          issue: e.issue,
          softcopy: true,
        }))
      )
    );

    axios({
      method: "GET",
      url: `https://rimsapi.journalchecker.com/api/v1/user/profile/${user.id}`,
      headers: { Authorization: `Bearer ${user.token}` },
    }).then(response => {
      setUser({
        id: user.id,
        picture: user.picture,
        role: user.role,
        token: user.token,
        name: response.data.name,
        email: response.data.email,
        dept: response.data.department,
      });

      setData(response.data.awards);
    });

    axios({
      method: "GET",
      url: `https://rimsapi.journalchecker.com/api/v1/user/stats`,
      headers: { Authorization: `Bearer ${user.token}` },
    }).then(function (response) {
      setLawrd(response.data.awards);
      setLpubs(response.data.publications);
    });
  }

  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="logos/dpu-2.png" />
      </Head>

      <div onLoad={callback} className={styles.wrapper}>
        <Loader visible={visible} />
        <Navbar />

        <div className={styles.profile_wrapper}>
          <Section data={pubs} extra={[lawrd, lpubs]} />
          <Boxes title="Awards & Achievements" data={data} />
          <Boxes title="Patents" data={data} />
          <Table data={pubs} title="Publications" setLoader={setVisible} />
          <Boxes title="Conferences" data={data} />

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
