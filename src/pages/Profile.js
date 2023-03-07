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
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // User Ddetails showing in profile page
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

   // Redux Hook
   const dispatch = useDispatch();
   const topics = useSelector((state) => state.topics.doctorTopics);
   // Router Hook
   const navigate = useNavigate();
   useEffect(() => {
      if (user && userType === "coordonator") {
         const doctorId = JSON.parse(user)?.coordonator?.id;
         if (doctorId) {
            dispatch(getTopicsByDoctorId(doctorId));
         }
      }
   }, []);
   if (user) {
      // Select Main Column in a table
      const tableCol = ["Nr", "Tema", "Detalii", "Specializare", "Process"];
      // Extract data compatible with table columns
      const tableData = (data) => {
         // copy value to prevent read only property error;
         const sortedArray = [...data];
         if (data?.length > 0) {
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
                           // dispatch(deleteTopic(e.id));
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
      // Check Box to confirm deletion process
      const confirmDeletion = async (topicId) => {
         let checkBox = await swal("Are you sure?", {
            dangerMode: true,
            buttons: true,
         });
         if (checkBox) dispatch(deleteTopic(topicId));
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
                        <Table data={tableData(topics)} cols={tableCol} />
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
