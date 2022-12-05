import axios from "axios";
import React from "react";
import Head from "next/head";
import Select from "react-select";
import makeAnimated from "react-select/animated";
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

  const [alert, setAlert] = React.useState({
    text: "",
    type: 0,
  });

  const [modal, setModal] = React.useState({
    text: "",
    title: "",
  });

  // if (typeof window !== "undefined" && localStorage.getItem("auth_token")) {
  //   var username = localStorage.getItem("user_name"),
  //     userdept = localStorage.getItem("user_dept");
  // }

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
        console.log(selectedOptions, selectedOptions2);
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
          localStorage.setItem("up_auth", selectedOptions);
          localStorage.setItem("up_dept", selectedOptions2.label);

          router.push(
            `/uploading/${document.getElementById("doi_text").value}`
          );
        }
      }

      function search() {
        const temp = [];
        document.getElementsByClassName(
          styles.upload_btn
        )[1].innerHTML = `<div class=${styles.dots} />`;

        setAuthorList([]);
        setSelectedOptions([]);
        setSelectedOptions2([]);

        axios({
          method: "POST",
          url: `https://rimsapi.journalchecker.com/api/v1/publication/upload_1`,

          headers: { Authorization: `Bearer ${item}` },
          data: { doi: document.getElementById("doi_text").value },
        })
          .then(function (res) {
            const id = res.data.publication_id;
            localStorage.setItem("up_id", id);

            axios({
              method: "GET",
              url: `https://rimsapi.journalchecker.com/api/v1/publication/upload_2/${id}`,

              headers: { Authorization: `Bearer ${item}` },
            })
              .then(function (response) {
                temp = [];

                for (let i = 0; i < response.data.authors.length; i++) {
                  temp.push({
                    value: i + 1,
                    label: response.data.authors[i],
                  });
                }

                document.getElementsByClassName(
                  styles.upload_btn
                )[1].innerHTML = "Search";
                setAuthorList(temp);
                setVisible2(true);
                setAlert({
                  text: "Success: Select your authors.",
                  type: 1,
                });
              })
              .catch(function (err) {});
          })
          .catch(function (err) {
            document.getElementsByClassName(styles.upload_btn)[1].innerHTML =
              "Search";
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
                  <div onClick={search} className={styles.upload_btn}>
                    Search
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
