// External
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// Internal
import studentsIcon from "../assets/imgs/icons/studentsIcon.png";
import userOutIcon from "../assets/imgs/icons/userOutIcon.png";
import userRejectedIcon from "../assets/imgs/icons/userRejectedIcon.png";
import Header from "../components/Header";
import Search from "../components/Search";
import Table from "../components/Table";
import UniversityLogo from "../components/UniversityLogo";
import { getStudents } from "../redux/users/uersAction";
import { searchByName } from "../redux/users/usersSlice";
import { getAcceptedWorkspace } from "../redux/workspaces/workspacesActions";

const Students = () => {
   // ======================= Global Data =======================
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   document.title = "Absolventweb | Studenți";

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   const acceptedWorkspaces = useSelector(
      (state) => state.workspaces.acceptedWorkspaces
   );
   const students = useSelector((state) => state.users.students);
   const rejectedStudent = students.filter(
      (student) => student?.workspace?.status === 3
   );
   const haveNotSelectedTema = students.filter((student) => !student.workspace);

   // ======================= React Hook =======================
   useEffect(() => {
      if (userType === "coordonator") {
         dispatch(getAcceptedWorkspace({}));
      } else if (userType === "admin") {
         dispatch(getStudents());
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
      if (userType === "coordonator") {
         // Names Of Table Columns
         const tableCols = [
            { heading: "Nr", val: "" },
            { heading: "Student", val: "student.email" },
            { heading: "Titlul Lucrării", val: "tema.title" },
            { heading: "Specializare", val: "student.specializare" },
            {
               heading: "Process",
               val: { show: true },
            },
         ];

         return (
            <>
               <Header userType={userType} />
               <main className="main students-page-coordonator">
                  <div className="container">
                     <div className="content">
                        <div className="title">
                           <img
                              src={studentsIcon}
                              alt="students-icon"
                              className="icon"
                           />
                           <p className="text">Studenți</p>
                        </div>
                        {acceptedWorkspaces ? (
                           <Table
                              tableCols={tableCols}
                              tableData={acceptedWorkspaces}
                              resetPagination={resetPagination}
                              msg="There Are No Students To Show."
                           />
                        ) : null}
                     </div>
                     <UniversityLogo />
                  </div>
               </main>
            </>
         );
      } else if (userType === "admin") {
         // Names Of Table Columns
         const tableCols = [
            { heading: "Studenți", val: "email" },
            { heading: "Specializare", val: "specializare" },
         ];
         return (
            <>
               <Header userType={userType} />
               <main className="main students-page-admin">
                  <div className="container">
                     <Search searchMethod={searchByName} />
                     <div className="content">
                        <div className="box">
                           <div className="title">
                              <img
                                 src={userRejectedIcon}
                                 alt="status-icon"
                                 className="icon"
                              />
                              <p className="text">Studenților Respinși</p>
                           </div>
                           {rejectedStudent ? (
                              <Table
                                 tableCols={tableCols}
                                 tableData={rejectedStudent}
                                 resetPagination={resetPagination}
                                 msg="There Are No Data To Show."
                              />
                           ) : null}
                        </div>
                        <div className="box">
                           <div className="title">
                              <img
                                 src={userOutIcon}
                                 alt="status-icon"
                                 className="icon"
                              />
                              <p className="text">
                                 Studenți Care Nu Au Selectat Teme
                              </p>
                           </div>
                           {haveNotSelectedTema ? (
                              <Table
                                 tableCols={tableCols}
                                 tableData={haveNotSelectedTema}
                                 resetPagination={resetPagination}
                                 msg="There Are No Data To Show."
                              />
                           ) : null}
                        </div>
                     </div>
                  </div>
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
