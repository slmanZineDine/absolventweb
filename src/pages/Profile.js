import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import UniversityLogo from "../components/UniversityLogo";
import addIcon from "../assets/imgs/icons/addIcon.png";
import editeIcon from "../assets/imgs/icons/editeIcon.png";
import deleteIcon from "../assets/imgs/icons/deleteIcon.png";
import {
   deleteTopic,
   getTopicsByDoctorId,
} from "../redux/topics/topicsActions";
import { useEffect, useRef, useState } from "react";
import swal from "sweetalert";
import Spinning from "../components/Spinning";

const Profile = () => {
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // Redux Hook
   const dispatch = useDispatch();
   const topics = useSelector((state) => state.topics.doctorTopics);
   // To Prevent user Click add button before page loading, because get doctor topic
   // still pending
   const topicsGlobal = useSelector((state) => state.topics);

   // Router Hook
   const navigate = useNavigate();

   // User Details showing in profile page
   const userDetails = [
      "Tip de utilizator",
      "prenuma si Numa",
      "Email",
      "Telefon",
      "Facultatea",
      "Specializare",
   ];
   // Extract data compatible with user Details
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

   // Alert Box From Sweet Alert labrary
   const processChecking = async (msg, icon, theClassName) => {
      await swal(msg, {
         buttons: false,
         timer: 3000,
         icon: icon,
         className: theClassName,
         closeOnEsc: false,
      });
   };

   // React Hook
   const [processDone, setProcessDone] = useState(false);
   // Use this to show loading for exactly tema
   const [selectedId, setSelectedId] = useState(null);
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
      const tableCol = ["Nr", "Tema", "Detalii", "Specializare", "Process"];

      return (
         <>
            <Header userType={userType} />
            <main className="main profile-page">
               <section className="section user-info">
                  <h2 className="section_title">USER INFORMATION</h2>
                  <div className="container">
                     <ul className="detils">
                        {profileData([JSON.parse(user)])?.[0].map((e, i) => (
                           <li key={i} className="item">
                              <h3 className="title">{userDetails[i]}:</h3>
                              {/* Reading mode */}
                              <p className="text">{e}</p>
                              {/* Modify mode */}
                              {/* <input type="text" value={e}/> */}
                           </li>
                        ))}
                     </ul>
                     <UniversityLogo />
                  </div>
               </section>
               {userType === "coordonator" ? (
                  <section className="section topics">
                     <h2 className="section_title">USER TEMA</h2>
                     <div className="container">
                        <button
                           className="btn add-btn"
                           onClick={() => {
                              if (!topicsGlobal.loading) {
                                 navigate("add-new-topic");
                              }
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
                                    topics.teme.map((cell, i) => {
                                       return (
                                          <tr key={i} className="row">
                                             <td className="cell">{i + 1}.</td>
                                             <td className="cell">
                                                {cell.title}
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
