import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import UniversityLogo from "../../components/UniversityLogo";
import addIcon from "../../assets/imgs/icons/addIcon.png";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

const AddMeeting = () => {
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // Redux Hook
   const dispatch = useDispatch();
   const events = useSelector((state) => state.events);

   // Router Hook
   const navigate = useNavigate();

   // Select input elements
   const titleInput = useRef(null);
   const deadlineInput = useRef(null);
   const attachmentInput = useRef(null);

   // Sweet Alert labrary
   const processChecking = async (msg, icon, theClassName) => {
      await swal(msg, {
         buttons: false,
         timer: 3000,
         icon: icon,
         className: theClassName,
         closeOnEsc: false,
      });
   };

   // Vaidation
   const fieldsValidation = (userInput) => {
      if (userInput.title === "" || userInput.due_date === "") {
         processChecking("Please Fill All Fields.", "warning", "red-bg");
      } else {
         return true;
      }
   };

   // handle Request
   const handleProcess = () => {
      const userInput = {
         workspace_id:
            "add workspace id here get from useLocation like profile and edite button",
         title: titleInput.current.value,
         type: "meeting",
         due_date: deadlineInput.current.value,
         // attachment: attachmentInput.current.files[0],
      };
      // if (fieldsValidation(userInput)) {
      //    dispatch(addNewEvent(userInput));
      // }
   };

   // React Hook
   const [fileName, setFileName] = useState(null);

   if (user) {
      return (
         <>
            <Header userType={userType} />
            <main className="main event-page">
               <div className="container">
                  <div className="content">
                     <h2 className="title">Meeting</h2>
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
                           <h3 className="item_title">Deadline:</h3>
                           <input
                              type="text"
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
                           <div className="attachName">
                              {fileName ? fileName : null}
                           </div>
                        </li>
                        <div className="save-btn-space">
                           <button
                              className="btn save-btn"
                              onClick={handleProcess}
                           >
                              Save
                           </button>
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

export default AddMeeting;
