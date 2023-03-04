import { Navigate } from "react-router-dom";
import Filter from "../components/Filter";
import Header from "../components/Header";
import Search from "../components/Search";
import Table from "../components/Table";

const ListOfTopics = () => {
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   if (user) {
      if (userType === "student") {
         const tableCol = ["Nr", "Tema", "Detalii", "Specializare", " "];
         return (
            <>
               <Header userType={userType} />
               <main className="main list-of-topics-page">
                  <div className="container">
                     <Search />
                     <Table cols={tableCol} />
                     {/* <Filter
                        doctor={true}
                        programmingLang={true}
                        topicType={true}
                     /> */}
                  </div>
               </main>
            </>
         );
      } else if (userType === "coordonator") {
         const tableCol = [
            "Nr",
            "Tema",
            "Detalii",
            "Specializare",
            <>
               <button>Edite</button>
               <button>Delete</button>
            </>,
         ];
         return (
            <>
               <Header userType={userType} />
               <main className="main list-of-topics-page">
                  <div className="container">
                     <Search />
                     <Table cols={tableCol} />
                     {/* <Filter
                        doctor={true}
                        programmingLang={true}
                        topicType={true}
                     /> */}
                  </div>
               </main>
            </>
         );
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
