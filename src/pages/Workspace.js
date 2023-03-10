import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import UniversityLogo from "../components/UniversityLogo";
import attachIcon from "../assets/imgs/icons/attachIcon.png";
import addIcon from "../assets/imgs/icons/addIcon.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   getStudentEvents,
   getWorkspaceEvents,
} from "../redux/events/eventsAction";
import { getStudentStatus } from "../redux/users/uersAction";
import swal from "sweetalert";
import {
   changeWorkspaceStatus,
   deleteWorkspace,
} from "../redux/workspaces/workspacesActions";

const Workspace = () => {
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   const workspaceInfo = JSON.parse(localStorage.getItem("workspaceInfo"));
   const studentStatus = JSON.parse(localStorage.getItem("studentStatus"));

   // Names Of Table Columns
   const tableCol = ["Titlu", "Type", "Deadline", "Attachment"];

   // Redux Hook
   const dispatch = useDispatch();
   const workspaceEvents = useSelector((state) => state.events.workspaceEvents);
   const workspaceGlobal = useSelector((state) => state.events);

   // Router Hook
   const navigate = useNavigate();

   // Check Box To Confirm Process
   const confirmProcess = async (type, info, msg) => {
      let checkBox = await swal(msg, {
         dangerMode: true,
         buttons: true,
      });
      if (type === "delete-workspace" && checkBox) {
         dispatch(deleteWorkspace(info));
         localStorage.removeItem("workspaceInfo");
         navigate("/students");
      } else if (type === "finish-workspace" && checkBox) {
         dispatch(changeWorkspaceStatus(info));
         localStorage.removeItem("workspaceInfo");
         navigate("/students");
      }
   };

   // React Hook
   useEffect(() => {
      if (userType === "coordonator" && workspaceInfo?.student_id) {
         dispatch(getWorkspaceEvents(workspaceInfo.student_id));
      }
      if (userType === "student") {
         dispatch(getStudentStatus({}));
         // Get Events Only For Students Have Status 1
         if (studentStatus?.workspace_status === 1) {
            dispatch(getStudentEvents({}));
         }
      }
   }, []);

   if (user) {
      if (userType === "student") {
         // Status 1 => Access to Workspace page
         if (studentStatus?.workspace_status === 1) {
            return (
               <>
                  <Header userType={userType} />
                  <main className="main workspace-page">
                     <div className="container">
                        <div className="content">
                           <ul className="workspace-info">
                              <li className="item">
                                 Titlul: Aplica??ie web pentru asignarea
                                 lucrarilor de licen????
                              </li>
                              <li className="item">Coordinator: john doe</li>
                              <li className="item">Student: slman</li>
                           </ul>
                           <div className="workspace-btns">
                              <button
                                 className="btn post-btn"
                                 onClick={() => {
                                    navigate("add-post");
                                 }}
                              >
                                 Post
                                 <img
                                    src={addIcon}
                                    alt="btn-icon"
                                    className="btn-icon"
                                 />
                              </button>
                              <button
                                 className="btn task-btn"
                                 onClick={() => {
                                    navigate("add-task");
                                 }}
                              >
                                 Task
                                 <img
                                    src={addIcon}
                                    alt="btn-icon"
                                    className="btn-icon"
                                 />
                              </button>
                              <button
                                 className="btn meeting-btn"
                                 onClick={() => {
                                    navigate("add-meeting");
                                 }}
                              >
                                 Meeting
                                 <img
                                    src={addIcon}
                                    alt="btn-icon"
                                    className="btn-icon"
                                 />
                              </button>
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
                                    {workspaceEvents.length > 0 ? (
                                       workspaceEvents.map((cell, i) => {
                                          return (
                                             <tr key={i} className="row">
                                                <td className="cell">
                                                   {cell.title}
                                                </td>
                                                <td className="cell">
                                                   {cell.type}
                                                </td>
                                                <td className="cell">
                                                   {cell.due_date}
                                                </td>
                                                <td className="cell">
                                                   {(
                                                      <>
                                                         {cell.Attachment}{" "}
                                                         <img
                                                            src={attachIcon}
                                                            alt="attachment-icon"
                                                            className="icon"
                                                         />
                                                      </>
                                                   ) && ""}
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
                                             There Are No Events To Show.
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
         }
         // Status 2 => Finishing Work at Workspace
         else if (studentStatus?.workspace_status === 2) {
            return (
               <>
                  <Header userType={userType} />
                  <main className="main workspace-page">
                     <div className="container empty-workspace">
                        <div className="content">
                           <p className="text">This Workspace Was Finishing.</p>
                        </div>
                        <UniversityLogo />
                     </div>
                  </main>
               </>
            );
         }
         // Status null, 0, 3 => You Don't have workspace
         else {
            return (
               <>
                  <Header userType={userType} />
                  <main className="main workspace-page">
                     <div className="container empty-workspace">
                        <div className="content">
                           <p className="text">
                              Your Don't Have Any Workspace Yet. Please Select a
                              Tema From{" "}
                              <Link to="/list-of-topics" className="text_href">
                                 List Of Topics
                              </Link>
                              .
                           </p>
                        </div>
                        <UniversityLogo />
                     </div>
                  </main>
               </>
            );
         }
      } else if (userType === "coordonator") {
         if (workspaceInfo?.student_id) {
            return (
               <>
                  <Header userType={userType} />
                  <main className="main workspace-page">
                     <div className="container">
                        <div className="workspace-end">
                           <button
                              className="btn delete-btn"
                              onClick={() => {
                                 confirmProcess(
                                    "delete-workspace",
                                    workspaceInfo.workspace_id,
                                    "Are You Surem You Want To Delete This Workspace?"
                                 );
                              }}
                           >
                              Delete
                           </button>
                           <button
                              className="btn post-btn"
                              onClick={() => {
                                 confirmProcess(
                                    "finish-workspace",
                                    [{ status: 2 }, workspaceInfo.workspace_id],
                                    "Are You Sure, You Want To Finish This Workspace?"
                                 );
                              }}
                           >
                              Finish
                           </button>
                        </div>
                        <div className="content">
                           <ul className="workspace-info">
                              <li className="item">
                                 Titlul: {workspaceInfo.tema_name}
                              </li>
                              <li className="item">
                                 Coordinator: {JSON.parse(user)?.name}
                              </li>
                              <li className="item">Student: slman</li>
                           </ul>
                           <div className="workspace-btns">
                              <button
                                 className="btn post-btn"
                                 onClick={() => {
                                    if (!workspaceGlobal.loading) {
                                       navigate("add-post");
                                    }
                                 }}
                              >
                                 Post
                                 <img
                                    src={addIcon}
                                    alt="btn-icon"
                                    className="btn-icon"
                                 />
                              </button>
                              <button
                                 className="btn task-btn"
                                 onClick={() => {
                                    if (!workspaceGlobal.loading) {
                                       navigate("add-task");
                                    }
                                 }}
                              >
                                 Task
                                 <img
                                    src={addIcon}
                                    alt="btn-icon"
                                    className="btn-icon"
                                 />
                              </button>
                              <button
                                 className="btn meeting-btn"
                                 onClick={() => {
                                    if (!workspaceGlobal.loading) {
                                       navigate("add-meeting");
                                    }
                                 }}
                              >
                                 Meeting
                                 <img
                                    src={addIcon}
                                    alt="btn-icon"
                                    className="btn-icon"
                                 />
                              </button>
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
                                    {workspaceEvents.length > 0 ? (
                                       workspaceEvents.map((cell, i) => {
                                          return (
                                             <tr key={i} className="row">
                                                <td className="cell">
                                                   {cell.type === "post" ? (
                                                      <Link
                                                         to="post"
                                                         state={{
                                                            eventId: cell.id,
                                                         }}
                                                      >
                                                         {cell.title}
                                                      </Link>
                                                   ) : null}
                                                   {cell.type === "meeting" ? (
                                                      <Link
                                                         to="edite-meeting"
                                                         state={{
                                                            eventId: cell.id,
                                                         }}
                                                      >
                                                         {cell.title}
                                                      </Link>
                                                   ) : null}
                                                   {cell.type === "task" ? (
                                                      <Link
                                                         to="edite-task"
                                                         state={{
                                                            eventId: cell.id,
                                                         }}
                                                      >
                                                         {cell.title}
                                                      </Link>
                                                   ) : null}
                                                </td>
                                                <td className="cell">
                                                   {cell.type}
                                                </td>
                                                <td className="cell">
                                                   {cell.due_date}
                                                </td>
                                                <td className="cell">
                                                   {(
                                                      <>
                                                         {cell.Attachment}{" "}
                                                         <img
                                                            src={attachIcon}
                                                            alt="attachment-icon"
                                                            className="icon"
                                                         />
                                                      </>
                                                   ) && ""}
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
                                             There Are No Events To Show.
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
         } else {
            return (
               <>
                  <Header userType={userType} />
                  <main className="main workspace-page">
                     <div className="empty-workspace container">
                        <p className="text">
                           Please Select A Student From{" "}
                           <Link to="/students" className="text_href">
                              Studends
                           </Link>{" "}
                           Page
                        </p>
                        <UniversityLogo />
                     </div>
                  </main>
               </>
            );
         }
      } else {
         return <Navigate to="/homepage" />;
      }
   } else {
      return <Navigate to="/" />;
   }
};

export default Workspace;
