import Head from "next/head";
import styles from "../styles/profile.module.css";
import axios from "axios";
import React from "react";
import Navbar from "../src/Common/Navbar";
import Boxes from "../src/Profile/Boxes";
import Section from "../src/Profile/Section";
import { useRouter } from "next/router";
import Table from "../src/Profile/Table";

const Profile = () => {
  const router = useRouter();
  const publications = [],
    temp = [];
  const [pubs, setPubs] = React.useState(temp),
    [data, setData] = React.useState(temp);

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
        }).then(function (response) {
          temp = response.data.publications;
          setPubs(temp);
        });

        axios({
          method: "GET",
          url: `https://rimsapi.journalchecker.com/api/v1/user/profile/${localStorage.getItem(
            "user_id"
          )}`,
          headers: { Authorization: `Bearer ${item}` },
        }).then(function (response) {
          localStorage.setItem("name", response.data.name);
          temp = response.data.awards;
          setData(temp);
        });
      }

      for (let a = 0; a < pubs.length; a++)
        publications[a] = {
          title: pubs[a].publication_title,
          authors: pubs[a].author_name[0].searchable_name,
          journ: pubs[a].journal_name,
          softcopy: false,
          citations: "44",
          h_index: pubs[a].h_index,
          dept: pubs[a].department.name,
          year: pubs[a].year,
        };

      return (
        <>
          <Head>
            <title>Profile</title>
            <link rel="icon" href="logos/qtanea.png" />
          </Head>

          <main onLoad={callback} className={styles.wrapper}>
            <Navbar />
            <div className={styles.profile_wrapper}>
              <Section />
              <Boxes title="Awards & Achievements" data={data} />
              <Boxes title="Patents" data={data} />
              <Table title="Publications" data={publications} />
              <Boxes title="Conferences" data={data} />
              <div className={styles.footer}>Made by Qtanea</div>
            </div>
          </main>
        </>
      );
    }
  }
};

export default Profile;
