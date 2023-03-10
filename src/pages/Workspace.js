import { Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import UniversityLogo from "../components/UniversityLogo";
import attachIcon from "../assets/imgs/icons/attachIcon.png";
import addIcon from "../assets/imgs/icons/addIcon.png";

const Workspace = () => {
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // Router Hook
   const navigate = useNavigate();

   // Names Of Table Columns
   const tableCol = ["Titlu", "Type", "Deadline", "Attachment"];
   // Content Of Table Rows (just for testing)
   const tableContent = [
      {
         Titlu: "Plan de licenta",
         Type: "Post",
         Deadline: "15/01/2023    18:00 PM",
         Attachment: "",
      },
      {
         Titlu: "Meeting",
         Type: "Task",
         Deadline: "15/01/2023    18:00 PM",
         Attachment: "Attachment",
      },
      {
         Titlu: "Titlu 3",
         Type: "Meeting",
         Deadline: "Deadline",
         Attachment: "",
      },
   ];

   if (user) {
      if (userType === "student") {
         return (
            <>
               <Header userType={userType} />
               <main className="main workspace-page">
                  <div className="container">
                     <div className="content">
                        <ul className="workspace-info">
                           <li className="item">
                              Titlul: Aplicație web pentru asignarea lucrarilor
                              de licență
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
                                 {tableContent.length > 0
                                    ? tableContent.map((cell, i) => {
                                         return (
                                            <tr key={i} className="row">
                                               <td className="cell">
                                                  {cell.Titlu}
                                               </td>
                                               <td className="cell">
                                                  {cell.Type}
                                               </td>
                                               <td className="cell">
                                                  {cell.Deadline}
                                               </td>
                                               <td className="cell">
                                                  {cell.Attachment && (
                                                     <>
                                                        {cell.Attachment}{" "}
                                                        <img
                                                           src={attachIcon}
                                                           alt="students-icon"
                                                           className="icon"
                                                        />
                                                     </>
                                                  )}
                                               </td>
                                            </tr>
                                         );
                                      })
                                    : null}
                              </tbody>
                           </table>
                        </div>
                     </div>
                     <UniversityLogo />
                  </div>
               </main>
            </>
         );
      } else if (userType === "coordonator") {
         return (
            <>
               <Header userType={userType} />
               <main className="main workspace-page">
                  <div className="container">
                     <div className="content">
                        <ul className="workspace-info">
                           <li className="item">
                              Titlul: Aplicație web pentru asignarea lucrarilor
                              de licență
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
                                 {tableContent.length > 0
                                    ? tableContent.map((cell, i) => {
                                         return (
                                            <tr key={i} className="row">
                                               <td className="cell">
                                                  {cell.Titlu}
                                               </td>
                                               <td className="cell">
                                                  {cell.Type}
                                               </td>
                                               <td className="cell">
                                                  {cell.Deadline}
                                               </td>
                                               <td className="cell">
                                                  {cell.Attachment && (
                                                     <>
                                                        {cell.Attachment}{" "}
                                                        <img
                                                           src={attachIcon}
                                                           alt="students-icon"
                                                           className="icon"
                                                        />
                                                     </>
                                                  )}
                                               </td>
                                            </tr>
                                         );
                                      })
                                    : null}
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
         return <Navigate to="/homepage" />;
      }
   } else {
      return <Navigate to="/" />;
   }
};

export default Workspace;
