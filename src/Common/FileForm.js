import React, { useContext } from "react";
import axios from "axios";
import styles from "../../styles/file.module.css";
import { useForm } from "react-hook-form";
import { UserContext } from "../userContext";

const FileForm = props => {
  const { user, setUser } = useContext(UserContext);
  if (typeof window !== "undefined" && user.token === "") router.push("/");

  function onSubmit(data) {}

  function handleReset() {
    reset({
      abstract: pub.abstract,
      authors: authors,
      citations: pub.citations,
      department: dept,
      doiid: pub.doi_id,
      hindex: pub.h_index,
      ifactor: pub.impact_factor,
      indexed: pub,
      issue: pub.issue,
      journal: pub.journal,
      published: pub.year,
      pubmedid: pub.pubmed_id,
      sjrquart: pub.sjr,
      title: pub.publication_title,
      volume: pub.volume,
    });
  }

  const [pub, setPub] = React.useState([]),
    [authors, setAuthors] = React.useState(""),
    [dept, setDept] = React.useState("");

  React.useEffect(() => {
    axios({
      method: "GET",
      url: "https://rimsapi.journalchecker.com/api/v1/publication/" + props.id,
      headers: { Authorization: `Bearer ${user.token}` },
    }).then(function (response) {
      const temp_PUB = response.data.publication,
        temp_AUTH = [];

      const an = temp_PUB.author_name;
      for (let i = 0; i < an.length; i++)
        temp_AUTH += an[i].searchable_name + (i != an.length - 1 ? ", " : "");

      setPub(temp_PUB);
      setAuthors(temp_AUTH);
      setDept(temp_PUB.department.name);

      clearErrors();
      handleReset();

      setTimeout(() => props.setVisible(false), 1600);
    });
  }, []);

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_wrapper}>
      <label htmlFor="title">
        <div className={styles.label_text}>Title</div>
        <input
          defaultValue={pub.publication_title}
          id="title"
          name="title"
          {...register("title", { minLength: 2, required: true })}
        />
        {errors.title && (
          <span className={styles.error_text}>This field is required</span>
        )}
      </label>

      <label htmlFor="journal">
        <div className={styles.label_text}>Journal</div>
        <input
          defaultValue={pub.journal_name}
          id="journal"
          name="journal"
          {...register("journal", { minLength: 2, required: true })}
        />
        {errors.journal && (
          <span className={styles.error_text}>This field is required</span>
        )}
      </label>

      <label htmlFor="volume">
        <div className={styles.label_text}>Volume</div>
        <input
          type="number"
          defaultValue={pub.volume}
          id="volume"
          name="volume"
          {...register("volume", { min: 1, required: true })}
        />
        {errors.volume && (
          <span className={styles.error_text}>This field is required</span>
        )}
      </label>

      <label htmlFor="issue">
        <div className={styles.label_text}>Issue</div>
        <input
          type="number"
          defaultValue={pub.issue}
          id="issue"
          name="issue"
          {...register("issue", { min: 1, required: true })}
        />
        {errors.issue && (
          <span className={styles.error_text}>This field is required</span>
        )}
      </label>

      <label htmlFor="published">
        <div className={styles.label_text}>Published</div>
        <input
          type="date"
          defaultValue={pub.year}
          id="published"
          name="published"
          {...register("published", {})}
        />
        {errors.published && (
          <span className={styles.error_text}>This field is required</span>
        )}
      </label>

      <label htmlFor="department">
        <div className={styles.label_text}>Department</div>
        <input
          defaultValue={dept}
          id="department"
          name="department"
          {...register("department", { minLength: 2, required: true })}
        />
        {errors.department && (
          <span className={styles.error_text}>This field is required</span>
        )}
      </label>

      <label htmlFor="hindex">
        <div className={styles.label_text}>H-index</div>
        <input
          type="number"
          defaultValue={pub.h_index}
          id="hindex"
          name="hindex"
          {...register("hindex", { min: 1, required: true })}
        />
        {errors.hindex && (
          <span className={styles.error_text}>This field is required</span>
        )}
      </label>

      <label htmlFor="ifactor">
        <div className={styles.label_text}>I-factor</div>
        <input
          defaultValue={pub.impact_factor}
          id="ifactor"
          name="ifactor"
          {...register("ifactor", {})}
        />
        {errors.ifactor && (
          <span className={styles.error_text}>This field is required</span>
        )}
      </label>

      <label htmlFor="sjrquart">
        <div className={styles.label_text}>SJR Qrt</div>
        <input
          defaultValue={pub.sjr}
          id="sjrquart"
          name="sjrquart"
          {...register("sjrquart", { minLength: 2, required: true })}
        />
        {errors.sjrquart && (
          <span className={styles.error_text}>This field is required</span>
        )}
      </label>

      <label htmlFor="authors">
        <div className={styles.label_text}>Authors</div>
        <input
          defaultValue={authors}
          id="authors"
          name="authors"
          {...register("authors", { minLength: 2, required: true })}
        />
        {errors.authors && (
          <span className={styles.error_text}>This field is required</span>
        )}
      </label>

      <label htmlFor="citations">
        <div className={styles.label_text}>Citations</div>
        <input
          type="number"
          defaultValue={pub.citations}
          id="citations"
          name="citations"
          {...register("citations", { min: 0, required: true })}
        />
        {errors.citations && (
          <span className={styles.error_text}>This field is required</span>
        )}
      </label>

      <label htmlFor="indexed">
        <div className={styles.label_text}>Indexed in</div>
        <input
          defaultValue={pub}
          id="indexed"
          name="indexed"
          {...register("indexed", { minLength: 2, required: true })}
        />
        {errors.indexed && (
          <span className={styles.error_text}>This field is required</span>
        )}
      </label>

      <label htmlFor="pubmedid">
        <div className={styles.label_text}>Pub Med ID</div>
        <input
          defaultValue={pub.pubmed_id}
          id="pubmedid"
          name="pubmedid"
          {...register("pubmedid", { minLength: 2, required: true })}
        />
        {errors.pubmedid && (
          <span className={styles.error_text}>This field is required</span>
        )}
      </label>

      <label htmlFor="doiid">
        <div className={styles.label_text}>DOI ID</div>
        <input
          defaultValue={pub.doi_id}
          id="doiid"
          name="doiid"
          {...register("doiid", { minLength: 2, required: true })}
        />
        {errors.doiid && (
          <span className={styles.error_text}>This field is required</span>
        )}
      </label>

      <label htmlFor="abstract" style={{ gridColumn: "1 / span 2" }}>
        <div className={styles.label_text}>Abstract</div>
        <input
          defaultValue={pub.abstract}
          id="abstract"
          name="abstract"
          style={{ width: "72vw" }}
          {...register("abstract", { minLength: 2, required: true })}
        />
        {errors.abstract && (
          <span className={styles.error_text}>This field is required</span>
        )}
      </label>

      <button
        type="reset"
        onClick={handleReset}
        className={`${styles.form_btn} ${styles.file_btn1}`}
      >
        Revert Back
      </button>

      <button
        type="submit"
        className={`${styles.form_btn} ${styles.file_btn2}`}
      >
        Apply Changes
      </button>
    </form>
  );
};

export default FileForm;
