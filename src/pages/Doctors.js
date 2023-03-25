// External
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// Internal
import Header from "../components/Header";
import Table from "../components/Table";
import UniversityLogo from "../components/UniversityLogo";
import { getAcceptedStudent } from "../redux/users/uersAction";

const Doctors = () => {
   // ======================= Global Data =======================
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   document.title = "Absolventweb | Coordonator";

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   const acceptedStudent = useSelector((state) => state.users.acceptedStudent);

   console.log(acceptedStudent);

   // ======================= React Hook =======================
   useEffect(() => {
      if (user && userType === "admin") {
         dispatch(getAcceptedStudent());
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
                        {acceptedStudent
                           ? acceptedStudent.map((doctor, i) => (
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
                           : null}
                     </div>
                     <UniversityLogo />
                  </div>
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
