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
  const router = useRouter();
  const publications = [];

  const [pubs, setPubs] = React.useState([]),
    [data, setData] = React.useState([]),
    [awards, setAwards] = React.useState(0),
    [publs, setPubls] = React.useState(0),
    [visible, setVisible] = React.useState(true);

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
        }).then((response) => setPubs(response.data.publications));

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
          setAwards(response.data.awards);
          setPubls(response.data.publications);
        });
      }

      for (let a = 0; a < pubs.length; a++)
        publications[a] = {
          id: pubs[a].id,
          pubmed_id: pubs[a].pubmed_id,
          doi_id: pubs[a].doi_id,
          type: pubs[a].publication_type,
          title: pubs[a].publication_title,
          name: pubs[a].journal_name,
          year: pubs[a].year,
          i_factor: pubs[a].impact_factor,
          h_index: pubs[a].h_index,
          region: pubs[a].region,
          citations: pubs[a].citations,
          dept: pubs[a].department.name,
          authors: pubs[a].author_name,
          sjr: pubs[a].sjr,
          doaj: pubs[a].in_doaj,
          embase: pubs[a].in_embase,
          medline: pubs[a].in_medline,
          pmc: pubs[a].in_pmc,
          scie: pubs[a].in_scie,
          scopus: pubs[a].in_scopus,
          volume: pubs[a].volume,
          issue: pubs[a].issue,
          softcopy: true,
        };

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
              <Section awards={awards} publs={publs} />
              <Boxes title="Awards & Achievements" data={data} />
              <Boxes title="Patents" data={data} />
              <Table
                title="Publications"
                data={publications}
                setLoader={setVisible}
              />
              <Boxes title="Conferences" data={data} />

              {/* <div className={styles.footer}>Made by Qtanea</div> */}
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
