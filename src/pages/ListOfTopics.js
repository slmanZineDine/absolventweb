import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Filter from "../components/Filter";
import Header from "../components/Header";
import Search from "../components/Search";
import Table from "../components/Table";
import { getTopics } from "../redux/topics/topicsActions";

const ListOfTopics = () => {
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // Redux Hook
   const dispatch = useDispatch();
   const topics = useSelector((state) => state.topics);
   useEffect(() => {
      if (user) {
         dispatch(getTopics({}));
      }
   }, []);
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
         // Select Main Column in a table
         const tableCol = ["Nr", "Tema", "Detalii", "Specializare"];
         // Extract data compatible with table columns
         const tableData = (data) => {
            if (data?.length > 0) {
               return data.map((e, i) => {
                  return [i + 1, e["title"], e["detalii"], e["specializare"]];
               });
            }
         };
         console.log(topics.topicsList);
         return (
            <>
               <Header userType={userType} />
               <main className="main list-of-topics-page">
                  <div className="container">
                     <Search />
                     {topics.topicsList > 0 ? topics.topicsList : null}
                     <Table
                        data={tableData(topics.topicsList)}
                        cols={tableCol}
                     />
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
