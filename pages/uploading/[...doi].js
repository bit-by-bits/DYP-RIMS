import Head from "next/head";
import React, { useState } from "react";
import Navbar from "../../src/Common/Navbar";
import Loader from "../../src/Common/Loader";
import Status from "../../src/Upload/Status";
import Details from "../../src/Upload/Details";
import styles from "../../styles/uploading.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

const Uploading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true),
    [visible, setVisible] = React.useState(true),
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
      const item = localStorage.getItem("auth_token");

      return (
        <>
          <Head>
            <title>{loading ? "Confirm Upload" : "Uploaded"}</title>
            <link rel="icon" href="../logos/dpu-2.png" />
          </Head>

          <main className={styles.wrapper}>
            <Navbar />
            <Loader visible={visible} />

            <div className={styles.uploading_wrapper}>
              <Status
                img={
                  loading
                    ? "/../upload/uploading.png"
                    : "/../upload/uploaded.png"
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
                  setVisible={setVisible}
                  setLoading={setLoading}
                  item={item}
                  setID={setID}
                  doi={string}
                />
              )}
              {!loading && (
                <div className={styles.uploading_btns}>
                  <Link
                    href={
                      localStorage.getItem("user_role") == "management"
                        ? "/management"
                        : "/profile"
                    }
                  >
                    <div className={styles.uploading_btn1}>Back to Profile</div>
                  </Link>
                  <Link href={`/file/${ID}/edit`}>
                    <div className={styles.uploading_btn2}>
                      Continue to Edit
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </main>
        </>
      );
    }
  }
};

export default Uploading;
