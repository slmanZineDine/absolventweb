// External
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// Internal
import Header from "../components/Header";
import UniversityLogo from "../components/UniversityLogo";
import addIcon from "../assets/imgs/icons/addIcon.png";
import { getTopicsByDoctorId } from "../redux/topics/topicsActions";
import Table from "../components/Table";

const Profile = () => {
   // ======================= Global Data =======================
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   document.title = "Absolventweb | Profile";

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   const topics = useSelector((state) => state.topics.doctorTopics);

   // ======================= React Hook =======================
   useEffect(() => {
      if (user && userType === "coordonator") {
         const doctorId = JSON.parse(user)?.coordonator?.id;
         if (doctorId) dispatch(getTopicsByDoctorId(doctorId));
      }
   }, []);

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

   // ======================= Own Function =======================
   /**
    * Use This Function To Get Pagination Value From Each Table And Reset It Based On Search Mode
    * @param Function UseState Fuction That Contain Pagination Values
    * @returns Undefined
    */
   const resetPagination = (resetFuc) => {
      resetFuc({
         start: 0,
         end: 3,
      });
   };

   if (user) {
      // Names Of Table Columns
      const tableCols = [
         { heading: "Nr", val: "" },
         { heading: "Tema", val: "title" },
         { heading: "Type", val: "tema_type" },
         { heading: "Detalii", val: "detalii" },
         { heading: "Specializare", val: "specializare" },
         {
            heading: "Process",
            val: { edite: true, delete: true },
         },
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
                           onClick={() => navigate("add-new-topic")}
                        >
                           Add
                           <img
                              src={addIcon}
                              alt="btn-icon"
                              className="btn-icon"
                           />
                        </button>
                        {topics?.teme ? (
                           <Table
                              tableCols={tableCols}
                              tableData={topics.teme}
                              resetPagination={resetPagination}
                              msg="You Don't Any Tema."
                           />
                        ) : null}
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
