// External
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Internal
import checkIcon from "../assets/imgs/icons/checkIcon.png";
import { setWorkspaceInfo } from "../redux/global/globalSlice";

const TableProcess = ({ process, selectionInfo, workspaceInfo }) => {
   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   const selectedTema = useSelector(
      (state) => state.global.workspaceInfo.tema_id
   );
   const userStatus = useSelector((state) => state.users.studentStatus);

   // ======================= Router Hook =======================
   const navigate = useNavigate();

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
      </>
   );
};

export default TableProcess;
