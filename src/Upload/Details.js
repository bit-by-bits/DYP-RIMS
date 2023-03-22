import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Select from "react-select";
import styles1 from "../../styles/uploading.module.css";
import styles from "../../styles/file.module.css";
import { useForm } from "react-hook-form";
import Modal from "../Common/Modal";
import URLObj from "../../src/baseURL";
import Image from "next/image";
import { UserContext } from "../userContext";

export default function Details(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState({});
  const [dataExtra, setDataExtra] = useState({});

  const { user, setUser } = useContext(UserContext);
  if (typeof window !== "undefined" && user.token === "") router.push("/");

  const [authors, setAuthors] = useState({
    disabled: false,
    options: [],
    selected: [],
  });
  const [indexed, setIndexed] = useState({ options: [] });
  const [deptList, setDeptList] = useState([]);
  const [citations, setCitations] = useState(0);

  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState({
    text: "",
    title: "",
  });

  useEffect(() => {
    console.log(data, dataExtra);
  }, [data, dataExtra]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${URLObj.cross}/${props.doi}`,
    })
      .then(response => {
        setData(response.data.message);

        const authorList = response.data.message.author;
        if (authorList) getAuthors(authorList);

        const issn = response.data.message.ISSN
          ? response.data.message.ISSN[0]
          : null;
        if (issn) getISSN(issn);

        props.setVisible(false);
      })
      .catch(error => console.log("DTE: " + error));

    axios({
      method: "GET",
      url: `${URLObj.base}/departments/all`,
    })
      .then(response => {
        setDeptList(
          response.data.departments.map(dept => ({
            value: dept.id,
            label: dept.name,
          }))
        );
      })
      .catch(error => console.log("DLE: " + error));

    axios({
      method: "GET",
      url: `${URLObj.citation}/citation-count/${props.doi}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(response => setCitations(response.data[0].count))
      .catch(error => console.log("CTE: " + error));
  }, []);

  function getISSN(issn) {
    if (issn)
      axios({
        method: "GET",
        url: `${URLObj.issn}/${issn}`,
      })
        .then(response => setDataExtra(response.data[0]))
        .catch(error => console.log("DELE: " + error));
  }

  useEffect(() => {
    const index = ["doaj", "embase", "medline", "pmc", "scie", "scopus"];
    const indexed = index.filter(i => dataExtra["in_" + i]);

    setIndexed({
      options: indexed.map((e, i) => ({
        value: i,
        label: e[0].toUpperCase() + e.slice(1),
      })),
    });
  }, [dataExtra]);

  function getAuthors(authorList) {
    setAuthors({
      disabled: authors.disabled,
      options: authorList.map((a, i) => ({
        value: i,
        label: `${a.given ?? ""} ${a.family ?? ""} ${
          a.affiliation.length ? "( " + a.affiliation[0]?.name + " )" : ""
        }`,
      })),
      selected: authorList.map((a, i) => ({
        value: i,
        label: `${a.given ?? ""} ${a.family ?? ""} ${
          a.affiliation ? "( " + a.affiliation[0]?.name + " )" : ""
        }`,
      })),
    });
  }

  function submit() {
    if (authors.selected == 0) {
      setVisible(true);
      setModal({
        text: "Please select an author first.",
        title: "Incomplete Data",
      });
    } else if (selectedDept == null || selectedDept.length == 0) {
      setVisible(true);
      setModal({
        text: "Please select a department first.",
        title: "Incomplete Data",
      });
    } else {
      let btn2 = document.getElementsByClassName(styles1.uploading_btn2)[0];
      btn2.innerHTML = `<div class=${styles1.dots} />`;

      axios({
        method: "POST",
        url: `https://rimsapi.journalchecker.com/api/v1/publication/upload_2/${localStorage.getItem(
          "upload_id"
        )}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          doi: props.doi,
          authors: selectedAuthors,
          initial_authors: authors.map(author => author.label),
        },
      })
        .then(function (response) {
          props.setID(response.data.pub_id);
          props.setLoading(false);

          localStorage.removeItem("upload_id");
          localStorage.removeItem("upload_title");
        })
        .catch(function (error) {
          console.log(error);
          const status_text = error.response.statusText;
          btn2.innerHTML = "Upload";
          setVisible(true);

          setModal({
            text: `${error.message}. Please try again.`,
            title: status_text != "" ? status_text : "An error occurred",
          });
        });
    }
  }

  return (
    <>
      <Modal
        setVisible={setVisible}
        visible={visible}
        text={modal.text}
        title={modal.title}
      />

      <div className={styles1.uploading_msg}>
        <Image src="/alert.png" width={16} height={16} alt="" />
        <span>Please choose the authors carefully.</span>
      </div>

      {data && (
        <form
          style={{ padding: "1rem 10vw" }}
          onSubmit={handleSubmit(submit)}
          className={styles.form_wrapper}
        >
          <label htmlFor="title">
            <div className={styles.label_text}>Title</div>
            <input
              defaultValue={data.title ? data.title[0] : ""}
              id="title"
              name="title"
              disabled
            />
          </label>

          <label htmlFor="journal">
            <div className={styles.label_text}>Journal</div>
            <input
              defaultValue={data["container-title"]}
              id="journal"
              name="journal"
              disabled
            />
          </label>

          <label htmlFor="volume">
            <div className={styles.label_text}>Volume</div>
            <input
              type="number"
              defaultValue={data.volume}
              id="volume"
              name="volume"
              {...register("volume", { min: 1, required: true })}
              disabled
            />
            {errors.volume && (
              <span className={styles.error_text}>This field is required</span>
            )}
          </label>

          <label htmlFor="issue">
            <div className={styles.label_text}>Issue</div>
            <input
              type="number"
              defaultValue={data.issue}
              id="issue"
              name="issue"
              {...register("issue", { min: 1, required: true })}
              disabled
            />
            {errors.issue && (
              <span className={styles.error_text}>This field is required</span>
            )}
          </label>

          <label htmlFor="pages">
            <div className={styles.label_text}>Pages</div>
            <input
              type="number"
              defaultValue={data.issue}
              id="pages"
              name="pages"
              disabled
            />
          </label>

          <label htmlFor="published">
            <div className={styles.label_text}>Published</div>
            <input
              type="text"
              defaultValue={
                data.published
                  ? data.published["date-parts"][0].reverse().join("-")
                  : ""
              }
              id="published"
              name="published"
              disabled
            />
          </label>

          <label htmlFor="hindex">
            <div className={styles.label_text}>H-index</div>
            <input
              type="number"
              defaultValue={dataExtra.h_index ?? ""}
              id="hindex"
              name="hindex"
              {...register("hindex", { min: 1, required: true })}
              disabled
            />
            {errors.hindex && (
              <span className={styles.error_text}>This field is required</span>
            )}
          </label>

          <label htmlFor="ifactor">
            <div className={styles.label_text}>Impact Factor</div>
            <input
              defaultValue={dataExtra.impact_factor ?? ""}
              id="ifactor"
              name="ifactor"
              {...register("ifactor", {})}
              disabled
            />
            {errors.ifactor && (
              <span className={styles.error_text}>This field is required</span>
            )}
          </label>

          <label htmlFor="sjrquart">
            <div className={styles.label_text}>SJR Qrt</div>
            <input
              defaultValue={dataExtra.sjr}
              id="sjrquart"
              name="sjrquart"
              {...register("sjrquart", { minLength: 2, required: true })}
              disabled
            />
            {errors.sjrquart && (
              <span className={styles.error_text}>This field is required</span>
            )}
          </label>

          <label htmlFor="citations">
            <div className={styles.label_text}>Citations</div>
            <input
              type="number"
              defaultValue={citations ?? "N/A"}
              id="citations"
              name="citations"
              {...register("citations", { min: 0, required: true })}
              disabled
            />
            {errors.citations && (
              <span className={styles.error_text}>This field is required</span>
            )}
          </label>

          <label htmlFor="indexed">
            <div className={styles.label_text}>Indexed in</div>
            <Select
              isMulti
              defaultValue={data}
              value={indexed.options}
              options={indexed.options}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  width: "30vw",
                }),
              }}
              id="indexed"
              name="indexed"
              isDisabled
            />
            {errors.indexed && (
              <span className={styles.error_text}>This field is required</span>
            )}
          </label>

          <label htmlFor="pubmedid">
            <div className={styles.label_text}>Pub Med ID</div>
            <input
              defaultValue={data.pubmed_id}
              id="pubmedid"
              name="pubmedid"
              {...register("pubmedid", { minLength: 2, required: true })}
              disabled
            />
            {errors.pubmedid && (
              <span className={styles.error_text}>This field is required</span>
            )}
          </label>

          <label htmlFor="doiid">
            <div className={styles.label_text}>DOI ID</div>
            <input
              defaultValue={data.DOI}
              id="doiid"
              name="doiid"
              {...register("doiid", { minLength: 2, required: true })}
              disabled
            />
            {errors.doiid && (
              <span className={styles.error_text}>This field is required</span>
            )}
          </label>

          <label htmlFor="abstract">
            <div className={styles.label_text}>Abstract</div>
            <input
              defaultValue={data.abstract}
              id="abstract"
              name="abstract"
              {...register("abstract", { minLength: 2, required: true })}
              disabled
            />
            {errors.abstract && (
              <span className={styles.error_text}>This field is required</span>
            )}
          </label>

          <label style={{ gridColumn: "1/span 2" }} htmlFor="authors">
            <div className={styles.label_text}>Authors</div>
            <Select
              isMulti
              placeholder="Choose Authors"
              closeMenuOnSelect={false}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  width: "calc(70vw + 1.4rem)",
                }),
              }}
              options={authors.options}
              isDisabled={authors.disabled}
              id="authors"
              name="authors"
            />
            {errors.authors && (
              <span className={styles.error_text}>This field is required</span>
            )}
          </label>

          <button
            type="button"
            onClick={() => setEdit(true)}
            className={`${styles.form_btn} ${styles.file_btn1}`}
          >
            Save Changes
          </button>

          <button
            type="submit"
            className={`${styles.form_btn} ${styles.file_btn2}`}
          >
            Submit Data
          </button>
        </form>
      )}
    </>
  );
}
