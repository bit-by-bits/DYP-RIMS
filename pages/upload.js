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
  const [authorList, setAuthorList] = React.useState([]),
    [deptList, setDeptList] = React.useState([]),
    [selectedOptions, setSelectedOptions] = React.useState([]),
    [selectedOptions2, setSelectedOptions2] = React.useState([]);

  const setHandle = (e) => {
    setSelectedOptions(Array.isArray(e) ? e.map((author) => author.label) : []);
  };

  React.useEffect(() => {
    callback();
  }, []);

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("auth_token")) router.push("/");
    else {
      const item = localStorage.getItem("auth_token"),
        animatedComponents = makeAnimated();

      function upload() {
        if (document.getElementById("doi_text").value == "")
          alert("Please enter a DOI first.");
        else if (selectedOptions.length == 0)
          alert("Please select an author first.");
        else if (selectedOptions2 == null || selectedOptions2.length == 0)
          alert("Please select a department first.");
        else {
          localStorage.setItem("u_auth", selectedOptions);
          localStorage.setItem("u_dept", selectedOptions2.label);

          router.push(
            `/uploading/${document.getElementById("doi_text").value}`
          );
        }
      }

      function callback() {
        axios({
          method: "GET",
          url: `https://rimsapi.journalchecker.com/api/v1/publication/upload`,
          headers: { Authorization: `Bearer ${item}` },
        }).then(function (response) {
          const tempA = [],
            tempB = [];
          for (let i = 0; i < response.data.authors.length; i++) {
            tempA.push({
              value: i + 1,
              label: response.data.authors[i],
            });
          }
          for (let i = 0; i < response.data.departments.length; i++) {
            tempB.push({
              value: i + 1,
              label: response.data.departments[i],
            });
          }
          setAuthorList(tempA);
          setDeptList(tempB);
        });
      }

      return (
        <>
          <Head>
            <title>Upload</title>
            <link rel="icon" href="logos/dpu-2.png" />
          </Head>

          <main onLoad={callback} className={styles.wrapper}>
            <Navbar />
            <div className={styles.upload_wrapper}>
              <div className={styles.upload_left}>
                <img
                  alt="ADD"
                  src="upload/upload.png"
                  className={styles.upload_img}
                />
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
                    <div className={styles.heading}>Author</div>

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
                    <div className={styles.heading}>Department</div>

                    <Select
                      id="dept_text"
                      closeMenuOnSelect={false}
                      className={`${styles.option} ${styles.authors}`}
                      isClearable={true}
                      options={deptList}
                      onChange={setSelectedOptions2}
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
