import styles from "../../styles/file.module.css";
import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const FileInfo = (props) => {
  const temp = [];
  const [pubs, setPubs] = React.useState(temp),
    [authors, setAuthors] = React.useState(""),
    [dept, setDept] = React.useState("");

  React.useEffect(() => {
    axios({
      method: "GET",
      url: "https://rimsapi.journalchecker.com/api/v1/publication/" + props.id,
      headers: { Authorization: `Bearer ${props.item}` },
    }).then(function (response) {
      temp = response.data.publication;
      setPubs(temp);
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
  }, []);

  return (
    <>
      <div className={styles.file_text}>
        <div className={styles.file_title}>
          {pubs.publication_title == null ? "--" : pubs.publication_title}
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
          <div className={styles.file_body}>{dept == null ? "--" : dept}</div>

          <div className={styles.file_head}>Type</div>
          <div className={styles.file_body}>
            {pubs.publication_type == null ? "--" : pubs.publication_type}
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

            <div className={styles.file_bodyitem}>
              <div className={styles.file_bodybold}>SJR Quartile</div>
              <div className={styles.file_bodyweak}>
                {pubs.sjr == null ? "--" : pubs.sjr}
              </div>
            </div>
          </div>

          <div className={styles.file_head}>Indexed In</div>
          <div className={styles.file_body}>
            <div className={styles.file_bodygrid}>
              <div className={styles.file_bodybold}>DOAJ</div>
              <FontAwesomeIcon
                icon={pubs.in_doab ? faCheck : faXmark}
                style={{ color: pubs.in_doab ? "green" : "red" }}
              />
              <div className={styles.file_bodybold}>Embase</div>
              <FontAwesomeIcon
                icon={pubs.in_embase ? faCheck : faXmark}
                style={{ color: pubs.in_embase ? "green" : "red" }}
              />
              <div className={styles.file_bodybold}>Medline</div>
              <FontAwesomeIcon
                icon={pubs.in_medline ? faCheck : faXmark}
                style={{ color: pubs.in_medline ? "green" : "red" }}
              />
              <div className={styles.file_bodybold}>PMC</div>
              <FontAwesomeIcon
                icon={pubs.in_pmc ? faCheck : faXmark}
                style={{ color: pubs.in_pmc ? "green" : "red" }}
              />
              <div className={styles.file_bodybold}>SCIE</div>
              <FontAwesomeIcon
                icon={pubs.in_scie ? faCheck : faXmark}
                style={{ color: pubs.in_scie ? "green" : "red" }}
              />
              <div className={styles.file_bodybold}>Scopus</div>
              <FontAwesomeIcon
                icon={pubs.in_scopus ? faCheck : faXmark}
                style={{ color: pubs.in_scopus ? "green" : "red" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileInfo;
