import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import UniversityLogo from "../components/UniversityLogo";

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
   const tableData = (data) => {
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

   if (user) {
      return (
         <>
            <Header userType={userType} />
            <main className="main profile-page">
               <section className="section information">
                  <div className="container">
                     <div className="user-info">
                        <ul className="detils">
                           {tableData([JSON.parse(user)])?.[0].map((e, i) => (
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
                        {/* Code below to get doctor id and then add it to api to get all doctor topic and put it inside table */}
                        {console.log(JSON.parse(user).coordonator.id)}
                        {/* 
                           - button navigate you to another page to add a new topic
                           - table to doctor's topics
                           - every topics contains in last column to button edite, delete
                           - edite navigate you to another page to edite specific topic
                     */}
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
