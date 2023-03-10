import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header";
import stepsIcon from "../assets/imgs/icons/stepsIcon.png";
import statusIcon from "../assets/imgs/icons/statusIcon.png";
import UniversityLogo from "../components/UniversityLogo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWaitingWorkspace } from "../redux/workspaces/workspacesActions";

const HomePage = () => {
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // Redux Hook
   const dispatch = useDispatch();
   const waitingWorkspaces = useSelector(
      (state) => state.workspaces.waitingWorkspaces
   );

   // React Hook
   useEffect(() => {
      if (userType === "coordonator") {
         dispatch(getWaitingWorkspace({}));
      }
   }, []);

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
                           <li className="step">
                              <img
                                 src={statusIcon}
                                 alt="status-icon"
                                 className="icon"
                              />
                              Starea de acceptare coordonatorului pentru tema de
                              licenta.
                           </li>
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
            "Titlul lucrării",
            "Specializare",
            "Statutul de student",
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
                                 {waitingWorkspaces.length > 0
                                    ? waitingWorkspaces.map((cell, i) => {
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
                                                  <div className="wraper">
                                                     <div className="select-box">
                                                        test
                                                     </div>
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
                     <div className="content">
                        <div className="title">
                           <img
                              src={stepsIcon}
                              alt="steps-icon"
                              className="icon"
                           />
                           <p className="text">Sarcinile tale</p>
                        </div>
                        {/* <Table cols={tableCol2} /> */}
                     </div>
                  </div>
               </main>
            </>
         );
      } else if (userType === "adimn") {
         return (
            <>
               <Header userType={userType} />
               <main className="main">
                  <div className="container">
                     <h1>coordonator view</h1>
                  </div>
               </main>
            </>
         );
      } else {
         return <h1>Please Login or register </h1>;
      }
   } else {
      return <Navigate to="/" />;
   }
};

export default HomePage;
