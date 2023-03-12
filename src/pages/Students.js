import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import studentsIcon from "../assets/imgs/icons/studentsIcon.png";
import Header from "../components/Header";
import UniversityLogo from "../components/UniversityLogo";
import { getAcceptedWorkspace } from "../redux/workspaces/workspacesActions";

const Students = () => {
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // Redux Hook
   const dispatch = useDispatch();
   const acceptedWorkspaces = useSelector(
      (state) => state.workspaces.acceptedWorkspaces
   );

   // Router Hook
   const navigate = useNavigate();

   // React Hook
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
                                 {acceptedWorkspaces.length > 0
                                    ? acceptedWorkspaces.map((workspace, i) => {
                                         return (
                                            <tr key={i} className="row">
                                               <td className="cell">
                                                  {i + 1}.
                                               </td>
                                               <td className="cell">
                                                  {workspace.student.email}
                                               </td>
                                               <td className="cell">
                                                  {workspace.tema.title}
                                               </td>
                                               <td className="cell">
                                                  {
                                                     workspace.student
                                                        .specializare
                                                  }
                                               </td>
                                               <td className="cell">
                                                  <div className="wraper">
                                                     <button
                                                        className="btn show-btn"
                                                        onClick={() => {
                                                           navigate(
                                                              "/workspace",
                                                              {
                                                                 state: {
                                                                    student_id:
                                                                       workspace
                                                                          .student
                                                                          .id,
                                                                    workspace_id:
                                                                       workspace.worspace_id,
                                                                 },
                                                              }
                                                           );
                                                        }}
                                                     >
                                                        Show
                                                     </button>
                                                  </div>
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
      } else if (userType === "admin") {
         return (
            <>
               <Header userType={userType} />
               <main className="main students-page-admin">
                  <div className="container">Hello Admin</div>
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
