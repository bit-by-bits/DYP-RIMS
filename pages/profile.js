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

  if (typeof window !== "undefined") {
    if (!localStorage.auth_token) router.push("/");
    else {
      if (localStorage.getItem("user_role") == "management")
        router.push("/management");

      const awards = [4];
      for (let a = 0; a < 4; a++)
        awards[a] = { what: "Best paper award IJDVL", when: "Jan 2015" };

      const publications = [],
        temp = [];
      const item = localStorage.getItem("auth_token");
      const [pubs, setPubs] = React.useState(temp);

      React.useEffect(() => {
        axios({
          method: "GET",
          url: `https://rimsapi.journalchecker.com/api/v1/publication`,
          headers: { Authorization: `Bearer ${item}` },
        }).then(function (response) {
          temp = response.data.publications;
          setPubs(temp);
        });
      }, []);

      for (let a = 0; a < pubs.length; a++)
        publications[a] = {
          title: pubs[a].publication_title,
          authors: pubs[a].author_name[0].searchable_name,
          journ: pubs[a].journal_name,
          softcopy: false,
          citations: "44",
          metric1: "12.3",
          metric2: "9.64%",
          year: pubs[a].year,
        };

      return (
        <>
          <Head>
            <title>Profile</title>
            <link rel="icon" href="logos/qtanea.png" />
          </Head>

          <main className={styles.wrapper}>
            <Navbar />
            <div className={styles.profile_wrapper}>
              <Section />
              <Boxes title="Awards & Achievements" data={awards} />
              <Boxes title="Patents" data={awards} />
              <Table title="Publications" data={publications} />
              <Boxes title="Conferences" data={awards} />
              <div className={styles.footer}>Made by Qtanea</div>
            </div>
          </main>
        </>
      );
    }
  }
};

export default Profile;
