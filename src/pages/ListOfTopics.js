import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Filter from "../components/Filter";
import Header from "../components/Header";
import Search from "../components/Search";
import Table from "../components/Table";
import { getAllTopicsByDoctor, getTopics } from "../redux/topics/topicsActions";

const ListOfTopics = () => {
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // Redux Hook
   const dispatch = useDispatch();
   const topicsByDoctor = useSelector((state) => state.topics.topicsByDoctor);
   console.log(topicsByDoctor);

   // React Hook
   useEffect(() => {
      if (user) {
         dispatch(getAllTopicsByDoctor({}));
      }
   }, []);
   if (user) {
      if (userType === "student") {
         // const tableCol = ["Nr", "Tema", "Detalii", "Specializare", " "];
         // return (
         //    <>
         //       <Header userType={userType} />
         //       <main className="main list-of-topics-page">
         //          <div className="container">
         //             <Search />
         //             {topicsByDoctor.length > 0
         //                ? topicsByDoctor.map((doctor, i) => {
         //                     return (
         //                        <div key={i} className="content">
         //                           <h2>{doctor.email}</h2>
         //                           <Table
         //                              data={tableData(doctor.teme)}
         //                              cols={tableCol}
         //                           />
         //                        </div>
         //                     );
         //                  })
         //                : null}
         //             {/* <Filter
         //                doctor={true}
         //                programmingLang={true}
         //                topicType={true}
         //             /> */}
         //          </div>
         //       </main>
         //    </>
         // );
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
         return (
            <>
               <Header userType={userType} />
               <main className="main list-of-topics-page">
                  <div className="container">
                     <Search />
                     {topicsByDoctor.length > 0
                        ? topicsByDoctor.map((doctor, i) => {
                             return (
                                <div key={i} className="content">
                                   <h2 className="title">
                                      {i + 1}. ({doctor.email})
                                   </h2>
                                   <Table
                                      data={tableData(doctor.teme)}
                                      cols={tableCol}
                                   />
                                </div>
                             );
                          })
                        : null}
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
