import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import UniversityLogo from "../components/UniversityLogo";
import Table from "../components/Table";
import {
   deleteTopic,
   getTopicsByDoctorId,
} from "../redux/topics/topicsActions";
import { useEffect } from "react";

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
               e[userType]["phone"],
               e[userType]["facultatea"],
               e[userType]["specializare"],
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
      if (user) {
         const doctorId = JSON.parse(user).coordonator.id;
         dispatch(getTopicsByDoctorId(doctorId));
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
            sortedArray.sort((a, b) => {
               const firEleDate = new Date(a["updated_at"]);
               const secEleDate = new Date(b["updated_at"]);
               return +secEleDate - +firEleDate;
            });
            return sortedArray.map((e, i) => {
               return [
                  i + 1,
                  e["title"],
                  e["detalii"],
                  e["specializare"],
                  <div className="btn">
                     <button
                        className="btn edite-btn"
                        onClick={() => {
                           navigate("edite-topic", {
                              state: { id: e.id },
                           });
                        }}
                     >
                        Edite
                     </button>
                     <button
                        className="btn delete-btn"
                        onClick={() => {
                           // console.log(e.id);
                           dispatch(deleteTopic(e.id));
                        }}
                     >
                        Delete
                     </button>
                  </div>,
               ];
            });
         }
      };
      // console.log(tableData(topics));
      return (
         <>
            <Header userType={userType} />
            <main className="main profile-page">
               <section className="section information">
                  <div className="container">
                     <div className="user-info">
                        <ul className="detils">
                           {profileData([JSON.parse(user)])?.[0].map((e, i) => (
                              <li key={i} className="item">
                                 <h3 className="title">{userDetails[i]}</h3>
                                 {/* Reading mode */}
                                 <p className="text">{e}</p>
                                 {/* Modify mode */}
                                 {/* <input type="text" value={e}/> */}
                              </li>
                           ))}
                        </ul>
                     </div>
                     <UniversityLogo />
                  </div>
               </section>
               {userType === "coordonator" ? (
                  <section className="section topics">
                     <div className="container">
                        <Link to="add-new-topic">
                           <button className="btn add-btn">Add</button>
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
