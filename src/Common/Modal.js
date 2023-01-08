import React from "react";
import styles from "../../styles/common.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = (props) => {
  window.scrollTo(0, 0);

  document.querySelector("body").style.overflowY = props.visible
    ? "hidden"
    : "auto";

  function check(e) {
    const ele = e.target.className;

    ele != styles.modal && ele != styles.modal_title && ele != styles.modal_text
      ? props.setVisible(false)
      : null;
  }

  return (
    <div
      onClick={check}
      style={props.visible ? { display: "flex" } : { display: "none" }}
      className={styles.modal_bg}
    >
      <div className={styles.modal}>
        <div className={styles.modal_title}>
          {props.title}
          <FontAwesomeIcon icon={faXmark} className={styles.x} />
        </div>
        <div className={styles.modal_text}>{props.text}</div>
      </div>
    </div>
  );
};

export default Modal;
