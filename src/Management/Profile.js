import React from "react";
import styles from "../../styles/management.module.css";

export default function Profile(props) {
  const items = [];
  for (let a = 0; a < 6; a++) {
    items.push(
      <div key={a} className={styles.profile_scrollitem}>
        <div className={styles.profile_scrollevent}>{props.data[a].what}</div>
        <div className={styles.profile_scrolltime}>{props.data[a].when}</div>
      </div>
    );
  }
  
  return (
    <>
      <div className={styles.profile_section}>
        <div className={styles.profile_grid}>
          <div className={styles.profile_personal}>
            <img src="doctah.png" className={styles.profile_img}></img>
            <div className={styles.profile_text}>
              <div className={styles.profile_name}>Dr FirstName LastName</div>

              <div className={styles.profile_post}>Associate Professor</div>

              <div className={styles.profile_clg}>
                Dr. D. Y. Patil Medical College
              </div>

              <div className={styles.profile_edit}>Edit Profile Details</div>
            </div>
          </div>

          <div className={styles.search}>
            <img src="search.png" />
            <input
              type="text"
              placeholder="Search for Department or Faculty"
              className={styles.input}
            />
          </div>

          <div className={styles.profile_scroll}>
            <div className={styles.profile_scrolltop}>This weeks updates</div>
            <div className={styles.profile_scrollbody}>{items}</div>
          </div>

          <div className={styles.profile_btn1}>
            <span>Add a file</span>
          </div>

          <div className={styles.profile_btn2}>
            <span>Download CV</span>
          </div>
        </div>
      </div>
    </>
  );
}
