import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../src/styles/file.module.css";
import React, { useState, useEffect } from "react";
import { FloatButton, message } from "antd";
import Side from "../../src/components/Common/Side";
import Top from "../../src/components/Common/Top";
import BookInfo from "../../src/components/Add/BookInfo";
import axios from "axios";
import URLObj from "../../src/components/baseURL";
import { useUser } from "../../src/components/context/userContext";
import Spinner from "../../src/components/Common/Spinner";

const Book = () => {
  // HOOKS

  const router = useRouter();
  const { user } = useUser();

  const { id } = router.query;
  const [ID, setID] = useState("");

  useEffect(() => {
    if (router.isReady) setID(id);
  }, [router, id]);

  // STATES

  const [visible, setVisible] = useState(true);

  // EFFECTS

  // FUNCTIONS

  const downloadBook = () => {
    message.error("Download functionality unavailable!");
  };

  const deleteBook = () => {
    const formdata = new FormData();
    formdata?.append("id", ID);

    axios({
      method: "DELETE",
      url: `${URLObj.base}/research/books/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
      },
      data: formdata,
    })
      .then(res => {
        message.success("Book deleted successfully!");
        router.push("/profile");
      })
      .catch(err => {
        message.error("Book deletion failed!");
      });
  };

  const editBook = () => {
    router.push(`/edit/book/${ID}`);
  };

  return (
    <>
      <Head>
        <title>DYPU RIMS | Book</title>
        <link rel="icon" href="../../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Spinner show={visible} />

        <FloatButton.BackTop
          style={{ left: 30, bottom: 30, borderRadius: "50%" }}
        />

        <div style={{ paddingLeft: "20vw" }}>
          <Side />

          <div className={styles.file_wrapper}>
            <Top />

            <div>
              <BookInfo user={user} setv={setVisible} ID={ID} />

              <div className={styles.file_btns}>
                {[
                  {
                    name: "Delete",
                    function: deleteBook,
                    class: styles.file_btn2,
                  },
                  {
                    name: "Edit Info",
                    function: editBook,
                    class: styles.file_btn1,
                  },
                  {
                    name: "Download",
                    function: downloadBook,
                    class: styles.file_btn2,
                  },
                ].map(btn => (
                  <div
                    key={btn.name}
                    onClick={btn.function}
                    className={btn.class}
                  >
                    {btn.name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
