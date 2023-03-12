import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Filter from "../components/Filter";
import Header from "../components/Header";
import Search from "../components/Search";
import checkIcon from "../assets/imgs/icons/checkIcon.png";
import { getAllTopicsByDoctor } from "../redux/topics/topicsActions";
import { createWorkspace } from "../redux/workspaces/workspacesActions";
import swal from "sweetalert";
import Spinning from "../components/Spinning";

const ListOfTopics = () => {
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // Redux Hook
   const dispatch = useDispatch();
   const topicsByDoctor = useSelector((state) => state.topics.topicsByDoctor);
   const workspace = useSelector((state) => state.workspaces);

   // React Hook
   // Use this to remove selected tema after save your request
   const [selectedTema, setSelectedTema] = useState(false);
   const [workspaceInfo, setWorkspaceInfo] = useState({
      tema_id: null,
      coordonator_id: null,
   });

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
      if (user) {
         dispatch(getAllTopicsByDoctor({}));
      }
   }, []);
   // Variable below to manipulate useEffect and prevente run initial-render
   const firstUpdate = useRef(true);
   useEffect(() => {
      if (firstUpdate.current) {
         firstUpdate.current = false;
         return;
      }
      if (userType === "student") {
         console.log(processDone);
         if (processDone) {
            if (!workspace.loading && workspace.error) {
               processChecking(workspace.error, "error", "red-bg");
               setProcessDone(false); // Reset
               setSelectedTema(false);
            } else if (!workspace.loading && workspace.success) {
               processChecking("Process Successfully", "success", "done");
               setProcessDone(false); // Reset
            }
         }
      }
   }, [workspace.error, workspace.success]);

   // Checking Box To Confirm Creation A New Workspace
   const confirmCreation = async (workspace) => {
      let checkBox = await swal("Are you sure?", {
         dangerMode: true,
         buttons: true,
      });
      if (checkBox) {
         dispatch(createWorkspace(workspace));
         setProcessDone(true);
      }
   };

   // Checking If User Select A Tema of Not
   const handleCreation = () => {
      if (workspaceInfo.tema_id && workspaceInfo.coordonator_id) {
         confirmCreation(workspaceInfo);
      } else {
         processChecking("Please Select A Tema.", "warning", "red-bg");
      }
   };
   if (user) {
      if (userType === "student") {
         // Names Of Table Columns
         const tableCol = ["Nr", "Tema", "Detalii", "Specializare", " "];

         return (
            <>
               <Header userType={userType} />
               <main className="main list-of-topics-page">
                  <div className="container">
                     <Search />
                     <Filter
                        doctor={true}
                        programmingLang={true}
                        topicType={true}
                     />
                     <div className="save-btn-space">
                        {workspace.loading ? (
                           <Spinning size="small" />
                        ) : (
                           <button
                              className="btn save-btn"
                              onClick={handleCreation}
                           >
                              Save
                           </button>
                        )}
                     </div>
                     {topicsByDoctor.length > 0
                        ? topicsByDoctor.map((doctor, i) => (
                             <div key={i} className="content">
                                <h2 className="title">
                                   {i + 1}. {doctor.email}
                                </h2>
                                <div className="cover">
                                   <table className="table">
                                      <thead className="thead">
                                         <tr className="main-row">
                                            {tableCol.map((colName, i) => (
                                               <th
                                                  key={i}
                                                  className="main-cell"
                                               >
                                                  {colName}
                                               </th>
                                            ))}
                                         </tr>
                                      </thead>
                                      <tbody className="tbody">
                                         {doctor?.teme?.length > 0
                                            ? doctor.teme.map((cell, i) => {
                                                 return (
                                                    <tr key={i} className="row">
                                                       <td className="cell">
                                                          {i + 1}.
                                                       </td>
                                                       <td className="cell">
                                                          {cell.title}
                                                       </td>
                                                       <td className="cell">
                                                          {cell.detalii}
                                                       </td>
                                                       <td className="cell">
                                                          {cell.specializare}
                                                       </td>
                                                       <td
                                                          className={`cell ${
                                                             selectedTema &&
                                                             workspaceInfo.tema_id ===
                                                                cell.id
                                                                ? "selected"
                                                                : ""
                                                          }`}
                                                          onClick={() => {
                                                             setWorkspaceInfo({
                                                                tema_id:
                                                                   cell.id,
                                                                coordonator_id:
                                                                   cell.coordonator_id,
                                                             });
                                                             if (
                                                                selectedTema &&
                                                                workspaceInfo.tema_id ===
                                                                   cell.id
                                                             ) {
                                                                setSelectedTema(
                                                                   false
                                                                );
                                                             } else {
                                                                setSelectedTema(
                                                                   true
                                                                );
                                                             }
                                                          }}
                                                       >
                                                          <div className="wraper">
                                                             <div className="select-box">
                                                                <img
                                                                   src={
                                                                      checkIcon
                                                                   }
                                                                   alt="check-icon"
                                                                   className="btn-icon"
                                                                />
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
                          ))
                        : null}
                  </div>
               </main>
            </>
         );
      } else if (userType === "coordonator") {
         // Names Of Table Columns
         const tableCol = ["Nr", "Tema", "Detalii", "Specializare"];

         return (
            <>
               <Header userType={userType} />
               <main className="main list-of-topics-page">
                  <div className="container">
                     <Search />
                     <Filter
                        doctor={true}
                        programmingLang={true}
                        topicType={true}
                     />
                     {topicsByDoctor.length > 0
                        ? topicsByDoctor.map((doctor, i) => (
                             <div key={i} className="content">
                                <h2 className="title">
                                   {i + 1}. {doctor.email}
                                </h2>
                                <div className="cover">
                                   <table className="table">
                                      <thead className="thead">
                                         <tr className="main-row">
                                            {tableCol.map((colName, i) => (
                                               <th
                                                  key={i}
                                                  className="main-cell"
                                               >
                                                  {colName}
                                               </th>
                                            ))}
                                         </tr>
                                      </thead>
                                      <tbody className="tbody">
                                         {doctor?.teme?.length > 0
                                            ? doctor.teme.map((cell, i) => {
                                                 return (
                                                    <tr key={i} className="row">
                                                       <td className="cell">
                                                          {i + 1}.
                                                       </td>
                                                       <td className="cell">
                                                          {cell.title}
                                                       </td>
                                                       <td className="cell">
                                                          {cell.detalii}
                                                       </td>
                                                       <td className="cell">
                                                          {cell.specializare}
                                                       </td>
                                                    </tr>
                                                 );
                                              })
                                            : null}
                                      </tbody>
                                   </table>
                                </div>
                             </div>
                          ))
                        : null}
                  </div>
               </main>
            </>
         );
      } else if (userType === "adimn") {
         return <h1>admin view</h1>;
      } else {
         return <h1>Please Login or register </h1>;
      }
   } else {
      return <Navigate to="/" />;
   }
};

export default ListOfTopics;
