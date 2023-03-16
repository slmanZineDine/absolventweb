import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import UniversityLogo from "../../components/UniversityLogo";
import { addNewTopic } from "../../redux/topics/topicsActions";
import { useEffect, useRef } from "react";
import swal from "sweetalert";
import Spinning from "../../components/Spinning";

const AddNewTopic = () => {
   // ======================= Global Data =======================
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   const topics = useSelector((state) => state.topics);

   // ======================= Router Hook =======================
   const navigate = useNavigate();

   // ======================= Select Input Elements =======================
   const titleInput = useRef(null);
   const detailsInput = useRef(null);
   const specInput = useRef(null);

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
      if (!Object.values(userInput).every((e) => e !== "")) {
         processChecking("Please Fill All Fields.", "warning", "red-bg");
      } else {
         return true;
      }
   };

   // ======================= Handle Request =======================
   const handleProcess = () => {
      const userInput = {
         title: titleInput.current.value,
         detalii: detailsInput.current.value,
         specializare: specInput.current.value,
      };
      if (fieldsValidation(userInput)) {
         dispatch(addNewTopic(userInput));
      }
   };

   // ======================= React Hook =======================
   // Variable below to manipulate useEffect and prevente run initial-render
   const firstUpdate = useRef(true);
   useEffect(() => {
      titleInput.current.focus();
      if (firstUpdate.current) {
         firstUpdate.current = false;
         return;
      }
      if (!topics.loading && topics.error) {
         processChecking(topics.error, "error", "red-bg");
      } else if (!topics.loading && topics.success) {
         processChecking("Add Successfully", "success", "done");
         navigate("/profile");
      }
   }, [topics.error, topics.success]);

   if (user && userType === "coordonator") {
      return (
         <>
            <Header userType={userType} />
            <main className="main topic-page">
               <div className="container">
                  <div className="content">
                     <h2 className="title">Adăugarea unui subiect nou</h2>
                     <ul className="box">
                        <li className="item">
                           <h3 className="item_title">Tema Title:</h3>
                           <input
                              type="text"
                              placeholder="Scrie aici"
                              className="input-field"
                              ref={titleInput}
                           />
                        </li>
                        <li className="item">
                           <h3 className="item_title">Detalii Tema:</h3>
                           <textarea
                              placeholder="Scrie aici"
                              className="textarea"
                              ref={detailsInput}
                           ></textarea>
                        </li>
                        <li className="item">
                           <h3 className="item_title">Specializare:</h3>
                           <input
                              type="text"
                              placeholder="Scrie aici"
                              className="input-field"
                              ref={specInput}
                           />
                        </li>
                        <div className="save-btn-space">
                           {topics.loading ? (
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
      <Navigate to="/profile" />;
   }
};

export default AddNewTopic;
