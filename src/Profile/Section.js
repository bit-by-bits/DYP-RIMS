import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import styles from "../../styles/profile.module.css";
import { UserContext } from "../userContext";
import { notification } from "antd";
import Image from "next/image";

export default function Section(props) {
  const { user, setUser } = useContext(UserContext);
  const [modal, setModal] = useState({
    title: "",
    text: "",
  });

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = type => {
    api[type]({
      message: modal.title,
      description: modal.text,
    });
  };

  const [IC, setIC] = useState(0),
    [IA, setIA] = useState(0),
    [HI, setHI] = useState(0),
    [cit, setCit] = useState(0),
    [Qs, setQs] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    if (modal.title != "") openNotificationWithIcon("error");
  }, [modal]);

  useEffect(() => {
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

  const edit = () => {
    setModal({
      text: "It appears that this feature is still unavailable.",
      title: "OOPS!",
    });
  };

  const download = () => {
    setModal({
      title: "There seems to be an error",
      text: "Perhaps you haven't posted your CV yet.",
    });
  };

  return (
    <>
      {contextHolder}

      <div className={styles.profile_section}>
        <div className={styles.profile_grid}>
          <div className={styles.profile_personal}>
            <div className={styles.img_wrapper}>
              <Image alt="Me" width={100} height={100} src={user.picture} />
              <svg className={styles.img_border1} viewBox="0 0 100 100">
                <path d="M95,50 A45,45 0 0,1 5,50 A45,45 0 0,1 50,5" />
              </svg>
              <svg className={styles.img_border2} viewBox="0 0 100 100">
                <path d="M95,50 A45,45 0 0,1 5,50 A45,45 0 0,1 50,5" />
              </svg>
            </div>

            <div className={styles.profile_text}>
              <div className={styles.profile_name}>{user.name}</div>

              <div className={styles.profile_degree}>MBBS, M.D.</div>

              <div className={styles.profile_post}>{user.role}</div>

              <div className={styles.profile_dept}>
                Department of {user.dept}
              </div>

              <div className={styles.profile_clg}>
                Dr. D. Y. Patil Medical College
              </div>

              <div onClick={edit} className={styles.profile_edit}>
                Edit Profile
              </div>
            </div>
          </div>

          <Link href="/upload">
            <div className={styles.profile_btn}>Add Publications</div>
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
