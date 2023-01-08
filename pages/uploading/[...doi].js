import Head from "next/head";
import React, { useState } from "react";
import Navbar from "../../src/Common/Navbar";
import Status from "../../src/Upload/Status";
import Details from "../../src/Upload/Details";
import styles from "../../styles/uploading.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

const Uploading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true),
    [ID, setID] = useState(0);

  const { doi } = router.query;
  const [string, setString] = useState("");

  React.useEffect(() => {
    if (!router.isReady) return;
    setString(doi.join("/"));
  }, [router.isReady]);

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("auth_token")) router.push("/");
    else {
      const item = localStorage.getItem("auth_token"),
        setI = (id) => setID(id),
        setL = (load) => setLoading(load);

      return (
        <>
          <Head>
            <title>{loading ? "Confirm Upload" : "Uploaded"}</title>
            <link rel="icon" href="../logos/dpu-2.png" />
          </Head>

          <main className={styles.wrapper}>
            <Navbar />
            <div className={styles.uploading_wrapper}>
              <Status
                img={
                  loading ? "/../upload/uploading.png" : "/../upload/uploaded.png"
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
                  alert="/../alert.png"
                  check={setL}
                  set={setI}
                  item={item}
                  doi={string}
                />
              )}
              {!loading && (
                <Link href={`/file/${ID}`}>
                  <div className={styles.final_btn}>Continue</div>
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
