// External
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
// Internal
import checkIcon from "../assets/imgs/icons/checkIcon.png";
import editeIcon from "../assets/imgs/icons/editeIcon.png";
import deleteIcon from "../assets/imgs/icons/deleteIcon.png";
import { seBtnProcess, setWorkspaceInfo } from "../redux/global/globalSlice";
import Spinning from "./Spinning";
import { deleteTopic } from "../redux/topics/topicsActions";
import { changeWorkspaceStatus } from "../redux/workspaces/workspacesActions";

const TableProcess = ({
   process,
   selectionInfo,
   workspaceInfo,
   temaId,
   workspaceId,
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

   // ======================= Redux Hook =======================
   // To Prevent Show Loading Spin Unless Selected Tema
   const [selectedTemaId, setSelectedTemaId] = useState(null);
   const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);

   // ======================= Router Hook =======================
   const navigate = useNavigate();

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
         {process?.show ? (
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
