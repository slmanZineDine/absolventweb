import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Table from "../components/Table";

const Workspace = () => {
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   if (user) {
      if (userType === "student" || userType === "coordonator") {
         return (
            <>
               <Header userType={userType} />
               <main className="main workspace-page">
                  <div className="container">
                     <div className="content">
                        <ul className="workspace-info">
                           <li className="item">Titlul: test</li>
                           <li className="item">Coordinator: john doe</li>
                           <li className="item">student: slman</li>
                        </ul>
                        <Table />
                     </div>
                     {/* add unversity logo component here */}
                  </div>
               </main>
            </>
         );
      }
   } else {
      return <Navigate to="/" />;
   }
};

export default Workspace;
