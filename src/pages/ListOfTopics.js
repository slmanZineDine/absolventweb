import { Navigate } from "react-router-dom";
import Header from "../components/Header";

const ListOfTopics = () => {
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   if (user) {
      if (userType === "student") {
         return (
            <>
               <Header userType={userType} />
               <main className="main list-of-topics">
                  <div className="container">
                     <h1>List of topics</h1>
                  </div>
               </main>
            </>
         );
      } else if (userType === "coordonator") {
         return <h1>coordonator view</h1>;
      } else if (userType === "adimn") {
         return <h1>admin view</h1>;
      } else {
         return <h1>Please Login or register </h1>;
      }
   } else {
      return <Navigate to="/" />;
   }
};

export default ListOfTopics;
