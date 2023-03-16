import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import studentsIcon from "../assets/imgs/icons/studentsIcon.png";
import userOutIcon from "../assets/imgs/icons/userOutIcon.png";
import userRejectedIcon from "../assets/imgs/icons/userRejectedIcon.png";
import Header from "../components/Header";
import Search from "../components/Search";
import UniversityLogo from "../components/UniversityLogo";
import { getAcceptedWorkspace } from "../redux/workspaces/workspacesActions";

const Students = () => {
   // ======================= Global Data =======================
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   const acceptedWorkspaces = useSelector(
      (state) => state.workspaces.acceptedWorkspaces
   );

   // ======================= Router Hook =======================
   const navigate = useNavigate();

   // ======================= React Hook =======================
   useEffect(() => {
      if (userType === "coordonator") {
         dispatch(getAcceptedWorkspace({}));
      }
   }, []);

   if (user) {
      if (userType === "coordonator") {
         // Names Of Table Columns
         const tableCol = [
            "Nr",
            "Student",
            "Titlul lucrării",
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
                                    <tr className="row">
                                       <td
                                          className="cell empty-table"
                                          colSpan={tableCol.length}
                                       >
                                          There Are No Data To Show.
                                       </td>
                                    </tr>
                                    {/* {waitingWorkspaces.length > 0 ? (
                                       waitingWorkspaces.map((cell, i) => {
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
                                    ) : (
                                       <tr className="row">
                                          <td
                                             className="cell empty-table"
                                             colSpan={tableCol1.length}
                                          >
                                             There Are No Data To Show.s
                                          </td>
                                       </tr>
                                    )} */}
                                 </tbody>
                              </table>
                           </div>
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
                                    <tr className="row">
                                       <td
                                          className="cell empty-table"
                                          colSpan={tableCol.length}
                                       >
                                          There Are No Data To Show.
                                       </td>
                                    </tr>
                                    {/* {waitingWorkspaces.length > 0 ? (
                                       waitingWorkspaces.map((cell, i) => {
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
                                    ) : (
                                       <tr className="row">
                                          <td
                                             className="cell empty-table"
                                             colSpan={tableCol1.length}
                                          >
                                             There Are No Data To Show.s
                                          </td>
                                       </tr>
                                    )} */}
                                 </tbody>
                              </table>
                           </div>
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
