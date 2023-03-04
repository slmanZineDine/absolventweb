import { Navigate } from "react-router-dom";
import Header from "../components/Header";

const Profile = () => {
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   if (user) {
      if (userType === "coordonator") {
         return (
            <>
               <Header userType={userType} />
               <main className="main profile-page">
                  <div className="container">
                     <h1>Hello {userType}</h1>
                     <button>add teme</button>
                     {/* add unversity logo component here */}
                  </div>
               </main>
            </>
         );
      } else if (userType === "student" || userType === "admin") {
         <>
            <Header userType={userType} />
            <main className="main profile-page">
               <div className="container">
                  <h1>Hello {userType}</h1>
                  {/* add unversity logo component here */}
               </div>
            </main>
         </>;
      }
   } else {
      return <Navigate to="/" />;
   }
};

export default Profile;
