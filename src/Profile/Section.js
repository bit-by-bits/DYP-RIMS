import React from "react";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/profile.module.css";
import Modal from "../Common/Modal";

export default function Section(props) {
  const item = localStorage.getItem("auth_token"),
    [visible, setVisible] = React.useState(false);

  const [IC, setIC] = React.useState(0),
    [IA, setIA] = React.useState(0),
    [HI, setHI] = React.useState(0),
    [cit, setCit] = React.useState(0),
    [Qs, setQs] = React.useState([0, 0, 0, 0, 0]);

  const [modal, setModal] = React.useState({
    text: "",
    title: "",
  });

  React.useEffect(() => {
    clear();

    props.data.forEach(e => {
      setIC(IC => IC + e.i_factor);
      setCit(cit => cit + e.citations);

      switch (e.sjr) {
        case "Q1":
          setQs(Qs => [Qs[0] + 1, Qs[1], Qs[2], Qs[3], Qs[4]]);
          break;

        case "Q2":
          setQs(Qs => [Qs[0], Qs[1] + 1, Qs[2], Qs[3], Qs[4]]);
          break;

        case "Q3":
          setQs(Qs => [Qs[0], Qs[1], Qs[2] + 1, Qs[3], Qs[4]]);
          break;

        case "Q4":
          setQs(Qs => [Qs[0], Qs[1], Qs[2], Qs[3] + 1, Qs[4]]);
          break;

        default:
          setQs(Qs => [Qs[0], Qs[1], Qs[2], Qs[3], Qs[4] + 1]);
          break;
      }
    });

    setIA(props.data.length == 0 ? 0 : IC / props.data.length);

    props.data
      .map(e => e.citations ?? 0)
      .sort((a, b) => b - a)
      .forEach((e, i) => e > i + 1 && setHI(i + 1));
  }, [props.data]);

  function clear() {
    setIC(0);
    setCit(0);
    setQs([0, 0, 0, 0, 0]);
  }

  function edit() {
    setVisible(true);
    setModal({
      text: "It appears that this feature is still unavailable.",
      title: "OOPS!",
    });
  }

  function download() {
    axios({
      method: "GET",
      url: `https://rimsapi.journalchecker.com/api/v1/user/download_cv`,
      headers: { Authorization: `Bearer ${item}` },
    }).then(res => {
      setVisible(true);
      setModal({
        text: "Perhaps you haven't posted your CV yet.",
        title: "THERE SEEMS TO be an error",
      });
    });
  }

  return (
    <>
      <div className={styles.profile_section}>
        <Modal
          setVisible={setVisible}
          visible={visible}
          text={modal.text}
          title={modal.title}
        />

        <div className={styles.profile_grid}>
          <div className={styles.profile_personal}>
            <div className={styles.img_wrapper}>
              <img
                className={styles.profile_img}
                src={localStorage.getItem("user_pic")}
              />
              <svg className={styles.img_border1} viewBox="0 0 100 100">
                <path d="M95,50 A45,45 0 0,1 5,50 A45,45 0 0,1 50,5" />
              </svg>
              <svg className={styles.img_border2} viewBox="0 0 100 100">
                <path d="M95,50 A45,45 0 0,1 5,50 A45,45 0 0,1 50,5" />
              </svg>
            </div>

            <div className={styles.profile_text}>
              <div className={styles.profile_name}>
                {localStorage.getItem("user_name")}
              </div>

              <div className={styles.profile_degree}>MBBS, M.D.</div>

              <div className={styles.profile_post}>
                {localStorage.getItem("user_role")}
              </div>

              <div className={styles.profile_dept}>
                Department of {localStorage.getItem("user_dept")}
              </div>

              <div className={styles.profile_clg}>
                Dr. D. Y. Patil Medical College
              </div>

              <div onClick={edit} className={styles.profile_edit}>
                Edit Profile
              </div>
            </div>
          </div>

          <Link href="/journal">
            <div className={styles.profile_btn}>View Publications</div>
          </Link>

          <div onClick={download} className={styles.profile_btn}>
            Download CV
          </div>
        </div>

        <div className={styles.profile_feats}>
          <div className={styles.profile_feat}>
            <span>Awards: {props.extra[0] ?? 0}</span>
          </div>

          <div className={styles.profile_feat}>
            <span>Conferences: 0</span>
          </div>

          <div className={styles.profile_feat}>
            <span>Patents: 0</span>
          </div>

          <div className={styles.profile_feat}>
            <span>Publications: {props.extra[1] ?? 0}</span>
          </div>

          <div className={styles.profile_feat}>
            <span>Total Citations: {cit}</span>
          </div>

          <div className={styles.profile_feat}>
            <span>H-Index: {HI}</span>
          </div>

          <div style={{ gridColumn: "span 3" }} className={styles.profile_feat}>
            <span>
              Cumulative/Average IF: {IC?.toFixed(2)}/ {IA?.toFixed(2)}
            </span>
          </div>

          <div style={{ gridColumn: "span 3" }} className={styles.profile_feat}>
            <span>
              Q1: {Qs[0]}&nbsp; Q2: {Qs[1]}&nbsp; Q3: {Qs[2]}&nbsp; Q4: {Qs[3]}
              &nbsp; N/A: {Qs[4]}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
