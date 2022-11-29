import axios from "axios";
import React from "react";
import Head from "next/head";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useRouter } from "next/router";
import Navbar from "../src/Common/Navbar";
import styles from "../styles/upload.module.css";
import Modal from "../src/Common/Modal";

const Upload = () => {
  const router = useRouter();
  const [authorList, setAuthorList] = React.useState([]),
    [deptList, setDeptList] = React.useState([]);

  const [visible, setVisible] = React.useState(false);
  const [modal, setModal] = React.useState({
    text: "",
    title: "",
  });

  if (typeof window !== "undefined" && localStorage.getItem("auth_token")) {
    var username = localStorage.getItem("user_name"),
      userdept = localStorage.getItem("user_dept");
  }

  const [selectedOptions, setSelectedOptions] = React.useState([]),
    [selectedOptions2, setSelectedOptions2] = React.useState([]);

  // const [selectedOptions, setSelectedOptions] = React.useState([username]),
  //   [selectedOptions2, setSelectedOptions2] = React.useState({
  //     label: userdept,
  //     value: 0,
  //   });

  const setHandle = (e) => {
    setSelectedOptions(Array.isArray(e) ? e.map((author) => author.label) : []);
  };

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("auth_token")) router.push("/");
    else {
      const item = localStorage.getItem("auth_token"),
        animatedComponents = makeAnimated();

      function upload() {
        if (document.getElementById("doi_text").value == "") {
          setVisible(true);
          setModal({
            text: "Please enter a DOI first.",
            title: "Incomplete Data",
          });
        } else if (selectedOptions.length == 0) {
          setVisible(true);
          setModal({
            text: "Please select an author first.",
            title: "Incomplete Data",
          });
        } else if (selectedOptions2 == null || selectedOptions2.length == 0) {
          setVisible(true);
          setModal({
            text: "Please select a department first.",
            title: "Incomplete Data",
          });
        } else {
          localStorage.setItem("u_auth", selectedOptions);
          localStorage.setItem("u_dept", selectedOptions2.label);

          router.push(
            `/uploading/${document.getElementById("doi_text").value}`
          );
        }
      }

      function find() {
        const temp = [];

        axios({
          method: "POST",
          url: `https://rimsapi.journalchecker.com/api/v1/publication/upload_1`,

          headers: { Authorization: `Bearer ${item}` },
          data: { doi: document.getElementById("doi_text").value },
        }).then(function (res) {
          axios({
            method: "GET",
            url: `https://rimsapi.journalchecker.com/api/v1/publication/upload_2/${res.data.publication_id}`,

            headers: { Authorization: `Bearer ${item}` },
          }).then(function (response) {
            temp = [];

            for (let i = 0; i < response.data.authors.length; i++) {
              temp.push({
                value: i + 1,
                label: response.data.authors[i],
              });
            }
            setAuthorList(temp);
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
                  <div onClick={find} className={styles.upload_btn}>
                    Find
                  </div>
                </div>
              </div>

              <div className={styles.upload_right}>
                <div className={styles.upload_filters}>
                  <div className={styles.upload_filter}>
                    <div className={styles.heading}>Author</div>

                    <Select
                      id="author_text"
                      // defaultValue={[
                      //   {
                      //     label: username,
                      //     value: 0,
                      //   },
                      // ]}
                      closeMenuOnSelect={false}
                      className={`${styles.option} ${styles.select}`}
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
                      // defaultValue={{
                      //   label: userdept,
                      //   value: 0,
                      // }}
                      closeMenuOnSelect={false}
                      className={`${styles.option} ${styles.select}`}
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
