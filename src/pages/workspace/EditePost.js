import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import UniversityLogo from "../../components/UniversityLogo";
import addIcon from "../../assets/imgs/icons/addIcon.png";
import deleteIcon from "../../assets/imgs/icons/deleteIcon.png";
import { editeEvent } from "../../redux/events/eventsAction";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import Spinning from "../../components/Spinning";

const EditePost = () => {
   // ======================= Global Data =======================
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   const workspaceInfo = JSON.parse(localStorage.getItem("workspaceInfo"));

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   const events = useSelector((state) => state.events);
   const workspaceEvents = useSelector((state) => state.events.workspaceEvents);
   const { state } = useLocation();

   // ======================= Router Hook =======================
   const navigate = useNavigate();

   // ======================= Select Input Elements =======================
   const titleInput = useRef(null);
   const contentInput = useRef(null);
   const deadlineInput = useRef(null);
   const attachmentInput = useRef(null);

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

   // ======================= Vaidation =======================
   const fieldsValidation = (userInput) => {
      if (
         userInput.title === "" ||
         userInput.descriere === "" ||
         userInput.due_date === ""
      ) {
         processChecking("Please Fill All Fields.", "warning", "red-bg");
      } else {
         return true;
      }
   };

   // ======================= Handle Request =======================
   const handleProcess = () => {
      const userInput = {
         workspace_id: workspaceInfo.workspace_id,
         title: titleInput.current.value,
         descriere: contentInput.current.value,
         type: "post",
         due_date: deadlineInput.current.value,
         // attachment: attachmentInput.current.files[0],
      };
      if (fieldsValidation(userInput)) {
         dispatch(
            editeEvent({ eventID: state.eventId, eventContent: userInput })
         );
      }
   };

   // ======================= React Hook =======================
   const [fileName, setFileName] = useState(null);
   // Variable below to manipulate useEffect and prevente run initial-render
   const firstUpdate = useRef(true);
   useEffect(() => {
      // Prevent user to enter this page directly
      if (state?.eventId && workspaceEvents.length > 0) {
         const postEvent = workspaceEvents.find(
            (post) => post.id === state.eventId
         );
         titleInput.current.focus();
         titleInput.current.value = postEvent?.title ?? "";
         contentInput.current.value = postEvent?.descriere ?? "";
         deadlineInput.current.value = postEvent?.due_date ?? "";
      } else {
         navigate("/workspace");
      }
   }, []);
   useEffect(() => {
      if (firstUpdate.current) {
         firstUpdate.current = false;
         return;
      }
      if (!events.loading && events.error) {
         processChecking(events.error, "error", "red-bg");
      } else if (!events.loading && events.success) {
         processChecking("Edite Successfully", "success", "done");
         navigate("/workspace");
      }
   }, [events.error, events.success]);

   if (user) {
      return (
         <>
            <Header userType={userType} />
            <main className="main event-page">
               <div className="container">
                  <div className="content">
                     <h2 className="title">Edite Post</h2>
                     <ul className="box">
                        <li className="item">
                           <h3 className="item_title">Titlu:</h3>
                           <input
                              type="text"
                              placeholder="Scrie aici"
                              className="input-field"
                              ref={titleInput}
                           />
                        </li>
                        <li className="item">
                           <h3 className="item_title">Content:</h3>
                           <textarea
                              placeholder="Scrie aici"
                              className="textarea"
                              ref={contentInput}
                           ></textarea>
                        </li>
                        <li className="item">
                           <h3 className="item_title">Deadline:</h3>
                           <input
                              type="date"
                              placeholder="Scrie aici"
                              className="input-field"
                              ref={deadlineInput}
                           />
                        </li>
                        <li className="item">
                           <h3 className="item_title">Attachment:</h3>
                           <label htmlFor="file" className="file-input">
                              <img
                                 src={addIcon}
                                 alt="btn-icon"
                                 className="btn-icon"
                              />
                              Add
                              <input
                                 id="file"
                                 type="file"
                                 className="input-field"
                                 ref={attachmentInput}
                                 onChange={() =>
                                    setFileName(
                                       attachmentInput.current.files[0].name
                                    )
                                 }
                              />
                           </label>
                        </li>
                        <li className="item">
                           {fileName ? (
                              <div className="attachName">
                                 {fileName}
                                 <img
                                    src={deleteIcon}
                                    alt="btn-icon"
                                    className="btn-icon"
                                    onClick={() => {
                                       attachmentInput.current.value = "";
                                       setFileName(null);
                                    }}
                                 />
                              </div>
                           ) : null}
                        </li>
                        <div className="save-btn-space">
                           {events.loading ? (
                              <Spinning size="small" />
                           ) : (
                              <button
                                 className="btn save-btn"
                                 onClick={handleProcess}
                              >
                                 Save
                              </button>
                           )}
                        </div>
                     </ul>
                  </div>
                  <UniversityLogo />
               </div>
            </main>
         </>
      );
   } else {
      return <Navigate to="/" />;
   }
};

export default EditePost;
