// External
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
// Internal
import checkIcon from "../assets/imgs/icons/checkIcon.png";
import editeIcon from "../assets/imgs/icons/editeIcon.png";
import deleteIcon from "../assets/imgs/icons/deleteIcon.png";
import attachIcon from "../assets/imgs/icons/attachIcon.png";
import Spinning from "./Spinning";
import { seBtnProcess, setWorkspaceInfo } from "../redux/global/globalSlice";
import { deleteTopic } from "../redux/topics/topicsActions";
import { changeWorkspaceStatus } from "../redux/workspaces/workspacesActions";
import { getFile } from "../redux/attachments/attachmentsActions";

const TableProcess = ({
   process,
   selectionInfo,
   workspaceInfo,
   temaId,
   workspaceId,
   eventType,
   eventId,
   eventTitle,
   fileName,
}) => {
   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   const selectedTema = useSelector(
      (state) => state.global.workspaceInfo.tema_id
   );
   const userStatus = useSelector((state) => state.users.studentStatus);
   const topics = useSelector((state) => state.topics);
   const workspace = useSelector((state) => state.workspaces);
   const btnProcess = useSelector((state) => state.global.btnProcess);
   const file = useSelector((state) => state.attachments);

   // ======================= Redux Hook =======================
   // To Prevent Show Loading Spin Unless Selected Tema
   const [selectedTemaId, setSelectedTemaId] = useState(null);
   const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
   const [selectedEventId, setSelectedEventId] = useState(null);

   // ======================= Router Hook =======================
   const navigate = useNavigate();

   // ======================= Handler =======================
   const handleDownloade = () => {
      // Save Event ID To Make Exactly File Spining
      setSelectedEventId(eventId);
      // Send Request
      dispatch(getFile(eventId)).then(({ payload }) => {
         const blob = new Blob([payload]);
         const href = URL.createObjectURL(blob);
         // Create Anhor Link Element
         const anchorLink = document.createElement("a");
         // Hide Element
         anchorLink.style.display = "none";
         // Add Href And File Name
         anchorLink.href = href;
         anchorLink.download = fileName;
         // Append Element To Document
         document.body.append(anchorLink);
         // Auto Click To Start Download
         anchorLink.click();
         // Remove Element And URL After End Download Process
         anchorLink.remove();
         URL.revokeObjectURL(href);
      });
   };

   // Check Box To Confirm Process
   const confirmProcess = async (method, token, msg, processStatus) => {
      let checkBox = await swal(msg, {
         dangerMode: true,
         buttons: true,
      });
      if (checkBox) {
         // Set Action Method
         dispatch(method(token));
         // Set Btn Status To Use It Later To Show Alert Or Not
         dispatch(seBtnProcess(processStatus));
      }
   };
   // Workspace Page => For Cell Contain Title As Link Route You To Event By Event_ID
   if (process?.link) {
      if (eventType === "post") {
         return (
            <Link
               to="post"
               state={{
                  eventId: eventId,
               }}
            >
               {eventTitle}
            </Link>
         );
      } else if (eventType === "task") {
         return (
            <Link
               to="task"
               state={{
                  eventId: eventId,
               }}
            >
               {eventTitle}
            </Link>
         );
      } else if (eventType === "meeting") {
         return (
            <Link
               to="edite-meeting"
               state={{
                  eventId: eventId,
               }}
            >
               {eventTitle}
            </Link>
         );
      }
   } else if (process?.file) {
      return (
         <div className="wraper">
            {file.loading && selectedEventId ? (
               <Spinning size="small" />
            ) : (
               <img
                  src={attachIcon}
                  alt="download-icon"
                  style={{ cursor: "pointer" }}
                  onClick={handleDownloade}
               />
            )}
         </div>
      );
   } else if (process?.show) {
      return (
         <div className="wraper">
            <button
               className="btn show-btn"
               onClick={() => {
                  localStorage.setItem(
                     "workspaceInfo",
                     JSON.stringify(workspaceInfo)
                  );
                  navigate("/workspace");
               }}
            >
               Show
            </button>
         </div>
      );
   }

   return (
      <>
         {process?.select ? (
            <div
               className={`wraper ${
                  selectedTema === selectionInfo.tema_id ? "selected" : ""
               } 
               ${
                  userStatus?.workspace_status === 1 ||
                  userStatus?.workspace_status === 0
                     ? "disable"
                     : ""
               }            
               `}
            >
               <div
                  className="select-box"
                  onClick={() => {
                     // Prevent User Click If His Status Equal 0 Or 1
                     if (
                        userStatus?.workspace_status === 1 ||
                        userStatus?.workspace_status === 0
                     ) {
                        return;
                        // Allow User Click If His Status Doesn't Equal 0 Or 1
                     } else {
                        if (selectedTema === selectionInfo.tema_id) {
                           dispatch(
                              setWorkspaceInfo({
                                 tema_id: null,
                                 coordonator_id: null,
                              })
                           );
                        } else {
                           dispatch(setWorkspaceInfo(selectionInfo));
                        }
                     }
                  }}
               >
                  <img src={checkIcon} alt="check-icon" className="btn-icon" />
               </div>
            </div>
         ) : null}
         {process?.links ? (
            <div className="wraper">
               <button
                  className="btn show-btn"
                  onClick={() => {
                     localStorage.setItem(
                        "workspaceInfo",
                        JSON.stringify(workspaceInfo)
                     );
                     navigate("/workspace");
                  }}
               >
                  Show
               </button>
            </div>
         ) : null}
         {process?.edite && process?.delete ? (
            <div className="topic-btns">
               <button
                  className="btn edite-btn"
                  onClick={() =>
                     navigate("edite-topic", {
                        state: {
                           id: temaId,
                        },
                     })
                  }
               >
                  Edite
                  <img src={editeIcon} alt="edite-icon" className="btn-icon" />
               </button>
               {topics.loading && selectedTemaId === temaId ? (
                  <Spinning size="small" />
               ) : (
                  <button
                     className="btn delete-btn"
                     onClick={() => {
                        confirmProcess(deleteTopic, temaId, "Are you sure?", {
                           deleteTema: true,
                        });
                        setSelectedTemaId(temaId);
                     }}
                  >
                     Delete
                     <img
                        src={deleteIcon}
                        alt="delete-icon"
                        className="btn-icon"
                     />
                  </button>
               )}
            </div>
         ) : null}
         {process?.acceptBtn && process?.rejectBtn ? (
            <div className="status">
               <div className="topic-btns ">
                  {workspace.loading &&
                  workspaceId === selectedWorkspaceId &&
                  btnProcess.acceptStudent ? (
                     <Spinning size="small" />
                  ) : (
                     <button
                        className="btn edite-btn"
                        onClick={() => {
                           confirmProcess(
                              changeWorkspaceStatus,
                              [
                                 {
                                    status: 1,
                                 },
                                 workspaceId,
                              ],
                              "Are You Sure You Want To Accept This Student?",
                              {
                                 acceptStudent: true,
                              }
                           );
                           setSelectedWorkspaceId(workspaceId);
                        }}
                     >
                        Accept
                        <img
                           src={checkIcon}
                           alt="check-icon"
                           className="btn-icon"
                        />
                     </button>
                  )}
                  {workspace.loading &&
                  workspaceId === selectedWorkspaceId &&
                  btnProcess.rejectStudent ? (
                     <Spinning size="small" />
                  ) : (
                     <button
                        className="btn delete-btn"
                        onClick={() => {
                           confirmProcess(
                              changeWorkspaceStatus,
                              [
                                 {
                                    status: 3,
                                 },
                                 workspaceId,
                              ],
                              "Are You Sure You Want To Reject This Student?",
                              {
                                 rejectStudent: true,
                              }
                           );
                           setSelectedWorkspaceId(workspaceId);
                        }}
                     >
                        Reject
                        <img
                           src={deleteIcon}
                           alt="delete-icon"
                           className="btn-icon"
                        />
                     </button>
                  )}
               </div>
            </div>
         ) : null}
      </>
   );
};

export default TableProcess;
