import { Navigate } from "react-router-dom";
import Header from "../components/Header";

const Students = () => {
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   if (user) {
      if (userType === "coordonator")
         return (
            <>
               <Header userType={userType} />
               <main className="main students-page-coordonator">
                  <div className="container">hello Doctor</div>
               </main>
            </>
         );
      else if (userType === "admin") {
         return (
            <>
               <Header userType={userType} />
               <main className="main students-page-admin">
                  <div className="container">Hello Admin</div>
               </main>
            </>
         );
      } else {
         return <Navigate to="/homepage" />;
      }
   } else {
      return <Navigate to="/" />;
   }
};

export default Students;
