import { Navigate } from "react-router-dom";
import Header from "../components/Header";

const HomePage = () => {
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   if (user) {
      return (
         <>
            <Header userType={userType} />
            <main className="main homepage">
               <div className="container">
                  <h1>Homepage Content</h1>
               </div>
            </main>
         </>
      );
   } else {
      return <Navigate to="/" />;
   }
};

export default HomePage;
