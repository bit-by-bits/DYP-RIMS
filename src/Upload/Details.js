import React from "react";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useRouter } from "next/router";
import styles from "../../styles/uploading.module.css";
import Modal from "../Common/Modal";

export default function Details(props) {
  const router = useRouter();

  if (typeof window !== "undefined" && localStorage.getItem("auth_token")) {
    var username = localStorage.getItem("user_name"),
      userdept = localStorage.getItem("user_dept");

    var uploadtitle = localStorage.getItem("upload_title"),
      uploadid = localStorage.getItem("upload_id");
  }

  const [selectedAuthors, setSelectedAuthors] = React.useState([username]),
    [selectedDisplay, setSelectedDisplay] = React.useState([username]),
    [selectedDept, setSelectedDept] = React.useState({
      label: userdept,
      value: 0,
    });

  const [authorList, setAuthorList] = React.useState([]),
    [displayList, setDisplayList] = React.useState([]),
    [deptList, setDeptList] = React.useState([]);

  const [visible, setVisible] = React.useState(false),
    [visible2, setVisible2] = React.useState(false);

  const [title, setTitle] = React.useState("Please check the required fields."),
    animatedComponents = makeAnimated();

  const setHandle = (newArray) => {
    setSelectedAuthors(
      Array.isArray(newArray) ? newArray.map((eachItem) => eachItem.label) : []
    );

    setSelectedDisplay(
      Array.isArray(newArray)
        ? newArray.map((eachItem) => authorList[eachItem.value].label)
        : []
    );
  };

  const [modal, setModal] = React.useState({
    text: "",
    title: "",
  });

  React.useEffect(() => {
    uploadtitle != "undefined" &&
      setTitle("You are uploading " + uploadtitle + ".");

    axios({
      method: "GET",
      url: `https://rimsapi.journalchecker.com/api/v1/publication/upload_2/${uploadid}`,

      headers: { Authorization: `Bearer ${props.item}` },
    }).then(function (response) {
      const temp1 = [
        {
          value: 0,
          label: username,
        },
      ];

      for (let i = 0; i < response.data.authors.length; i++)
        temp1.push({
          value: i + 1,
          label: response.data.authors[i],
        });
      setAuthorList(temp1);

      const temp2 = [
        {
          value: 0,
          label: username + " - " + userdept,
        },
      ];
      for (let i = 0; i < response.data.display_authors.length; i++)
        temp2.push({
          value: i + 1,
          label: response.data.display_authors[i],
        });
      setDisplayList(temp2);
    });

    axios({
      method: "GET",
      url: `https://rimsapi.journalchecker.com/api/v1/publication/upload`,

      headers: { Authorization: `Bearer ${props.item}` },
    }).then(function (response) {
      const temp = [];

      for (let i = 0; i < response.data.departments.length; i++)
        temp.push({
          value: i + 1,
          label: response.data.departments[i],
        });
      setDeptList(temp);
    });
  }, []);

  function submit() {
    if (selectedAuthors.length == 0) {
      setVisible(true);
      setModal({
        text: "Please select an eachItem first.",
        title: "Incomplete Data",
      });
    } else if (selectedDept == null || selectedDept.length == 0) {
      setVisible(true);
      setModal({
        text: "Please select a department first.",
        title: "Incomplete Data",
      });
    } else {
      document.getElementsByClassName(
        styles.uploading_btn2
      )[0].innerHTML = `<div class=${styles.dots} />`;

      axios({
        method: "POST",
        url: `https://rimsapi.journalchecker.com/api/v1/publication/upload_2/${localStorage.getItem(
          "upload_id"
        )}`,
        headers: {
          Authorization: `Bearer ${props.item}`,
        },
        data: {
          doi: props.doi,
          authors: selectedAuthors,
          initial_authors: authorList.map((author) => author.label),
        },
      })
        .then(function (response) {
          props.check(false);
          localStorage.removeItem("upload_id");
        })
        .catch(function (error) {
          console.log(error);
          const status_text = error.response.statusText;

          document.getElementsByClassName(styles.uploading_btn2)[0].innerHTML =
            "Upload";

          setVisible(true);
          setModal({
            text: `${error.message}. Please try again.`,
            title: status_text != "" ? status_text : "An error occurred",
          });
        });
    }
  }

  function cancel() {
    router.push("/upload");
  }

  return (
    <>
      <Modal
        setVisible={setVisible}
        visible={visible}
        text={modal.text}
        title={modal.title}
      />

      <div className={styles.uploading_msg}>
        <img src={props.alert} className={styles.uploading_alert} />
        <span>{title}</span>
      </div>

      <div className={styles.uploading_flex}>
        <div className={styles.uploading_info}>
          <div className={styles.uploading_title}>Authors</div>
          <Select
            id="author_text"
            // defaultValue={[
            //   {
            //     label: username,
            //     value: 0,
            //   },
            // ]}
            closeMenuOnSelect={false}
            className={`${styles.uploading_box} ${styles.uploading_select}`}
            components={animatedComponents}
            options={displayList}
            onChange={setHandle}
            isMulti
          />
        </div>

        <div className={styles.uploading_info}>
          <div className={styles.uploading_title}>Department</div>
          <Select
            id="dept_text"
            defaultValue={{
              label: userdept,
              value: 0,
            }}
            closeMenuOnSelect={false}
            className={`${styles.uploading_box} ${styles.uploading_select}`}
            isClearable={true}
            options={deptList}
            onChange={setSelectedDept}
          />
        </div>

        <div className={styles.uploading_info}>
          <div className={styles.uploading_title}>DOI</div>
          <div className={styles.uploading_box}>{props.doi}</div>
        </div>
      </div>

      <div className={styles.uploading_btns}>
        <div onClick={cancel} className={styles.uploading_btn1}>
          Cancel
        </div>
        <div onClick={submit} className={styles.uploading_btn2}>
          Upload
        </div>
      </div>
    </>
  );
}
