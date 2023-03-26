// External
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
// Internal
import checkIcon from "../assets/imgs/icons/checkIcon.png";
import editeIcon from "../assets/imgs/icons/editeIcon.png";
import deleteIcon from "../assets/imgs/icons/deleteIcon.png";
import { setWorkspaceInfo } from "../redux/global/globalSlice";
import Spinning from "./Spinning";
import { deleteTopic } from "../redux/topics/topicsActions";

const TableProcess = ({ process, selectionInfo, workspaceInfo, temaId }) => {
   // ======================= Global Data =======================
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   const selectedTema = useSelector(
      (state) => state.global.workspaceInfo.tema_id
   );
   const userStatus = useSelector((state) => state.users.studentStatus);
   const topics = useSelector((state) => state.topics);

   // ======================= Redux Hook =======================
   // To Prevent Show Alert Unless Process Is Success Or Rejected
   const [processDone, setProcessDone] = useState(false);
   // To Prevent Show Loading Spin Unless Selected Tema
   const [selectedTemaId, setSelectedTemaId] = useState(false);

   // Variable Below To Prevent Run useEffect Initial-Render
   const firstUpdate = useRef(true);
   useEffect(() => {
      if (firstUpdate.current) {
         firstUpdate.current = false;
         return;
      }
      if (userType === "coordonator") {
         if (processDone) {
            if (!topics.loading && topics.error) {
               processChecking(topics.error, "error", "red-bg");
               setProcessDone(false); // Reset
            } else if (!topics.loading && topics.success) {
               processChecking("Process Successfully", "success", "done");
               setProcessDone(false); // Reset
            }
         }
      }
   }, [topics.error, topics.success]);

   // ======================= Router Hook =======================
   const navigate = useNavigate();

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
   // Check Box to confirm deletion process
   const confirmDeletion = async (topicId) => {
      let checkBox = await swal("Are you sure?", {
         dangerMode: true,
         buttons: true,
      });
      if (checkBox) {
         dispatch(deleteTopic(topicId));
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
                        confirmDeletion(temaId);
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
      </>
   );
};

export default TableProcess;
