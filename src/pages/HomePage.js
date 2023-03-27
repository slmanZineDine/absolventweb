// External
import { Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Internal
import Header from "../components/Header";
import stepsIcon from "../assets/imgs/icons/stepsIcon.png";
import statusIcon from "../assets/imgs/icons/statusIcon.png";
import UniversityLogo from "../components/UniversityLogo";
import { getWaitingWorkspace } from "../redux/workspaces/workspacesActions";
import { getStudents, getStudentStatus } from "../redux/users/uersAction";
import Search from "../components/Search";
import { searchByName, searchTipTema } from "../redux/users/usersSlice";
import Filter from "../components/Filter";
import Table from "../components/Table";

const HomePage = () => {
   // ======================= Global Data =======================
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   document.title = "Absolventweb | Acasă";

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   const waitingWorkspaces = useSelector(
      (state) => state.workspaces.waitingWorkspaces
   );
   const userStatus = useSelector((state) => state.users.studentStatus);
   const students = useSelector((state) => state.users.students).filter(
      (student) => student?.workspace?.status === 1
   );

   // ======================= React Hook =======================
   useEffect(() => {
      if (userType === "student") dispatch(getStudentStatus());
      else if (userType === "coordonator") dispatch(getWaitingWorkspace());
      else if (userType === "admin") dispatch(getStudents());
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
      if (userType === "student") {
         return (
            <>
               <Header userType={userType} />
               <main className="main homepage-student">
                  <div className="container">
                     <div className="content">
                        <h2 className="title">Etapele lucrării</h2>
                        <ul className="steps">
                           <li className="step">
                              <img
                                 src={stepsIcon}
                                 alt="steps-icon"
                                 className="icon"
                              />
                              <p>
                                 Alegere o temă din {""}
                                 <Link to="/list-of-topics" className="link">
                                    lista propunerilor
                                 </Link>{" "}
                                 {""}
                                 de lucrări de licență.
                              </p>
                           </li>
                           {typeof userStatus?.workspace_status === "number" ? (
                              <>
                                 <li className="step">
                                    <img
                                       src={statusIcon}
                                       alt="status-icon"
                                       className="icon"
                                    />
                                    Starea de acceptare coordonatorului pentru
                                    tema de licenta.
                                 </li>
                                 <li className="student-status">
                                    {userStatus?.workspace_status === 0 ? (
                                       <span className="pending status">
                                          Pending
                                       </span>
                                    ) : null}
                                    {userStatus?.workspace_status === 1 ? (
                                       <span className="accepted status">
                                          Accepted
                                       </span>
                                    ) : null}
                                    {userStatus?.workspace_status === 3 ? (
                                       <span className="rejected status">
                                          Rejected
                                       </span>
                                    ) : null}
                                 </li>
                              </>
                           ) : null}
                        </ul>
                     </div>
                     <UniversityLogo />
                  </div>
               </main>
            </>
         );
      } else if (userType === "coordonator") {
         // Names Of Table Columns
         const tableCols1 = [
            { heading: "Nr", val: "" },
            { heading: "Student", val: "student.email" },
            { heading: "Titlul Lucrării", val: "tema.title" },
            { heading: "Specializare", val: "tema.specializare" },
            {
               heading: "Statutul De Student",
               val: { acceptBtn: true, rejectBtn: true },
            },
         ];

         // Names Of Table Columns
         const tableCols2 = [
            { heading: "Nr", val: "" },
            { heading: "Student", val: "title" },
            { heading: "Title", val: "tema_type" },
            { heading: "Deadline", val: "detalii" },
         ];

         return (
            <>
               <Header userType={userType} />
               <main className="main homepage-coordonator">
                  <div className="container">
                     <div className="content">
                        <div className="title">
                           <img
                              src={statusIcon}
                              alt="status-icon"
                              className="icon"
                           />
                           <p className="text">Studenților în așteptare</p>
                        </div>
                        {waitingWorkspaces ? (
                           <Table
                              tableCols={tableCols1}
                              tableData={waitingWorkspaces}
                              resetPagination={resetPagination}
                              msg="You Don't Have Any Request."
                           />
                        ) : null}
                     </div>
                     <div className="content">
                        <div className="title">
                           <img
                              src={stepsIcon}
                              alt="steps-icon"
                              className="icon"
                           />
                           <p className="text">Sarcinile tale</p>
                        </div>
                        {[] ? (
                           <Table
                              tableCols={tableCols2}
                              tableData={[]}
                              resetPagination={resetPagination}
                              msg="You Don't Have Any Event Yet."
                           />
                        ) : null}
                     </div>
                  </div>
               </main>
            </>
         );
      } else if (userType === "admin") {
         // Names Of Table Columns
         const tableCols = [
            { heading: "Nr", val: "" },
            { heading: "Student", val: "email" },
            { heading: "Coordonator", val: "coordonator.email" },
            { heading: "Titlul Temei", val: "tema.title" },
         ];
         return (
            <>
               <Header userType={userType} />
               <main className="main homepage-admin">
                  <div className="container">
                     <div className="content">
                        <div className="box">
                           <Search searchMethod={searchByName} />
                           <Filter
                              topicType={true}
                              searchMethod={searchTipTema}
                           />
                        </div>
                        <UniversityLogo />
                        <div className="box">
                           <h2 className="title">
                              Detalii La Fiecare Student Pentru Lucrare De
                              Licenta
                           </h2>
                           {students ? (
                              <Table
                                 tableCols={tableCols}
                                 tableData={students}
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
         return <Navigate to="/" />;
      }
   } else {
      return <Navigate to="/" />;
   }
};

export default HomePage;
