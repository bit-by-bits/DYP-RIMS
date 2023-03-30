import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Navbar from "../../src/Common/Navbar";
import Loader from "../../src/Common/Loader";
import Status from "../../src/Upload/Status";
import Details from "../../src/Upload/Details";
import styles from "../../styles/uploading.module.css";
import { useRouter } from "next/router";
import { UserContext } from "../../src/userContext";

const Uploading = () => {
  const router = useRouter();
  const { doi } = router.query;

  const [finished, setFinished] = useState(false);
  const [visible, setVisible] = useState(true);

  const [DOI, setDOI] = useState("");
  const { user, setUser } = useContext(UserContext);
  if (typeof window !== "undefined" && user.token === "") router.push("/");

  useEffect(() => {
    if (!router.isReady) return;
    setDOI(doi.join("/"));
  }, [router.isReady, doi]);

  useEffect(() => {
    if (finished)
      setTimeout(() => {
        router.push("/profile");
      }, 1999);
  }, [finished]);

  return (
    <>
      <Head>
        <title>{!finished ? "Confirm Upload" : "Uploaded"}</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Navbar />
        <Loader visible={visible} />

        <div className={styles.uploading_wrapper}>
          <Status
            img={!finished ? "/upload/uploading.png" : "/upload/uploaded.png"}
            top={
              !finished
                ? "Your file is being uploaded to RIMS."
                : "Your file has been successfully uploaded to RIMS."
            }
            bottom={
              !finished
                ? "Kindly confirm and edit the following details."
                : "Wait while we redirect you to the home page..."
            }
          />

          {!finished && (
            <Details
              setVisible={setVisible}
              setFinished={setFinished}
              doi={DOI}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Uploading;
