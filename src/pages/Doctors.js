import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import UniversityLogo from "../components/UniversityLogo";

const Doctors = () => {
   // ======================= Global Data =======================
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   //    const test = useSelector((state) => state);

   // ======================= React Hook =======================
   useEffect(() => {
      if (userType === "admin") {
         //  dispatch();
      }
   }, []);

   if (user) {
      if (userType === "admin") {
         // Names Of Table Columns
         const tableCol = ["Nr", "Student", "Specializare"];
         return (
            <>
               <Header userType={userType} />
               <main className="main doctors-page">
                  <div className="container">
                     <div className="content">
                        <h2 className="title">1. Zaharie Daniela</h2>
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
                                 {/* {acceptedWorkspaces.length > 0 ? (
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
                                 )} */}
                                 <tr className="row">
                                    <td
                                       className="cell empty-table"
                                       colSpan={tableCol.length}
                                    >
                                       There Are No Students To Show.
                                    </td>
                                 </tr>
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

export default Doctors;
