import axios from "axios";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../src/Common/Navbar";
import styles from "../styles/upload.module.css";
import Modal from "../src/Common/Modal";
import Alert from "../src/Common/Alert";

const Upload = () => {
  const router = useRouter();

  const [authorList, setAuthorList] = React.useState([]),
    [deptList, setDeptList] = React.useState([]);

  const [visible, setVisible] = React.useState(false),
    [visible2, setVisible2] = React.useState(false);

  const [selectedOptions, setSelectedOptions] = React.useState([]),
    [selectedOptions2, setSelectedOptions2] = React.useState([]);

  const [searching, setSearching] = React.useState(false);

  const setHandle = (e) => {
    setSelectedOptions(Array.isArray(e) ? e.map((author) => author.label) : []);
  };

  const [alert, setAlert] = React.useState({
    text: "",
    type: 0,
  });

  const [modal, setModal] = React.useState({
    text: "",
    title: "",
  });

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("auth_token")) router.push("/");
    else {
      const item = localStorage.getItem("auth_token");

      function search() {
        const temp = [],
          doi = document.getElementById("doi_text").value;

        setSearching(true);
        setAuthorList([]);
        setSelectedOptions([]);
        setSelectedOptions2([]);

        axios({
          method: "POST",
          url: `https://rimsapi.journalchecker.com/api/v1/publication/upload_1`,

          headers: { Authorization: `Bearer ${item}` },
          data: { doi: doi },
        })
          .then(function (res) {
            localStorage.setItem("upload_id", res.data.publication_id);
            localStorage.setItem("upload_title", res.data.publication_title);

            setSearching(false);
            setAuthorList(temp);
            setVisible2(true);
            setAlert({
              text: "Success: Redirecting you now..",
              type: 1,
            });

            setTimeout(() => {
              router.push(`/uploading/${doi}`);
            }, 1001);
          })
          .catch(function (err) {
            setSearching(false);
            setVisible2(true);
            setAlert({
              text: "Failed: Enter a valid DOI.",
              type: 2,
            });
          });

        axios({
          method: "GET",
          url: `https://rimsapi.journalchecker.com/api/v1/publication/upload`,

          headers: { Authorization: `Bearer ${item}` },
        }).then(function (response) {
          temp = [];

          for (let i = 0; i < response.data.departments.length; i++) {
            temp.push({
              value: i + 1,
              label: response.data.departments[i],
            });
          }
          setDeptList(temp);
        });
      }

      return (
        <>
          <Head>
            <title>Upload</title>
            <link rel="icon" href="logos/dpu-2.png" />
          </Head>

          <main className={styles.wrapper}>
            <Navbar />
            <Modal
              setVisible={setVisible}
              visible={visible}
              text={modal.text}
              title={modal.title}
            />
            <Alert
              setVisible={setVisible2}
              visible={visible2}
              text={alert.text}
              type={alert.type}
            />

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
                <div className={styles.flex}>
                  <input
                    type="text"
                    id="doi_text"
                    placeholder="Enter DOI"
                    className={styles.upload_input2}
                  />
                  <div className={styles.dots} />
                  {searching ? (
                    <div className={styles.upload_btn}>
                      <div className={styles.dots} />
                    </div>
                  ) : (
                    <div onClick={search} className={styles.upload_btn}>
                      Search
                    </div>
                  )}
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
