// External
import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
// Internal
import Header from "../../components/Header";
import UniversityLogo from "../../components/UniversityLogo";
import addIcon from "../../assets/imgs/icons/addIcon.png";
import deleteIcon from "../../assets/imgs/icons/deleteIcon.png";
import { editeEvent } from "../../redux/events/eventsAction";
import Spinning from "../../components/Spinning";
import {
   removeFile,
   uploadeFile,
} from "../../redux/attachments/attachmentsActions";

const EditePost = () => {
   // ======================= Global Data =======================
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   const workspaceInfo = JSON.parse(localStorage.getItem("workspaceInfo"));
   document.title = "Absolventweb | Edite Post";

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   const events = useSelector((state) => state.events);
   const workspaceEvents = useSelector((state) => state.events.workspaceEvents);
   const file = useSelector((state) => state.attachments);

   // ======================= Router Hook =======================
   const navigate = useNavigate();
   const { state } = useLocation();

   // ======================= Select Input Elements =======================
   const titleInput = useRef(null);
   const contentInput = useRef(null);
   const deadlineInput = useRef(null);
   const attachmentInput = useRef(null);

   // ======================= React Hook =======================
   // Store File Name To Show In The Screen
   const [fileName, setFileName] = useState(null);
   // For Error File Type
   const [fileType, setFileType] = useState(false);
   // Store File ID
   const [fileId, setFileID] = useState(null);
   // Checking If File Uploaded
   const [fileUploaded, setFileUploaded] = useState(false);
   // To Prevent Show Alert When The Previous Process Is Pending
   const [btnClicked, setBtnClicked] = useState(false);
   // To Prevent useEffect Run Initial-Render
   const firstUpdate = useRef(true);

   // ############## Getting And Setting Event Infomation ##############
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
         // Checking If There Is A file
         if (postEvent.attachment) {
            setFileName(postEvent.attachment.file_name);
            setFileID(postEvent.attachment.id);
         }
      } else {
         navigate("/workspace");
      }
   }, []);

   // ############## Alert Logic ##############
   useEffect(() => {
      titleInput.current.focus();
      if (firstUpdate.current) {
         firstUpdate.current = false;
         return;
      }
      let file = attachmentInput.current.files[0];
      if (file) {
         // Show Alert After File Uploaded
         if (!file.loading && file.error && fileUploaded) {
            processChecking(file.error, "error", "red-bg");
         } else if (!file.loading && file.success && fileUploaded) {
            processChecking("Edite Successfully", "success", "done").then(() =>
               navigate("/workspace")
            );
         }
         // Case Show Alert If No File Exist
      } else {
         if (!events.loading && events.error && btnClicked) {
            processChecking(events.error, "error", "red-bg");
         } else if (!events.loading && events.success && btnClicked) {
            processChecking("Edite Successfully", "success", "done").then(() =>
               navigate("/workspace")
            );
         }
      }
   }, [events.error, events.success, file.error, file.success]);

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
   // ======================= Handler =======================
   const handleProcess = () => {
      const userInput = {
         workspace_id: workspaceInfo.workspace_id,
         title: titleInput.current.value,
         descriere: contentInput.current.value,
         type: "post",
         due_date: deadlineInput.current.value,
      };
      if (fieldsValidation(userInput)) {
         // If There Is An Attachment Dispatch Upload Attachment Action
         let file = attachmentInput.current.files[0];
         if (file) {
            dispatch(
               editeEvent({ eventID: state.eventId, eventContent: userInput })
            ).then(({ payload }) => {
               // Save Event ID Get It From Event Response
               const event_ID = payload.data.id;
               const fileData = new FormData();
               fileData.append("event_id", event_ID);
               fileData.append("file", file);
               dispatch(uploadeFile(fileData));
               setFileUploaded(true);
            });
         }
         // If There Is No An Attachment Dispatch Only Add Event Action
         else {
            dispatch(
               editeEvent({ eventID: state.eventId, eventContent: userInput })
            );
         }
      }
   };
   // Checking File Type
   const handleFile = (theFileName) => {
      // Checking If File removed
      if (!theFileName) {
         setFileName(null);
         return;
      }
      const fileTypes = ["csv", "txt", "xlx", "xls", "pdf", "zip"];
      if (fileTypes.includes(theFileName.slice(-3))) {
         setFileName(theFileName);
         setFileType(false);
      } else setFileType(true);
   };

   if (user) {
      return (
         <>
            <Header userType={userType} />
            <main className="main event-page">
               <div className="container">
                  <div className="content">
                     <h2 className="title">Modificare Post</h2>
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
                           <h3 className="item_title">Conţinut:</h3>
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
                           <h3 className="item_title">Atașament:</h3>
                           <label htmlFor="file" className="file-input">
                              <img
                                 src={addIcon}
                                 alt="btn-icon"
                                 className="btn-icon"
                              />
                              Adaugare
                              <input
                                 id="file"
                                 type="file"
                                 className="input-field"
                                 ref={attachmentInput}
                                 onChange={() =>
                                    handleFile(
                                       attachmentInput.current?.files[0]?.name
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
                                       // To Make This Btn Remove File From Database If Exist Only.
                                       if (fileId) {
                                          dispatch(removeFile(fileId));
                                          setFileID(null);
                                       }
                                    }}
                                 />
                              </div>
                           ) : null}
                        </li>
                        {fileType ? (
                           <li
                              className="item"
                              style={{ color: "red", justifyContent: "center" }}
                           >
                              <p style={{ textAlign: "center" }}>
                              Fișierul trebuie să fie un fișier de tip: csv, txt, xlx,
                                 xls, pdf, zip.
                              </p>
                           </li>
                        ) : null}
                        <div className="save-btn-space">
                           {(events.loading && btnClicked) || file.loading ? (
                              <Spinning size="small" />
                           ) : (
                              <button
                                 className="btn save-btn"
                                 onClick={() => {
                                    handleProcess();
                                    setBtnClicked(true);
                                 }}
                              >
                                 Salvare
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
