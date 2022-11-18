import Head from "next/head";
import styles from "../../styles/file.module.css";
import React from "react";
import { useRouter } from "next/router";
import Navbar from "../../src/Common/Navbar";
import axios from "axios";

const ID = () => {
  const router = useRouter();
  const { id } = router.query;
  const temp = [];
  const [pubs, setPubs] = React.useState(temp),
    [authors, setAuthors] = React.useState(""),
    [dept, setDept] = React.useState("");

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("auth_token")) router.push("/");
    else {
      const item = localStorage.getItem("auth_token");

      setInterval(() => {
        if (router.isReady) {
          axios({
            method: "GET",
            url: "https://rimsapi.journalchecker.com/api/v1/publication/" + id,
            headers: { Authorization: `Bearer ${item}` },
          }).then(function (response) {
            temp = response.data.publication;
            setPubs(temp);
            console.log(temp);
            setDept(temp.department.name);

            let extra = "";
            for (let i = 0; i < temp.author_name.length; i++) {
              setAuthors(
                (extra +=
                  temp.author_name[i].searchable_name +
                  (i != temp.author_name.length - 1 ? ", " : ""))
              );
            }
          });
        }
      }, 1000);

      return (
        <>
          <Head>
            <title>File</title>
            <link rel="icon" href="logos/dpu-2.png" />
          </Head>

          <main className={styles.wrapper}>
            <Navbar />

            <div className={styles.file_wrapper}>
              <div className={styles.file_text}>
                <div className={styles.file_title}>
                  {pubs.publication_title == null
                    ? "--"
                    : pubs.publication_title}
                </div>

                <div className={styles.file_grid}>
                  <div className={styles.file_head}>Authors</div>
                  <div className={styles.file_body}>
                    {authors == null ? "--" : authors}
                  </div>

                  <div className={styles.file_head}>Journal</div>
                  <div className={styles.file_body}>
                    {pubs.journal_name == null ? "--" : pubs.journal_name}
                  </div>

                  <div className={styles.file_head}>Published</div>
                  <div className={styles.file_body}>
                    {pubs.year == null ? "--" : pubs.year}
                  </div>

                  <div className={styles.file_head}>Citations</div>
                  <div className={styles.file_body}>
                    {pubs.citations == null ? "--" : pubs.citations}
                  </div>

                  <div className={styles.file_head}>Department</div>
                  <div className={styles.file_body}>
                    {dept == null ? "--" : dept}
                  </div>

                  <div className={styles.file_head}>Type</div>
                  <div className={styles.file_body}>
                    {pubs.publication_type == null
                      ? "--"
                      : pubs.publication_type}
                  </div>

                  <div className={styles.file_head}>Region</div>
                  <div className={styles.file_body}>
                    {pubs.region == null ? "--" : pubs.region}
                  </div>

                  <div className={styles.file_head}>File ID</div>
                  <div className={styles.file_body}>
                    <div className={styles.file_bodyitem}>
                      <div className={styles.file_bodybold}>Pub Med ID</div>
                      <div className={styles.file_bodyweak}>
                        {pubs.pubmed_id == null ? "--" : pubs.pubmed_id}
                      </div>
                    </div>

                    <div className={styles.file_bodyitem}>
                      <div className={styles.file_bodybold}>DOI ID</div>
                      <div className={styles.file_bodyweak}>
                        {pubs.doi_id == null ? "--" : pubs.doi_id}
                      </div>
                    </div>
                  </div>

                  <div className={styles.file_head}>File Index</div>
                  <div className={styles.file_body}>
                    <div className={styles.file_bodyitem}>
                      <div className={styles.file_bodybold}>Impact Factor</div>
                      <div className={styles.file_bodyweak}>
                        {pubs.impact_factor == null ? "--" : pubs.impact_factor}
                      </div>
                    </div>

                    <div className={styles.file_bodyitem}>
                      <div className={styles.file_bodybold}>Hirsch Index</div>
                      <div className={styles.file_bodyweak}>
                        {pubs.h_index == null ? "--" : pubs.h_index}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.file_btns}>
                <div className={styles.file_btn1}>Download</div>

                <div className={styles.file_btn2}>Edit</div>
              </div>

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

export default ID;
