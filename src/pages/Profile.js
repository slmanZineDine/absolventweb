// External
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
// Internal
import Header from "../components/Header";
import UniversityLogo from "../components/UniversityLogo";
import addIcon from "../assets/imgs/icons/addIcon.png";
import editeIcon from "../assets/imgs/icons/editeIcon.png";
import deleteIcon from "../assets/imgs/icons/deleteIcon.png";
import {
   deleteTopic,
   getTopicsByDoctorId,
} from "../redux/topics/topicsActions";
import Spinning from "../components/Spinning";
import Pagination from "../components/Pagination";

const Profile = () => {
   // ======================= Global Data =======================
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   document.title = "Absolventweb | Profile";

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   const topics = useSelector((state) => state.topics.doctorTopics);
   // To Prevent user Click add button before page loading, because get doctor topic still pending
   const topicsGlobal = useSelector((state) => state.topics);

   // ======================= Router Hook =======================
   const navigate = useNavigate();

   // ======================= User Details Showing In Profile Page =======================
   const userDetails = [
      "Tip De Utilizator",
      "Prenuma Si Numa",
      "Email",
      "Telefon",
      "Facultatea",
      "Specializare",
   ];

   // ======================= Extract Data Compatible With User Details ======================
   const profileData = (data) => {
      if (data?.length > 0) {
         return data.map((e) => {
            return [
               e["type"],
               e["name"],
               e["email"],
               e[userType]?.["phone"],
               e[userType]?.["facultatea"],
               e[userType]?.["specializare"],
            ];
         });
      }
   };

   // ======================= Sweet Alert Labrary =======================
   const processChecking = async (msg, icon, theClassName) => {
      await swal(msg, {
         buttons: false,
         timer: 3000,
         icon: icon,
         className: theClassName,
         closeOnEsc: false,
      });
   };
   // Check Box to confirm deletion process
   const confirmDeletion = async (topicId) => {
      let checkBox = await swal("Are you sure?", {
         dangerMode: true,
         buttons: true,
      });
      if (checkBox) {
         dispatch(deleteTopic(topicId));
         setProcessDone(true);
      }
   };

   // ======================= React Hook =======================
   const [processDone, setProcessDone] = useState(false);
   // Use this to show loading for exactly tema
   const [selectedId, setSelectedId] = useState(null);
   // Store Pagination Values
   const [paginationValue, setPaginationValue] = useState({
      start: 0,
      end: 3,
   });

   useEffect(() => {
      if (user && userType === "coordonator") {
         const doctorId = JSON.parse(user)?.coordonator?.id;
         if (doctorId) {
            dispatch(getTopicsByDoctorId(doctorId));
         }
      }
   }, []);
   // Variable below to manipulate useEffect and prevente run initial-render
   const firstUpdate = useRef(true);
   useEffect(() => {
      if (firstUpdate.current) {
         firstUpdate.current = false;
         return;
      }
      if (userType === "coordonator") {
         if (processDone) {
            if (!topicsGlobal.loading && topicsGlobal.error) {
               processChecking(topicsGlobal.error, "error", "red-bg");
               setProcessDone(false); // Reset
            } else if (!topicsGlobal.loading && topicsGlobal.success) {
               processChecking("Process Successfully", "success", "done");
               setProcessDone(false); // Reset
            }
         }
      }
   }, [topicsGlobal.error, topicsGlobal.success]);

   if (user) {
      // Names Of Table Columns
      const tableCol = [
         "Nr",
         "Tema",
         "Type",
         "Detalii",
         "Specializare",
         "Process",
      ];

      return (
         <>
            <Header userType={userType} />
            <main
               className={`main profile-page ${
                  userType === "student" || userType === "admin"
                     ? "profile-student"
                     : ""
               }`}
            >
               <section className="section user-info">
                  <div className="container">
                     <ul className="detils">
                        {profileData([JSON.parse(user)])?.[0].map(
                           (userInfo, i) => (
                              <li key={i} className="item">
                                 <h3 className="title">{userDetails[i]}:</h3>
                                 <p className="text">
                                    {userInfo ?? "No Data Yet"}
                                 </p>
                              </li>
                           )
                        )}
                     </ul>
                     <UniversityLogo />
                  </div>
               </section>
               {userType === "coordonator" ? (
                  <section className="section topics">
                     <div className="container">
                        <button
                           className="btn add-btn"
                           onClick={() => {
                              navigate("add-new-topic");
                           }}
                        >
                           Add
                           <img
                              src={addIcon}
                              alt="btn-icon"
                              className="btn-icon"
                           />
                        </button>
                        <div className="cover">
                           <table className="table">
                              <thead className="thead">
                                 <tr className="main-row">
                                    {tableCol.map((colName, i) => (
                                       <th key={i} className="main-cell">
                                          {colName}
                                       </th>
                                    ))}
                                 </tr>
                              </thead>
                              <tbody className="tbody">
                                 {topics?.teme?.length > 0 ? (
                                    topics.teme
                                       .map((cell, i) => {
                                          return (
                                             <tr key={i} className="row">
                                                <td className="cell">
                                                   {i + 1}.
                                                </td>
                                                <td className="cell">
                                                   {cell.title}
                                                </td>
                                                <td className="cell">
                                                   {cell.tema_type}
                                                </td>
                                                <td className="cell">
                                                   {cell.detalii}
                                                </td>
                                                <td className="cell">
                                                   {cell.specializare}
                                                </td>
                                                <td className="cell">
                                                   <div className="topic-btns">
                                                      <button
                                                         className="btn edite-btn"
                                                         onClick={() => {
                                                            navigate(
                                                               "edite-topic",
                                                               {
                                                                  state: {
                                                                     id: cell.id,
                                                                  },
                                                               }
                                                            );
                                                         }}
                                                      >
                                                         Edite
                                                         <img
                                                            src={editeIcon}
                                                            alt="edite-icon"
                                                            className="btn-icon"
                                                         />
                                                      </button>
                                                      {topicsGlobal.loading &&
                                                      cell.id === selectedId ? (
                                                         <Spinning size="small" />
                                                      ) : (
                                                         <button
                                                            className="btn delete-btn"
                                                            onClick={() => {
                                                               confirmDeletion(
                                                                  cell.id
                                                               );
                                                               setSelectedId(
                                                                  cell.id
                                                               );
                                                            }}
                                                         >
                                                            Delete
                                                            <img
                                                               src={deleteIcon}
                                                               alt="delete-icon"
                                                               className="btn-icon"
                                                            />
                                                         </button>
                                                      )}
                                                   </div>
                                                </td>
                                             </tr>
                                          );
                                       })
                                       .slice(
                                          paginationValue.start,
                                          paginationValue.end
                                       )
                                 ) : (
                                    <tr className="row">
                                       <td
                                          className="cell empty-table"
                                          colSpan={tableCol.length}
                                       >
                                          You Don't Any Tema.
                                       </td>
                                    </tr>
                                 )}
                              </tbody>
                           </table>
                        </div>
                        <Pagination
                           paginationCount={topics?.teme?.length}
                           setPaginationValue={setPaginationValue}
                        />
                     </div>
                  </section>
               ) : null}
            </main>
         </>
      );
   } else {
      return <Navigate to="/" />;
   }
};

export default Profile;
