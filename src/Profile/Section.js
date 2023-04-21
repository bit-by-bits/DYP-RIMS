import Link from "next/link";
import styles from "../../styles/profile.module.css";
import { message } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";

export default function Section(props) {
  const [IC, setIC] = useState(0);
  const [IA, setIA] = useState(0);
  const [HI, setHI] = useState(0);

  const [cit, setCit] = useState(0);
  const [Qs, setQs] = useState([0, 0, 0, 0, 0]);

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
  }, [IC, props.data]);

  function clear() {
    setIC(0);
    setCit(0);
    setQs([0, 0, 0, 0, 0]);
  }

  /////////////////////////////////////////////////

  const [conf, setConf] = useState([]);

  useEffect(() => {
    if (props?.user?.name)
      axios({
        method: "GET",
        url: `${URLObj.base}/conference/${props?.user?.name}/count`,
      })
        .then(res => setConf(res.data.count))
        .catch(err => setConf("N/A"));
  }, [props?.user]);

  const edit = () => message.error("Edit functionality is still unavailable");

  const download = () => message.error("CV functionality is still unavailable");

  return (
    <>
      <div className={styles.profile_section}>
        <div className={styles.profile_grid}>
          <div className={styles.profile_personal}>
            <div className={styles.img_wrapper}>
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img alt="user" src={props?.user?.picture} />
              }
              <svg className={styles.img_border1} viewBox="0 0 100 100">
                <path d="M95,50 A45,45 0 0,1 5,50 A45,45 0 0,1 50,5" />
              </svg>
              <svg className={styles.img_border2} viewBox="0 0 100 100">
                <path d="M95,50 A45,45 0 0,1 5,50 A45,45 0 0,1 50,5" />
              </svg>
            </div>

            <div className={styles.profile_text}>
              <div className={styles.profile_name}>{props?.user?.name}</div>

              <div className={styles.profile_degree}>MBBS, M.D.</div>

              <div className={styles.profile_post}>{props?.user?.role}</div>

              <div className={styles.profile_dept}>
                Department of {props?.user?.dept}
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
          <a href="#awards" className={styles.profile_feat}>
            <span>Awards: {props.extra[0] ?? 0}</span>
          </a>

          <a href="#conferences" className={styles.profile_feat}>
            <span>Conferences: {conf}</span>
          </a>

          <a href="#patents" className={styles.profile_feat}>
            <span>Patents: 0</span>
          </a>

          <a href="#publications" className={styles.profile_feat}>
            <span>Publications: {props.extra[1] ?? 0}</span>
          </a>

          <a href="#citations" className={styles.profile_feat}>
            <span>Total Citations: {cit}</span>
          </a>

          <a href="#publications" className={styles.profile_feat}>
            <span>H-Index: {HI}</span>
          </a>

          <a
            href="#publications"
            style={{ gridColumn: "span 3" }}
            className={styles.profile_feat}
          >
            <span>
              Cumulative/Average IF: {IC?.toFixed(2)}/ {IA?.toFixed(2)}
            </span>
          </a>

          <a
            href="#publications"
            style={{ gridColumn: "span 3" }}
            className={styles.profile_feat}
          >
            <span>
              Q1: {Qs[0]}&nbsp; Q2: {Qs[1]}&nbsp; Q3: {Qs[2]}&nbsp; Q4: {Qs[3]}
              &nbsp; N/A: {Qs[4]}
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
