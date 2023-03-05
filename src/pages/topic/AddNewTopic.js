import { Navigate } from "react-router-dom";
import Header from "../../components/Header";
import UniversityLogo from "../../components/UniversityLogo";

const AddNewTopic = () => {
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
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
                           />
                        </li>
                        <li className="item">
                           <h3 className="item_title">Detalii Tema:</h3>
                           <textarea
                              placeholder="Scrie aici"
                              className="textarea"
                           ></textarea>
                        </li>
                        <li className="item">
                           <h3 className="item_title">Specializare:</h3>
                           <input
                              type="text"
                              placeholder="Scrie aici"
                              className="input-field"
                           />
                        </li>
                        <button className="btn save-btn">Save</button>
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
