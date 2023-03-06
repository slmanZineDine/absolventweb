import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import UniversityLogo from "../../components/UniversityLogo";
import { useEffect, useRef, useState } from "react";
import { editeTopic, getTopicById } from "../../redux/topics/topicsActions";

export const EditeTopic = () => {
   // Select input elements
   const titleInput = useRef(null);
   const detailsInput = useRef(null);
   const specInput = useRef(null);

   // Get user inof form local storage
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // Redux Hook
   const dispatch = useDispatch();
   const topic = useSelector((state) => state.topics.topic);
   // Router Hook
   const { state } = useLocation();
   const navigate = useNavigate();

   // React Hook
   // const [inputValues, setInputValues] = useState(topic);
   useEffect(() => {
      if (state?.id) {
         dispatch(getTopicById(state.id));
      } else {
         navigate("/profile");
      }
   }, []);
   useEffect(() => {
      titleInput.current.value = topic?.title ?? "";
      detailsInput.current.value = topic?.detalii ?? "";
      specInput.current.value = topic?.specializare ?? "";
   }, [topic]);
   if (user && userType === "coordonator") {
      return (
         <>
            <Header userType={userType} />
            <main className="main topic-page">
               <div className="container">
                  <div className="content">
                     <h2 className="title">Modificare detalii unei teme</h2>
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
                        <button
                           className="btn save-btn"
                           onClick={(_) => {
                              dispatch(
                                 editeTopic({
                                    topicId: state?.id,
                                    topic: {
                                       title: titleInput.current.value,
                                       detalii: detailsInput.current.value,
                                       specializare: specInput.current.value,
                                    },
                                 })
                              );
                              navigate("/profile");
                           }}
                        >
                           Save
                        </button>
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
