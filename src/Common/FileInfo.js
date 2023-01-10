import styles from "../../styles/file.module.css";
import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookOpenReader,
  faCalendarDays,
  faCheck,
  faFileAlt,
  faFileMedical,
  faHospitalUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const FileInfo = (props) => {
  const [pubs, setPubs] = React.useState([]),
    [authors, setAuthors] = React.useState("- Not Available -"),
    [dept, setDept] = React.useState("- Not Available -");

  React.useEffect(() => {
    axios({
      method: "GET",
      url: "https://rimsapi.journalchecker.com/api/v1/publication/" + props.id,
      headers: { Authorization: `Bearer ${props.item}` },
    }).then(function (response) {
      const temp_PUB = response.data.publication,
        temp_AUTH = [];

      setPubs(temp_PUB);
      setDept(temp_PUB.department.name);

      for (let i = 0; i < temp_PUB.author_name.length; i++)
        temp_AUTH.push(
          <div key={i}>
            <FontAwesomeIcon
              icon={faBookOpenReader}
              style={{ color: "#9a2827" }}
            />{" "}
            &nbsp;
            {temp_PUB.author_name[i].searchable_name}
          </div>
        );

      setAuthors(temp_AUTH);
      setTimeout(() => props.setVisible(false), 1600);
    });
  }, []);

  return (
    <>
      <div className={styles.file_text}>
        <div className={styles.file_title}>
          {pubs.publication_title == null
            ? "- Not Available -"
            : pubs.publication_title}
        </div>

        <div className={styles.file_flex}>
          <div className={styles.file_flex_child}>
            <div className={styles.smooth}>
              <div className={styles.file_head}>Journal</div>
              <div className={styles.file_body}>
                {pubs.journal_name == null ? (
                  <div>
                    <FontAwesomeIcon
                      icon={faBook}
                      style={{ color: "#9a2827" }}
                    />{" "}
                    &nbsp; - Not Available -
                  </div>
                ) : (
                  <div>
                    <FontAwesomeIcon
                      icon={faBook}
                      style={{ color: "#9a2827" }}
                    />{" "}
                    &nbsp;
                    {pubs.journal_name}
                  </div>
                )}
              </div>

              <div className={styles.smooth_row}>
                <div className={styles.file_head}>Volume</div>
                <div className={styles.file_body}>
                  {pubs.volume == null ? "- Not Available -" : pubs.volume}
                </div>
              </div>

              <div className={styles.smooth_row}>
                <div className={styles.file_head}>Issue</div>
                <div className={styles.file_body}>
                  {pubs.issue == null ? "- Not Available -" : pubs.issue}
                </div>
              </div>
            </div>

            <div className={styles.smooth}>
              <div className={styles.file_head}>Published</div>
              <div className={styles.file_body}>
                {pubs.year == null ? (
                  <div>
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      style={{ color: "#9a2827" }}
                    />{" "}
                    &nbsp; - Not Available -
                  </div>
                ) : (
                  <div>
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      style={{ color: "#9a2827" }}
                    />{" "}
                    &nbsp;
                    {pubs.year}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.smooth}>
              <div className={styles.file_head}>Department</div>
              <div className={styles.file_bodyweak}>
                {dept == null ? (
                  <div>
                    <FontAwesomeIcon
                      icon={faHospitalUser}
                      style={{ color: "#9a2827" }}
                    />{" "}
                    &nbsp; Not Added
                  </div>
                ) : (
                  <div>
                    <FontAwesomeIcon
                      icon={faHospitalUser}
                      style={{ color: "#9a2827" }}
                    />{" "}
                    &nbsp;
                    {dept}
                  </div>
                )}
              </div>
            </div>

            {/* <div className={styles.smooth}>
              <div className={styles.file_head}>Type</div>
              <div className={styles.file_body}>
                {pubs.publication_type == null
                  ? "- Not Available -"
                  : pubs.publication_type}
              </div>
            </div>

            <div className={styles.smooth}>
              <div className={styles.file_head}>Region</div>
              <div className={styles.file_body}>
                {pubs.region == null || pubs.region == "blank"
                  ? "- Not Available -"
                  : pubs.region}
              </div>
            </div> */}
          </div>

          <div className={styles.file_flex_child}>
            <div className={styles.smooth}>
              <div className={styles.file_head}>File Index</div>
              <div className={styles.file_body}>
                <div className={styles.file_bodyitem}>
                  <div className={styles.file_bodybold}>Impact Factor</div>
                  <div className={styles.file_bodyweak}>
                    {pubs.impact_factor == null ? (
                      <div>
                        <FontAwesomeIcon
                          icon={faFileAlt}
                          style={{ color: "#9a2827" }}
                        />{" "}
                        &nbsp; - Not Available -
                      </div>
                    ) : (
                      <div>
                        <FontAwesomeIcon
                          icon={faFileAlt}
                          style={{ color: "#9a2827" }}
                        />{" "}
                        &nbsp;
                        {pubs.impact_factor}
                      </div>
                    )}
                  </div>
                </div>

                <div className={`${styles.file_bodygrid} ${styles.bi_grid}`}>
                  <div className={styles.file_bodyitem}>
                    <div className={styles.file_bodybold}>H-Index</div>
                    <div className={styles.file_bodyweak}>
                      {pubs.h_index == null ? (
                        <div>
                          <FontAwesomeIcon
                            icon={faFileAlt}
                            style={{ color: "#9a2827" }}
                          />{" "}
                          &nbsp; - NA -
                        </div>
                      ) : (
                        <div>
                          <FontAwesomeIcon
                            icon={faFileAlt}
                            style={{ color: "#9a2827" }}
                          />{" "}
                          &nbsp;
                          {pubs.h_index}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.file_bodyitem}>
                    <div className={styles.file_bodybold}>SJR Quartile</div>
                    <div className={styles.file_bodyweak}>
                      {pubs.sjr == null ? (
                        <div>
                          <FontAwesomeIcon
                            icon={faFileAlt}
                            style={{ color: "#9a2827" }}
                          />{" "}
                          &nbsp; - NA -
                        </div>
                      ) : (
                        <div>
                          <FontAwesomeIcon
                            icon={faFileAlt}
                            style={{ color: "#9a2827" }}
                          />{" "}
                          &nbsp;
                          {pubs.sjr}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.smooth}>
              <div className={styles.file_head}>Authors</div>
              <div className={styles.file_body}>
                {authors == null ? (
                  <div>
                    <FontAwesomeIcon
                      icon={faBookOpenReader}
                      style={{ color: "#9a2827" }}
                    />{" "}
                    &nbsp; - Not Available -
                  </div>
                ) : (
                  authors
                )}
              </div>
            </div>

            <div className={`${styles.smooth} ${styles.smooth_row}`}>
              <div className={styles.file_head}>Citations</div>
              <div className={styles.file_body}>
                {pubs.citations == null ? "- Not Available -" : pubs.citations}
              </div>
            </div>
          </div>

          <div className={styles.file_flex_child}>
            <div className={styles.smooth}>
              <div className={styles.file_head}>Indexed In</div>
              <div className={styles.file_body}>
                <div className={styles.file_bodygrid}>
                  <FontAwesomeIcon
                    icon={pubs.in_doab ? faCheck : faXmark}
                    style={{ color: pubs.in_doab ? "green" : "red" }}
                  />
                  <div className={styles.file_bodybold}>DOAJ</div>
                  <FontAwesomeIcon
                    icon={pubs.in_embase ? faCheck : faXmark}
                    style={{ color: pubs.in_embase ? "green" : "red" }}
                  />
                  <div className={styles.file_bodybold}>Embase</div>
                  <FontAwesomeIcon
                    icon={pubs.in_medline ? faCheck : faXmark}
                    style={{ color: pubs.in_medline ? "green" : "red" }}
                  />
                  <div className={styles.file_bodybold}>Medline</div>
                  <FontAwesomeIcon
                    icon={pubs.in_pmc ? faCheck : faXmark}
                    style={{ color: pubs.in_pmc ? "green" : "red" }}
                  />
                  <div className={styles.file_bodybold}>PMC</div>
                  <FontAwesomeIcon
                    icon={pubs.in_scie ? faCheck : faXmark}
                    style={{ color: pubs.in_scie ? "green" : "red" }}
                  />
                  <div className={styles.file_bodybold}>SCIE</div>
                  <FontAwesomeIcon
                    icon={pubs.in_scopus ? faCheck : faXmark}
                    style={{ color: pubs.in_scopus ? "green" : "red" }}
                  />
                  <div className={styles.file_bodybold}>Scopus</div>
                </div>
              </div>
            </div>

            <div className={styles.smooth}>
              <div className={styles.file_head}>File ID</div>
              <div className={styles.file_body}>
                <div className={styles.file_bodyitem}>
                  <div className={styles.file_bodybold}>Pub Med ID</div>
                  <div className={styles.file_bodyweak}>
                    {pubs.pubmed_id == null || pubs.pubmed_id == "" ? (
                      <div>
                        <FontAwesomeIcon
                          icon={faFileMedical}
                          style={{ color: "#9a2827" }}
                        />{" "}
                        &nbsp; - Not Available -
                      </div>
                    ) : (
                      <div>
                        <FontAwesomeIcon
                          icon={faFileMedical}
                          style={{ color: "#9a2827" }}
                        />{" "}
                        &nbsp;
                        {pubs.pubmed_id}
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.file_bodyitem}>
                  <div className={styles.file_bodybold}>DOI ID</div>
                  <div className={styles.file_bodyweak}>
                    {pubs.doi_id == null ? (
                      <div>
                        <FontAwesomeIcon
                          icon={faFileMedical}
                          style={{ color: "#9a2827" }}
                        />{" "}
                        &nbsp; - Not Available -
                      </div>
                    ) : (
                      <div>
                        <FontAwesomeIcon
                          icon={faFileMedical}
                          style={{ color: "#9a2827" }}
                        />{" "}
                        &nbsp;
                        {pubs.doi_id}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {pubs.abstract != null && (
          <div
            className={`${styles.smooth} ${styles.abstract} ${styles.smooth_row}`}
          >
            <div className={styles.file_head}>Abstract</div>
            <div className={styles.file_body}>
              {pubs.abstract == null ? "- Not Available -" : pubs.abstract}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FileInfo;
