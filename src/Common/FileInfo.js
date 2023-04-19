// import styles from "../../styles/file.module.css";
// import React, { useState, useEffect  } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCheck,
//   faFileAlt,
//   faFileMedical,
//   faXmark,
// } from "@fortawesome/free-solid-svg-icons";
//
// import URLObj from "../baseURL";

// const FileInfo = props => {
//   const [user, setUser] = useState({});

// useEffect(() => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   setUser(user);
// }, []);
//
//   useEffect(() => {
//     if (typeof window !== "undefined" && user.token === "") router.push("/");
//   }, [router, user]);

//   const [pubs, setPubs] = useState([]);
//   const [authors, setAuthors] = useState("- Not Available -");
//   const [dept, setDept] = useState("- Not Available -");

//   useEffect(() => {
//     axios({
//       method: "GET",
//       url: `${URLObj.base}/publication/${props.id}`,
//       headers: { Authorization: `Bearer ${user.token}` },
//     }).then(function (response) {
//       const temp_PUB = response.data.publication,
//         temp_AUTH = [];

//       for (let i = 0; i < temp_PUB.author_name.length; i++)
//         temp_AUTH.push(temp_PUB.author_name[i].searchable_name);

//       setPubs(temp_PUB);
//       setDept(temp_PUB.department.name);
//       setAuthors(temp_AUTH.join(" · "));

//       setTimeout(() => props.setVisible(false), 1600);
//     });
//   }, []);

//   return (
//     <>
//       <div className={styles.file_text}>
//         <div className={styles.file_tags}>
//           {pubs.region != "blank" && (
//             <div className={styles.file_tag2}>{pubs.region}</div>
//           )}
//           {pubs.publication_type && (
//             <div className={styles.file_tag1}>
//               {pubs.publication_type.split(/(?=[A-Z])/).join(" ")}
//             </div>
//           )}

//           <div className={styles.file_tag2}>PDF Not Available</div>
//         </div>

//         <div className={styles.file_title}>
//           {pubs.publication_title
//             ? pubs.publication_title
//             : "- Not Available -"}
//         </div>

//         <div className={styles.file_info}>
//           <div className={styles.file_info_box}>
//             <div>
//               <div className={styles.info}>
//                 <span className={styles.info_head}>Journal</span>
//                 <span className={styles.info_body}>
//                   {pubs.journal_name ? pubs.journal_name : "- Not Available -"}
//                 </span>
//               </div>
//             </div>

//             <div>
//               <div className={styles.info}>
//                 <span className={styles.info_head}>Volume</span>
//                 <span className={styles.info_body}>
//                   {pubs.volume ? pubs.volume : "- NA -"}
//                 </span>
//               </div>

//               <span className={styles.middot}>&middot;</span>

//               <div className={styles.info}>
//                 <span className={styles.info_head}>Issue</span>
//                 <span className={styles.info_body}>
//                   {pubs.issue ? pubs.issue : "- NA -"}
//                 </span>
//               </div>

//               <span className={styles.middot}>&middot;</span>

//               <div className={styles.info}>
//                 <span className={styles.info_head}>Pg. No.</span>
//                 <span className={styles.info_body}>- NA -</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.file_info_box}>
//             <div>
//               <div className={styles.info}>
//                 <span className={styles.info_head}>Authors</span>
//                 <span className={styles.info_body}>
//                   {authors ? authors : "- Not Available -"}
//                 </span>
//               </div>
//             </div>

//             <div>
//               <div className={styles.info}>
//                 <span className={styles.info_head}>Dept.</span>
//                 <span className={styles.info_body}>
//                   {dept ? dept : "- NA -"}
//                 </span>
//               </div>
//             </div>

//             <div>
//               <div className={styles.info}>
//                 <span className={styles.info_head}>Published</span>
//                 <span className={styles.info_body}>
//                   {pubs.year ? pubs.year : "- NA -"}
//                 </span>
//               </div>

//               <span className={styles.middot}>&middot;</span>

//               <div className={styles.info}>
//                 <span className={styles.info_head}>Citations</span>
//                 <span className={styles.info_body}>
//                   {pubs.citations ? pubs.citations : 0}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className={`${styles.smooth} ${styles.abstract}`}>
//           <div className={styles.file_head}>Abstract</div>
//           <div className={styles.abs_body}>
//             {pubs.abstract ? pubs.abstract : "- Not Available -"}
//           </div>
//         </div>

