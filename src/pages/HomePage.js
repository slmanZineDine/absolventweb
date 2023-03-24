// External
import { Link, Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
// Internal
import Header from "../components/Header";
import stepsIcon from "../assets/imgs/icons/stepsIcon.png";
import statusIcon from "../assets/imgs/icons/statusIcon.png";
import UniversityLogo from "../components/UniversityLogo";
import {
   changeWorkspaceStatus,
   getWaitingWorkspace,
} from "../redux/workspaces/workspacesActions";
import checkIcon from "../assets/imgs/icons/checkIcon.png";
import deleteIcon from "../assets/imgs/icons/deleteIcon.png";
import { getStudents, getStudentStatus } from "../redux/users/uersAction";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import { searchByName } from "../redux/users/usersSlice";

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
   const workspace = useSelector((state) => state.workspaces);
   const userStatus = useSelector((state) => state.users.studentStatus);
   const students = useSelector((state) => state.users.students).filter(
      (student) => student?.workspace?.status === 1
   );

   // ======================= React Hook =======================
   // Use This To Prevent Show All Alert on First Page Load
   const [processDone, setProcessDone] = useState(false);
   // [Homepage Admin] Store Pagination Values
   const [paginationValue, setPaginationValue] = useState({
      start: 0,
      end: 3,
   });
   // [Homepage Coordinator] Pagination Values For Each Table
   const [paginationValueTable1, setPaginationValueTable1] = useState({
      start: 0,
      end: 3,
   });
   const [paginationValueTable2, setPaginationValueTable2] = useState({
      start: 0,
      end: 3,
   });

   useEffect(() => {
      if (userType === "student") {
         dispatch(getStudentStatus({}));
      }
      if (userType === "coordonator") {
         dispatch(getWaitingWorkspace({}));
      }
   }, []);
   // Variable below to manipulate useEffect and prevente run initial-render
   const firstUpdate = useRef(true);
   useEffect(() => {
      if (firstUpdate.current) {
         firstUpdate.current = false;
         if (userType === "admin") {
            dispatch(getStudents());
         }
         return;
      }
      if (userType === "coordonator") {
         if (processDone) {
            if (!workspace.loading && workspace.error) {
               processChecking(workspace.error, "error", "red-bg");
               setProcessDone(false); // Reset
            } else if (!workspace.loading && workspace.success) {
               processChecking("Process Successfully", "success", "done");
               setProcessDone(false); // Reset
            }
         }
      }
   }, [workspace.error, workspace.success]);

   // ======================= Sweet Alert Labrary =======================
   const processChecking = async (msg, icon, theClassName) => {
      await swal(msg, {
         buttons: false,
         timer: 3000,
         icon: icon,
         className: theClassName,
         closeOnEsc: false,
      });
   };
   // Checking Box To Confirm Accept A Workspace
   const confirmAccept = async (status) => {
      let checkBox = await swal(
         "Are You Sure You Want To Accept This Student?",
         {
            dangerMode: true,
            buttons: true,
         }
      );
      if (checkBox) {
         dispatch(changeWorkspaceStatus(status));
         setProcessDone(true);
      }
   };
   // Checking Box To Confirm Reject A  Workspace
   const confirmReject = async (status) => {
      let checkBox = await swal(
         "Are You Sure You Want To Reject This Student?",
         {
            dangerMode: true,
            buttons: true,
         }
      );
      if (checkBox) {
         dispatch(changeWorkspaceStatus(status));
         setProcessDone(true);
      }
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
         const tableCol1 = [
            "Nr",
            "Student",
            "Titlul Lucrării",
            "Specializare",
            "Statutul De Student",
         ];

         // Names Of Table Columns
         const tableCol2 = ["Nr", "Student", "Title", "Deadline"];

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
                        <div className="cover">
                           <table className="table">
                              <thead className="thead">
                                 <tr className="main-row">
                                    {tableCol1.map((colName, i) => (
                                       <th key={i} className="main-cell">
                                          {colName}
                                       </th>
                                    ))}
                                 </tr>
                              </thead>
                              <tbody className="tbody">
                                 {waitingWorkspaces.length > 0 ? (
                                    waitingWorkspaces
                                       .map((cell, i) => {
                                          return (
                                             <tr key={i} className="row">
                                                <td className="cell">
                                                   {i + 1}.
                                                </td>
                                                <td className="cell">
                                                   {cell.student.email}
                                                </td>
                                                <td className="cell">
                                                   {cell.tema.title}
                                                </td>
                                                <td className="cell">
                                                   {cell.tema.specializare}
                                                </td>
                                                <td className="cell">
                                                   <div className="status">
                                                      <div className="topic-btns ">
                                                         <button
                                                            className="btn edite-btn"
                                                            onClick={() =>
                                                               confirmAccept([
                                                                  {
                                                                     status: 1,
                                                                  },
                                                                  cell.worspace_id,
                                                               ])
                                                            }
                                                         >
                                                            Accept
                                                            <img
                                                               src={checkIcon}
                                                               alt="check-icon"
                                                               className="btn-icon"
                                                            />
                                                         </button>
                                                         <button
                                                            className="btn delete-btn"
                                                            onClick={() =>
                                                               confirmReject([
                                                                  {
                                                                     status: 3,
                                                                  },
                                                                  cell.worspace_id,
                                                               ])
                                                            }
                                                         >
                                                            Reject
                                                            <img
                                                               src={deleteIcon}
                                                               alt="delete-icon"
                                                               className="btn-icon"
                                                            />
                                                         </button>
                                                      </div>
                                                   </div>
                                                </td>
                                             </tr>
                                          );
                                       })
                                       .slice(
                                          paginationValueTable1.start,
                                          paginationValueTable1.end
                                       )
                                 ) : (
                                    <tr className="row">
                                       <td
                                          className="cell empty-table"
                                          colSpan={tableCol1.length}
                                       >
                                          You Don't Have Any Request.
                                       </td>
                                    </tr>
                                 )}
                              </tbody>
                           </table>
                        </div>
                        <Pagination
                           paginationCount={waitingWorkspaces.length}
                           setPaginationValue={setPaginationValueTable1}
                        />
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
                        <div className="cover">
                           <table className="table">
                              <thead className="thead">
                                 <tr className="main-row">
                                    {tableCol2.map((colName, i) => (
                                       <th key={i} className="main-cell">
                                          {colName}
                                       </th>
                                    ))}
                                 </tr>
                              </thead>
                              <tbody className="tbody">
                                 {/* {waitingWorkspaces.length > 0 ? (
                                    waitingWorkspaces.map((cell, i) => {
                                       return (
                                          <tr key={i} className="row">
                                             <td className="cell">{i + 1}.</td>
                                             <td className="cell">
                                                {cell.student.email}
                                             </td>
                                             <td className="cell">
                                                {cell.tema.title}
                                             </td>
                                             <td className="cell">
                                                {cell.tema.specializare}
                                             </td>
                                             </tr>
                                       );
                                    })
                                 ) : (
                                    <tr className="row">
                                       <td
                                          className="cell empty-table"
                                          colSpan={tableCol1.length}
                                       >
                                          You Don't Have Any Request.
                                       </td>
                                    </tr>
                                 )} */}
                                 <tr className="row">
                                    <td
                                       className="cell empty-table"
                                       colSpan={tableCol1.length}
                                    >
                                       You Don't Have Any Request.
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </main>
            </>
         );
      } else if (userType === "admin") {
         // Names Of Table Columns
         const tableCol = ["Nr", "Student", "Coordonator", "Titlul Temei"];

         return (
            <>
               <Header userType={userType} />
               <main className="main homepage-admin">
                  <div className="container">
                     <div className="content">
                        <Search
                           resetPagination={setPaginationValue}
                           searchMethod={searchByName}
                        />
                        <h2 className="title">
                           Detalii La Fiecare Student Pentru Lucrare De Licenta
                        </h2>

                        <div className="cover">
                           <table className="table">
                              <thead className="thead">
                                 <tr className="main-row">
                                    {tableCol.map((colName, i) => (
                                       <th key={i} className="main-cell">
                                          {colName}
                                       </th>
                                    ))}
                                 </tr>
                              </thead>
                              <tbody className="tbody">
                                 {students.length > 0 ? (
                                    students
                                       .map((cell, i) => {
                                          return (
                                             <tr key={i} className="row">
                                                <td className="cell">
                                                   {i + 1}.
                                                </td>
                                                <td className="cell">
                                                   {cell.email}
                                                </td>
                                                <td className="cell">
                                                   {cell.coordonator.email}
                                                </td>
                                                <td className="cell">
                                                   {cell.tema.title}
                                                </td>
                                             </tr>
                                          );
                                       })
                                       .slice(
                                          paginationValue.start,
                                          paginationValue.end
                                       )
                                 ) : (
                                    <tr className="row">
                                       <td
                                          className="cell empty-table"
                                          colSpan={tableCol.length}
                                       >
                                          There Are No Data To Show.
                                       </td>
                                    </tr>
                                 )}
                              </tbody>
                           </table>
                        </div>

                        <Pagination
                           paginationCount={students.length}
                           setPaginationValue={setPaginationValue}
                        />
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
