import Head from "next/head";
import React, { useState } from "react";
import Navbar from "../../../../src/Common/Navbar";
import Status from "../../../../src/Upload/Status";
import Details from "../../../../src/Upload/Details";
import styles from "../../../../styles/uploading.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

const Uploading = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { doi } = router.query;
  const { doi2 } = router.query;
  const { doi3 } = router.query;

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("auth_token")) router.push("/");
    else {
      const check = (load) => setLoading(load),
        item = localStorage.getItem("auth_token");

      return (
        <>
          <Head>
            <title>{loading ? "Confirm Upload" : "Uploaded"}</title>
            <link rel="icon" href="../../logos/dpu-2.png" />
          </Head>

          <main className={styles.wrapper}>
            <Navbar />
            <div className={styles.uploading_wrapper}>
              <Status
                img={
                  loading
                    ? "../../../upload/uploading.png"
                    : "../../../upload/uploaded.png"
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
                  alert="../../../alert.png"
                  item={item}
                  check={check}
                  doi={`${doi}/${doi2}/${doi3}`}
                />
              )}
              {!loading && (
                <Link href="/journal">
                  <div className={styles.final_btn}>Return</div>
                </Link>
              )}
            </div>
          </main>
        </>
      );
    }
  }
};

export default Uploading;
