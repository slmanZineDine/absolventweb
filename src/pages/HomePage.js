import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header";
import stepsIcon from "../assets/imgs/icons/stepsIcon.png";
import statusIcon from "../assets/imgs/icons/statusIcon.png";
import UniversityLogo from "../components/UniversityLogo";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   changeWorkspaceStatus,
   getWaitingWorkspace,
} from "../redux/workspaces/workspacesActions";
import checkIcon from "../assets/imgs/icons/checkIcon.png";
import deleteIcon from "../assets/imgs/icons/deleteIcon.png";
import swal from "sweetalert";

const HomePage = () => {
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // Redux Hook
   const dispatch = useDispatch();
   const waitingWorkspaces = useSelector(
      (state) => state.workspaces.waitingWorkspaces
   );
   const workspace = useSelector((state) => state.workspaces);

   // Alert Box From Sweet Alert labrary
   const processChecking = async (msg, icon, theClassName) => {
      await swal(msg, {
         buttons: false,
         timer: 3000,
         icon: icon,
         className: theClassName,
         closeOnEsc: false,
      });
   };

   // React Hook
   const [processDone, setProcessDone] = useState(false);
   useEffect(() => {
      if (userType === "coordonator") {
         dispatch(getWaitingWorkspace({}));
      }
   }, []);
   // Variable below to manipulate useEffect and prevente run initial-render
   const firstUpdate = useRef(true);
   useEffect(() => {
      if (firstUpdate.current) {
         firstUpdate.current = false;
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

   // Checking Box To Confirm Accept A Workspace
   const confirmAccept = async (status) => {
      let checkBox = await swal(
         "Are you sure you want to accept this student?",
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
      let checkBox = await swal("Are you sure you to reject this student?", {
         dangerMode: true,
         buttons: true,
      });
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
