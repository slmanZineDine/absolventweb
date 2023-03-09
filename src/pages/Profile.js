import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import UniversityLogo from "../components/UniversityLogo";
import addIcon from "../assets/imgs/icons/addIcon.png";
import editeIcon from "../assets/imgs/icons/editeIcon.png";
import deleteIcon from "../assets/imgs/icons/deleteIcon.png";
import Table from "../components/Table";
import {
   deleteTopic,
   getTopicsByDoctorId,
} from "../redux/topics/topicsActions";
import { useEffect } from "react";
import swal from "sweetalert";

const Profile = () => {
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // Redux Hook
   const dispatch = useDispatch();
   // const topics = useSelector((state) => state.topics.doctorTopics);
   const topics = useSelector((state) => state.topics.doctorTopics);

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
      if (checkBox) dispatch(deleteTopic(topicId));
   };
   useEffect(() => {
      if (user && userType === "coordonator") {
         const doctorId = JSON.parse(user)?.coordonator?.["user_id"];
         if (doctorId) {
            dispatch(getTopicsByDoctorId(doctorId));
         }
      }
   }, []);
   // console.log(topics.teme);
   if (user) {
      // Names Of Table Columns
      const tableCol = ["Nr", "Tema", "Detalii", "Specializare", "Process"];
      // Extract data compatible with table columns
      const tableData = (data) => {
         if (data?.length > 0) {
            console.log(data);
            // copy value to prevent read only property error;
            const sortedArray = [...data];
            // sorting topic
            sortedArray.sort((a, b) => {
               const firEleDate = new Date(a["updated_at"]);
               const secEleDate = new Date(b["updated_at"]);
               return +secEleDate - +firEleDate;
            });
            return sortedArray.map((e, i) => {
               return [
                  `${i + 1}.`,
                  e["title"],
                  e["detalii"],
                  e["specializare"],
                  <div className="topic-btns">
                     <button
                        className="btn edite-btn"
                        onClick={() => {
                           navigate("edite-topic", {
                              state: { id: e.id },
                           });
                        }}
                     >
                        Edite
                        <img
                           src={editeIcon}
                           alt="btn-icon"
                           className="btn-icon"
                        />
                     </button>
                     <button
                        className="btn delete-btn"
                        onClick={() => {
                           dispatch(deleteTopic(e.id));
                           confirmDeletion(e.id);
                        }}
                     >
                        Delete
                        <img
                           src={deleteIcon}
                           alt="btn-icon"
                           className="btn-icon"
                        />
                     </button>
                  </div>,
               ];
            });
         }
      };

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
                        <Link to="add-new-topic" className="btn add-btn">
                           Add
                           <img
                              src={addIcon}
                              alt="btn-icon"
                              className="btn-icon"
                           />
                        </Link>
                        {/* <Table data={tableData(topics.teme)} cols={tableCol} /> */}
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
                                 {topics?.teme?.length > 0
                                    ? topics.teme.map((cell, i) => {
                                         return (
                                            <tr key={i} className="row">
                                               <td className="cell">
                                                  {i + 1}.
                                               </td>
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
                                                           console.log(cell.id);
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
                                                           alt="btn-icon"
                                                           className="btn-icon"
                                                        />
                                                     </button>
                                                     <button
                                                        className="btn delete-btn"
                                                        onClick={() =>
                                                           confirmDeletion(
                                                              cell.id
                                                           )
                                                        }
                                                     >
                                                        Delete
                                                        <img
                                                           src={deleteIcon}
                                                           alt="btn-icon"
                                                           className="btn-icon"
                                                        />
                                                     </button>
                                                  </div>
                                               </td>
                                            </tr>
                                         );
                                      })
                                    : null}
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
