import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import studentsIcon from "../assets/imgs/icons/studentsIcon.png";
import userOutIcon from "../assets/imgs/icons/userOutIcon.png";
import userRejectedIcon from "../assets/imgs/icons/userRejectedIcon.png";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import UniversityLogo from "../components/UniversityLogo";
import { getStudents } from "../redux/users/uersAction";
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

   // ======================= Router Hook =======================
   const navigate = useNavigate();

   // ======================= React Hook =======================
   // [Students-Page Coordinator] Store Pagination Values
   const [paginationValue, setPaginationValue] = useState({
      start: 0,
      end: 3,
   });
   // [Students-Page Admin] Pagination Values For Each Table
   const [paginationValueTable1, setPaginationValueTable1] = useState({
      start: 0,
      end: 3,
   });
   const [paginationValueTable2, setPaginationValueTable2] = useState({
      start: 0,
      end: 3,
   });
   useEffect(() => {
      if (userType === "coordonator") {
         dispatch(getAcceptedWorkspace({}));
      } else if (userType === "admin") {
         dispatch(getStudents());
      }
   }, []);

   if (user) {
      if (userType === "coordonator") {
         // Names Of Table Columns
         const tableCol = [
            "Nr",
            "Student",
            "Titlul Lucrării",
            "Specializare",
            "Workspace",
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
                                 {acceptedWorkspaces.length > 0 ? (
                                    acceptedWorkspaces.map((workspace, i) => {
                                       return (
                                          <tr key={i} className="row">
                                             <td className="cell">{i + 1}.</td>
                                             <td className="cell">
                                                {workspace.student.email}
                                             </td>
                                             <td className="cell">
                                                {workspace.tema.title}
                                             </td>
                                             <td className="cell">
                                                {workspace.student.specializare}
                                             </td>
                                             <td className="cell">
                                                <div className="wraper">
                                                   <button
                                                      className="btn show-btn"
                                                      onClick={() => {
                                                         localStorage.setItem(
                                                            "workspaceInfo",
                                                            JSON.stringify({
                                                               student_id:
                                                                  workspace
                                                                     .student
                                                                     .id,
                                                               student_email:
                                                                  workspace
                                                                     .student
                                                                     .email,
                                                               workspace_id:
                                                                  workspace.worspace_id,
                                                               tema_name:
                                                                  workspace.tema
                                                                     .title,
                                                            })
                                                         );
                                                         navigate("/workspace");
                                                      }}
                                                   >
                                                      Show
                                                   </button>
                                                </div>
                                             </td>
                                          </tr>
                                       );
                                    })
                                 ) : (
                                    <tr className="row">
                                       <td
                                          className="cell empty-table"
                                          colSpan={tableCol.length}
                                       >
                                          There Are No Students To Show.
                                       </td>
                                    </tr>
                                 )}
                              </tbody>
                           </table>
                        </div>
                        <Pagination
                           paginationCount={acceptedWorkspaces.length}
                           setPaginationValue={setPaginationValue}
                        />
                     </div>
                     <UniversityLogo />
                  </div>
               </main>
            </>
         );
      } else if (userType === "admin") {
         const tableCol = ["Studenți", "Specializare"];
         return (
            <>
               <Header userType={userType} />
               <main className="main students-page-admin">
                  <div className="container">
                     <Search />
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
                                    {rejectedStudent.length > 0 ? (
                                       rejectedStudent
                                          .map((cell, i) => {
                                             return (
                                                <tr key={i} className="row">
                                                   <td className="cell">
                                                      {cell.email}
                                                   </td>

                                                   <td className="cell">
                                                      {cell.specializare}
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
                                             colSpan={tableCol.length}
                                          >
                                             There Are No Data To Shows
                                          </td>
                                       </tr>
                                    )}
                                 </tbody>
                              </table>
                           </div>
                           <Pagination
                              paginationCount={rejectedStudent.length}
                              setPaginationValue={setPaginationValueTable1}
                           />
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
                                    {haveNotSelectedTema.length > 0 ? (
                                       haveNotSelectedTema
                                          .map((cell, i) => {
                                             return (
                                                <tr key={i} className="row">
                                                   <td className="cell">
                                                      {cell.email}
                                                   </td>

                                                   <td className="cell">
                                                      {cell.specializare}
                                                   </td>
                                                </tr>
                                             );
                                          })
                                          .slice(
                                             paginationValueTable2.start,
                                             paginationValueTable2.end
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
                              paginationCount={haveNotSelectedTema.length}
                              setPaginationValue={setPaginationValueTable2}
                           />
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
