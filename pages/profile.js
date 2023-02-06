import Head from "next/head";
import styles from "../styles/profile.module.css";
import axios from "axios";
import React from "react";
import Navbar from "../src/Common/Navbar";
import Boxes from "../src/Profile/Boxes";
import Table from "../src/Profile/Table";
import Section from "../src/Profile/Section";
import Loader from "../src/Common/Loader";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter(),
    [visible, setVisible] = React.useState(true);

  const [pubs, setPubs] = React.useState([]),
    [data, setData] = React.useState([]);

  const [lawrd, setLawrd] = React.useState(0),
    [lpubs, setLpubs] = React.useState(0);

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("auth_token")) router.push("/");
    else {
      if (localStorage.getItem("user_role") == "management")
        router.push("/management");

      const item = localStorage.getItem("auth_token");
      function callback() {
        axios({
          method: "GET",
          url: `https://rimsapi.journalchecker.com/api/v1/publication`,
          headers: { Authorization: `Bearer ${item}` },
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
          url: `https://rimsapi.journalchecker.com/api/v1/user/profile/${localStorage.getItem(
            "user_id"
          )}`,
          headers: { Authorization: `Bearer ${item}` },
        }).then(function (response) {
          localStorage.setItem("user_name", response.data.name);
          localStorage.setItem("user_email", response.data.email);
          localStorage.setItem("user_dept", response.data.department);

          setData(response.data.awards);
        });

        axios({
          method: "GET",
          url: `https://rimsapi.journalchecker.com/api/v1/user/stats`,
          headers: { Authorization: `Bearer ${item}` },
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

          <main onLoad={callback} className={styles.wrapper}>
            <Loader visible={visible} />
            <Navbar />

            <div className={styles.profile_wrapper}>
              <Section data={pubs} extra={[lawrd, lpubs]} />
              <Boxes title="Awards & Achievements" data={data} />
              <Boxes title="Patents" data={data} />
              <Table data={pubs} title="Publications" setLoader={setVisible} />
              <Boxes title="Conferences" data={data} />

              <a
                href="https://www.qtanea.com/"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  alt="Q"
                  className={styles.foot}
                  src="logos/qtanea-colour.png"
                />
              </a>
            </div>
          </main>
        </>
      );
    }
  }
};

export default Profile;
