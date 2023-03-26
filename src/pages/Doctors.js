// External
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Filter from "../components/Filter";
// Internal
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Table from "../components/Table";
import UniversityLogo from "../components/UniversityLogo";
import { setSearchMethod } from "../redux/global/globalSlice";
import { searchGlobaly } from "../redux/topics/topicsSlice";
import { getAcceptedStudent } from "../redux/users/uersAction";
import { searchCoordinators, searchStudent } from "../redux/users/usersSlice";

const Doctors = () => {
   // ======================= Global Data =======================
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   document.title = "Absolventweb | Coordonator";

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   const acceptedStudent = useSelector((state) => state.users.acceptedStudent);
   // Use This To Get Selected Search Method
   const searchMethod = useSelector((state) => state.global.searchMethod);

   // ======================= React Hook =======================
   // Specify Search Method To Send It To Search Compnent
   const [theSearchMethod, setTheSearchMethod] = useState({
      searchCoordinators: searchCoordinators,
      searchStudent: searchStudent,
   });
   // Store Pagination Values For All Page.
   const [paginationValue, setPaginationValue] = useState({
      start: 0,
      end: 3,
   });
   useEffect(() => {
      if (user && userType === "admin") {
         dispatch(getAcceptedStudent());
         // Set Default Search Method To Use It In Search Bar
         dispatch(setSearchMethod("searchCoordinators"));
      }
   }, []);

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
      setPaginationValue({
         start: 0,
         end: 3,
      });
   };

   if (user) {
      if (userType === "admin") {
         // Names Of Table Columns
         const tableCols = [
            { heading: "Nr", val: "" },
            { heading: "Student", val: "name" },
            { heading: "Specializare", val: "specializare" },
         ];

         return (
            <>
               <Header userType={userType} />
               <main className="main doctors-page">
                  <div className="container">
                     <div className="content">
                        <Search searchMethod={theSearchMethod[searchMethod]} />
                        <Filter student={true} searchMethod={searchGlobaly} />
                     </div>
                     <UniversityLogo />
                     <div className="content">
                        {acceptedStudent
                           ? acceptedStudent
                                .map((doctor, i) => (
                                   <div className="box" key={i}>
                                      <h2 className="title">
                                         {i + 1}. {doctor.name}
                                      </h2>
                                      <Table
                                         tableCols={tableCols}
                                         tableData={doctor.students}
                                         resetPagination={resetPagination}
                                         msg="There Are No Students To Show."
                                      />
                                   </div>
                                ))
                                .slice(
                                   paginationValue.start,
                                   paginationValue.end
                                )
                           : null}
                     </div>
                  </div>
                  <Pagination
                     paginationCount={acceptedStudent.length}
                     setPaginationValue={setPaginationValue}
                  />
               </main>
            </>
         );
      } else {
         return <Navigate to="/" />;
      }
   } else {
      return <Navigate to="/" />;
   }
};

export default Doctors;
