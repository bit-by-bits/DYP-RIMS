import axios from "axios";
import React from "react";
import Head from "next/head";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useRouter } from "next/router";
import Navbar from "../src/Common/Navbar";
import styles from "../styles/upload.module.css";

const Upload = () => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    if (!localStorage.auth_token) router.push("/");
    else {
      const item = localStorage.getItem("auth_token"),
        animatedComponents = makeAnimated();
      const [authorList, setAuthorList] = React.useState([]);

      const [selectedOptions, setSelectedOptions] = React.useState([]),
        setHandle = (e) => {
          setSelectedOptions(
            Array.isArray(e) ? e.map((author) => author.label) : []
          );
        };

      function upload() {
        if (document.getElementById("doi_text").value == "")
          alert("Please enter a DOI first.");
        else if (selectedOptions.length == 0)
          alert("Please select an author first.");
        else {
          localStorage.setItem("authors", selectedOptions);
          router.push(
            `/uploading/${document.getElementById("doi_text").value}`
          );
        }
      }

      React.useEffect(() => {
        axios({
          method: "GET",
          url: `https://rimsapi.journalchecker.com/api/v1/publication/upload`,
          headers: { Authorization: `Bearer ${item}` },
        }).then(function (response) {
          const tempA = [];
          for (let i = 0; i < response.data.authors.length; i++) {
            tempA.push({
              value: i + 1,
              label: response.data.authors[i],
            });
          }

          setAuthorList(tempA);
        });
      }, []);

      return (
        <>
          <Head>
            <title>Upload</title>
            <link rel="icon" href="logos/qtanea.png" />
          </Head>

          <main className={styles.wrapper}>
            <Navbar />
            <div className={styles.upload_wrapper}>
              <div className={styles.upload_left}>
                <img
                  src="upload/upload.png"
                  className={styles.upload_img}
                ></img>
                <div className={styles.upload_title}>Add a file</div>

                <div className={styles.upload_msg}>
                  Kindly upload a .pdf file.
                </div>

                <label htmlFor="file" className={styles.label}>
                  <input
                    className={styles.upload_input1}
                    type="file"
                    id="file"
                    accept="application/pdf"
                  />
                  <div className={styles.upload_btn}>Select File</div>

                  <div className={styles.upload_text}>No File Selected</div>
                </label>
                <div className={styles.upload_msg}>Or add a file using DOI</div>

                <input
                  type="text"
                  id="doi_text"
                  placeholder="Enter DOI"
                  className={styles.upload_input2}
                />
              </div>

              <div className={styles.upload_right}>
                <div className={styles.upload_filters}>
                  <div className={styles.upload_filter}>
                    <div className={styles.heading}>Faculty</div>

                    <Select
                      id="author_text"
                      closeMenuOnSelect={false}
                      className={`${styles.option} ${styles.authors}`}
                      components={animatedComponents}
                      options={authorList}
                      onChange={setHandle}
                      isMulti
                    />
                  </div>

                  <div className={styles.upload_filter}>
                    <div className={styles.heading}>Type of Publication</div>

                    <Select
                      closeMenuOnSelect={false}
                      id="author_text"
                      className={`${styles.option} ${styles.authors}`}
                      components={animatedComponents}
                      options={authorList}
                      onChange={setHandle}
                      isMulti
                    />
                  </div>
                </div>

                <div onClick={upload} className={styles.upload_btn}>
                  Upload
                </div>
              </div>
            </div>
          </main>
        </>
      );
    }
  }
};

export default Upload;
