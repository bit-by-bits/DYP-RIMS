import Head from "next/head";
import React from "react";
import axios from "axios";
import Navbar from "../../src/Common/Navbar";
import Status from "../../src/Upload/Status";
import Details from "../../src/Upload/Details";
import styles from "../../styles/Uploading.module.css";
import { useRouter } from "next/router";

const Uploading = () => {
  let loading = true;
  const router = useRouter();
  const { doi } = router.query;

  const checkout =
    typeof window !== "undefined"
      ? localStorage.auth_token === "undefined"
        ? router.push("/")
        : null
      : null;

  axios({
    method: "GET",
    url: `http://127.0.0.1:8000/api/v1/publication/upload`,
    headers: { Authorization: `Bearer ${localStorage.auth_token}` },
    data: {},
  }).then(function (response) {
    localStorage.setItem("authors", response.data.authors);
  });

  return (
    <>
      <Head>
        <title>{loading ? "Confirm Upload" : "Uploaded"}</title>
        <link rel="icon" href="../logos/qtanea.png" />
      </Head>

      <main className={styles.wrapper}>
        <Navbar />
        <div className={styles.uploading_wrapper}>
          <Status
            img={loading ? "../upload/uploading.png" : "../upload/uploaded.png"}
            top={
              loading
                ? "Your file is being uploaded to RIMS."
                : "Your file has been successfully uploaded to RIMS."
            }
            bottom={
              loading ? "Kindly confirm and edit the follwing details." : ""
            }
          />
          {loading && <Details doi={doi} />}
        </div>
      </main>
    </>
  );
};

export default Uploading;
