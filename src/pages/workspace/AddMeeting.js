import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../../components/Header";
import UniversityLogo from "../../components/UniversityLogo";
import addIcon from "../../assets/imgs/icons/addIcon.png";

const AddMeeting = () => {
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // Select input elements
   const titleInput = useRef(null);
   const deadlineInput = useRef(null);
   const attachmentInput = useRef(null);

   // handle Request
   const handleProcess = () => {
      const userInput = {
         title: titleInput.current.value,
         deadline: deadlineInput.current.value,
         attachment: attachmentInput.current.files[0],
      };
      console.log(userInput);
      // Here Add Validation
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