//         <div className={styles.file_grid}>
//           <div className={styles.smooth}>
//             <div className={styles.file_head}>File ID</div>
//             <div className={styles.file_body}>
//               <div className={styles.file_bodyitem}>
//                 <div className={styles.file_bodybold}>Pub Med ID</div>
//                 <div className={styles.file_bodyweak}>
//                   {pubs.pubmed_id == null || pubs.pubmed_id == "" ? (
//                     <div>
//                       <FontAwesomeIcon
//                         icon={faFileMedical}
//                         style={{ color: "#9a2827" }}
//                       />{" "}
//                       &nbsp; - Not Available -
//                     </div>
//                   ) : (
//                     <div>
//                       <FontAwesomeIcon
//                         icon={faFileMedical}
//                         style={{ color: "#9a2827" }}
//                       />{" "}
//                       &nbsp;
//                       {pubs.pubmed_id}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className={styles.file_bodyitem}>
//                 <div className={styles.file_bodybold}>DOI ID</div>
//                 <div className={styles.file_bodyweak}>
//                   {pubs.doi_id == null ? (
//                     <div>
//                       <FontAwesomeIcon
//                         icon={faFileMedical}
//                         style={{ color: "#9a2827" }}
//                       />{" "}
//                       &nbsp; - Not Available -
//                     </div>
//                   ) : (
//                     <div>
//                       <FontAwesomeIcon
//                         icon={faFileMedical}
//                         style={{ color: "#9a2827" }}
//                       />{" "}
//                       &nbsp;
//                       {pubs.doi_id}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className={styles.smooth}>
//             <div className={styles.file_head}>File Index</div>
//             <div className={styles.file_body}>
//               <div className={styles.file_bodyitem}>
//                 <div className={styles.file_bodybold}>Impact Factor</div>
//                 <div className={styles.file_bodyweak}>
//                   {pubs.impact_factor == null ? (
//                     <div>
//                       <FontAwesomeIcon
//                         icon={faFileAlt}
//                         style={{ color: "#9a2827" }}
//                       />{" "}
//                       &nbsp; - Not Available -
//                     </div>
//                   ) : (
//                     <div>
//                       <FontAwesomeIcon
//                         icon={faFileAlt}
//                         style={{ color: "#9a2827" }}
//                       />{" "}
//                       &nbsp;
//                       {pubs.impact_factor}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className={`${styles.file_bodygrid} ${styles.bi_grid}`}>
//                 <div className={styles.file_bodyitem}>
//                   <div className={styles.file_bodybold}>H-Index</div>
//                   <div className={styles.file_bodyweak}>
//                     {pubs.h_index == null ? (
//                       <div>
//                         <FontAwesomeIcon
//                           icon={faFileAlt}
//                           style={{ color: "#9a2827" }}
//                         />{" "}
//                         &nbsp; - NA -
//                       </div>
//                     ) : (
//                       <div>
//                         <FontAwesomeIcon
//                           icon={faFileAlt}
//                           style={{ color: "#9a2827" }}
//                         />{" "}
//                         &nbsp;
//                         {pubs.h_index}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className={styles.file_bodyitem}>
//                   <div className={styles.file_bodybold}>SJR Quartile</div>
//                   <div className={styles.file_bodyweak}>
//                     {pubs.sjr == null ? (
//                       <div>
//                         <FontAwesomeIcon
//                           icon={faFileAlt}
//                           style={{ color: "#9a2827" }}
//                         />{" "}
//                         &nbsp; - NA -
//                       </div>
//                     ) : (
//                       <div>
//                         <FontAwesomeIcon
//                           icon={faFileAlt}
//                           style={{ color: "#9a2827" }}
//                         />{" "}
//                         &nbsp;
//                         {pubs.sjr}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className={styles.smooth}>
//             <div className={styles.file_head}>Indexed In</div>
//             <div className={styles.file_body}>
//               <div className={styles.file_bodygrid}>
//                 <FontAwesomeIcon
//                   icon={pubs.in_doab ? faCheck : faXmark}
//                   style={{
//                     color: pubs.in_doab ? "green" : "red",
//                     marginRight: "-1rem",
//                   }}
//                 />
//                 <div className={styles.file_bodybold}>DOAJ</div>

//                 <FontAwesomeIcon
//                   icon={pubs.in_embase ? faCheck : faXmark}
//                   style={{
//                     color: pubs.in_embase ? "green" : "red",
//                     marginRight: "-1rem",
//                   }}
//                 />
//                 <div className={styles.file_bodybold}>Embase</div>

//                 <FontAwesomeIcon
//                   icon={pubs.in_medline ? faCheck : faXmark}
//                   style={{
//                     color: pubs.in_medline ? "green" : "red",
//                     marginRight: "-1rem",
//                   }}
//                 />
//                 <div className={styles.file_bodybold}>Medline</div>

//                 <FontAwesomeIcon
//                   icon={pubs.in_pmc ? faCheck : faXmark}
//                   style={{
//                     color: pubs.in_pmc ? "green" : "red",
//                     marginRight: "-1rem",
//                   }}
//                 />
//                 <div className={styles.file_bodybold}>PMC</div>

//                 <FontAwesomeIcon
//                   icon={pubs.in_scie ? faCheck : faXmark}
//                   style={{
//                     color: pubs.in_scie ? "green" : "red",
//                     marginRight: "-1rem",
//                   }}
//                 />
//                 <div className={styles.file_bodybold}>SCIE</div>

//                 <FontAwesomeIcon
//                   icon={pubs.in_scopus ? faCheck : faXmark}
//                   style={{
//                     color: pubs.in_scopus ? "green" : "red",
//                     marginRight: "-1rem",
//                   }}
//                 />
//                 <div className={styles.file_bodybold}>Scopus</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FileInfo;
