import Head from "next/head";
import React, { useState } from "react";
import Navbar from "../../../src/Common/Navbar";
import Status from "../../../src/Upload/Status";
import Details from "../../../src/Upload/Details";
import styles from "../../../styles/uploading.module.css";
import { useRouter } from "next/router";

const Uploading = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { doi } = router.query;
  const { doi2 } = router.query;

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("auth_token")) router.push("/");
    else {
      const check = (load) => setLoading(load);

      return (
        <>
          <Head>
            <title>{loading ? "Confirm Upload" : "Uploaded"}</title>
            <link rel="icon" href="../../logos/qtanea.png" />
          </Head>

          <main className={styles.wrapper}>
            <Navbar />
            <div className={styles.uploading_wrapper}>
              <Status
                img={
                  loading
                    ? "../../upload/uploading.png"
                    : "../../upload/uploaded.png"
                }
                top={
                  loading
                    ? "Your file is being uploaded to RIMS."
                    : "Your file has been successfully uploaded to RIMS."
                }
                bottom={
                  loading ? "Kindly confirm and edit the follwing details." : ""
                }
              />
              {loading && (
                <Details
                  alert="../../alert.png"
                  check={check}
                  authors={localStorage.getItem("authors")}
                  doi={`${doi}/${doi2}`}
                />
              )}
            </div>
          </main>
        </>
      );
    }
  }
};

export default Uploading;
