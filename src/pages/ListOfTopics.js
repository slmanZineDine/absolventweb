// External
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import swal from "sweetalert";
// Internal
import Header from "../components/Header";
import Search from "../components/Search";
import Filter from "../components/Filter";
import checkIcon from "../assets/imgs/icons/checkIcon.png";
import { getAllTopicsByDoctor } from "../redux/topics/topicsActions";
import { createWorkspace } from "../redux/workspaces/workspacesActions";
import { getStudentStatus } from "../redux/users/uersAction";
import Spinning from "../components/Spinning";

const ListOfTopics = () => {
   // ======================= Global Data =======================
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   document.title = "Absolventweb | Teme Propuse";

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   const topicsByDoctor = useSelector((state) => state.topics.topicsByDoctor);
   const workspace = useSelector((state) => state.workspaces);
   const userStatus = useSelector((state) => state.users.studentStatus);

   // ======================= Own Function =======================
   /**
    * Use This Function To Create Paination Beasd in Tema Count (3 Tema in 1 Pagination)
    * @param Number Count of Teme
    * @returns Array Of Count Pagination
    */
   const getPagination = (temeCount) => {
      const pagination = [];
      for (let i = 0; i < Math.ceil(temeCount / 3); i++) pagination.push(i);
      return pagination;
   };

   // ======================= React Hook =======================
   // Use this to remove selected tema after save your request
   const [selectedTema, setSelectedTema] = useState(false);
   // Use this to save selected tema information
   const [workspaceInfo, setWorkspaceInfo] = useState({
      tema_id: null,
      coordonator_id: null,
   });
   // Pagination
   // Store Pagination Defaul Values
   const [paginationDefault, setPaginationDefault] = useState({
      start: 0,
      end: 3,
   });
   // Store Pagination New Values
   const [paginationNewValue, setPaginationNewValue] = useState({
      start: 0,
      end: 3,
   });
   // Store Doctor's Table Id
   const [tableId, setTableId] = useState(null);
   // Use This To Specify Selected Pagin
   const [selectedPagin, setSelectedPagin] = useState(0);

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

   // ======================= Handle User Select =======================
   // Checking If User Select A Tema of Not
   const handleCreation = () => {
      if (workspaceInfo.tema_id && workspaceInfo.coordonator_id) {
         confirmCreation(workspaceInfo);
      } else {
         processChecking("Please Select A Tema.", "warning", "red-bg");
      }
   };

   // ======================= React Hook =======================
   const [processDone, setProcessDone] = useState(false);
   useEffect(() => {
      if (user) {
         dispatch(getAllTopicsByDoctor({}));
      }
      if (userType === "student") {
         dispatch(getStudentStatus({}));
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

   if (user) {
      if (userType === "student") {
         // Names Of Table Columns
         const tableCol = ["Nr", "Tema", "Type", "Detalii", "Specializare", ""];

         return (
            <>
               <Header userType={userType} />
               <main className="main list-of-topics-page">
                  <div className="container">
                     <Search resetPagination={setPaginationNewValue} />
                     <Filter
                        resetPagination={setPaginationNewValue}
                        programmingLang={true}
                        topicType={true}
                     />
                     {userStatus?.workspace_status === 1 ||
                     userStatus?.workspace_status === 0 ? null : (
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
                     )}
                     {topicsByDoctor.length > 0
                        ? topicsByDoctor.map((doctor, i) => (
                             <div key={i} className="content">
                                <h2 className="title">
                                   {i + 1}. ({doctor.email})
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
                                         {doctor?.teme?.length > 0 &&
                                         doctor.id !== tableId
                                            ? doctor.teme
                                                 .map((cell, i) => {
                                                    return (
                                                       <tr
                                                          key={i}
                                                          className="row"
                                                       >
                                                          <td className="cell">
                                                             {i + 1}.
                                                          </td>
                                                          <td className="cell">
                                                             {cell.title}
                                                          </td>
                                                          <td className="cell">
                                                             {cell.tema_type}
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
                                                             } ${
                                                                userStatus?.workspace_status ===
                                                                   1 ||
                                                                userStatus?.workspace_status ===
                                                                   0
                                                                   ? "disable"
                                                                   : ""
                                                             }`}
                                                             onClick={() => {
                                                                setWorkspaceInfo(
                                                                   {
                                                                      tema_id:
                                                                         cell.id,
                                                                      coordonator_id:
                                                                         cell.coordonator_id,
                                                                   }
                                                                );
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
                                                                if (
                                                                   userStatus?.workspace_status ===
                                                                      1 ||
                                                                   userStatus?.workspace_status ===
                                                                      0
                                                                ) {
                                                                   setSelectedTema(
                                                                      false
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
                                                 .slice(
                                                    paginationDefault.start,
                                                    paginationDefault.end
                                                 )
                                            : doctor.teme
                                                 .map((cell, i) => {
                                                    return (
                                                       <tr
                                                          key={i}
                                                          className="row"
                                                       >
                                                          <td className="cell">
                                                             {i + 1}.
                                                          </td>
                                                          <td className="cell">
                                                             {cell.title}
                                                          </td>
                                                          <td className="cell">
                                                             {cell.tema_type}
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
                                                             } ${
                                                                userStatus?.workspace_status ===
                                                                   1 ||
                                                                userStatus?.workspace_status ===
                                                                   0
                                                                   ? "disable"
                                                                   : ""
                                                             }`}
                                                             onClick={() => {
                                                                setWorkspaceInfo(
                                                                   {
                                                                      tema_id:
                                                                         cell.id,
                                                                      coordonator_id:
                                                                         cell.coordonator_id,
                                                                   }
                                                                );
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
                                                                if (
                                                                   userStatus?.workspace_status ===
                                                                      1 ||
                                                                   userStatus?.workspace_status ===
                                                                      0
                                                                ) {
                                                                   setSelectedTema(
                                                                      false
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
                                                 .slice(
                                                    paginationNewValue.start,
                                                    paginationNewValue.end
                                                 )}
                                      </tbody>
                                   </table>
                                </div>
                                <div className="pagination">
                                   {getPagination(doctor.teme.length).map(
                                      (pagin, i) => (
                                         <span
                                            key={pagin}
                                            className={`pagin ${
                                               selectedPagin === pagin &&
                                               doctor.id === tableId
                                                  ? "selected-pagin"
                                                  : ""
                                            }`}
                                            onClick={() => {
                                               setTableId(doctor?.id);
                                               setPaginationNewValue({
                                                  start: i * 3,
                                                  end: (i + 1) * 3,
                                               });
                                               setSelectedPagin(pagin);
                                            }}
                                         >
                                            {i + 1}
                                         </span>
                                      )
                                   )}
                                </div>
                             </div>
                          ))
                        : null}
                  </div>
               </main>
            </>
         );
      } else if (userType === "coordonator" || userType === "admin") {
         // Names Of Table Columns
         const tableCol = ["Nr", "Tema", "Type", "Detalii", "Specializare"];

         return (
            <>
               <Header userType={userType} />
               <main className="main list-of-topics-page">
                  <div className="container">
                     <Search resetPagination={setPaginationNewValue} />
                     <Filter
                        resetPagination={setPaginationNewValue}
                        programmingLang={true}
                        topicType={true}
                     />
                     {userType === "admin" ? (
                        <div className="save-btn-space">
                           {workspace.loading ? (
                              <Spinning size="small" />
                           ) : (
                              <button
                                 className="btn save-btn"
                                 onClick={() => console.log("Export Done")}
                              >
                                 Export
                              </button>
                           )}
                        </div>
                     ) : null}
                     {topicsByDoctor.length > 0
                        ? topicsByDoctor.map((doctor, i) => (
                             <div key={i} className="content">
                                <h2 className="title">
                                   {i + 1}. ({doctor.email})
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
                                         {doctor?.teme?.length > 0 &&
                                         doctor.id !== tableId
                                            ? doctor.teme
                                                 .map((cell, i) => {
                                                    return (
                                                       <tr
                                                          key={i}
                                                          className="row"
                                                       >
                                                          <td className="cell">
                                                             {i + 1}.
                                                          </td>
                                                          <td className="cell">
                                                             {cell.title}
                                                          </td>
                                                          <td className="cell">
                                                             {cell.tema_type}
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
                                                 .slice(
                                                    paginationDefault.start,
                                                    paginationDefault.end
                                                 )
                                            : doctor.teme
                                                 .map((cell, i) => {
                                                    return (
                                                       <tr
                                                          key={i}
                                                          className="row"
                                                       >
                                                          <td className="cell">
                                                             {i + 1}.
                                                          </td>
                                                          <td className="cell">
                                                             {cell.title}
                                                          </td>
                                                          <td className="cell">
                                                             {cell.tema_type}
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
                                                 .slice(
                                                    paginationNewValue.start,
                                                    paginationNewValue.end
                                                 )}
                                      </tbody>
                                   </table>
                                </div>
                                <div className="pagination">
                                   {getPagination(doctor.teme.length).map(
                                      (pagin, i) => (
                                         <span
                                            key={pagin}
                                            className={`pagin ${
                                               selectedPagin === pagin &&
                                               doctor.id === tableId
                                                  ? "selected-pagin"
                                                  : ""
                                            }`}
                                            onClick={() => {
                                               setTableId(doctor?.id);
                                               setPaginationNewValue({
                                                  start: i * 3,
                                                  end: (i + 1) * 3,
                                               });
                                               setSelectedPagin(pagin);
                                            }}
                                         >
                                            {i + 1}
                                         </span>
                                      )
                                   )}
                                </div>
                             </div>
                          ))
                        : null}
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

export default ListOfTopics;
