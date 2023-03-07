import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Table from "../components/Table";
import stepsIcon from "../assets/imgs/icons/stepsIcon.png";
import statusIcon from "../assets/imgs/icons/statusIcon.png";
import UniversityLogo from "../components/UniversityLogo";

const HomePage = () => {
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   if (user) {
      if (userType === "student") {
         return (
            <>
               <Header userType={userType} />
               <main className="main homepage-student">
                  <div className="container">
                     <div className="content">
                        <h2 className="title">Etapele lucrării</h2>
                        <ul className="steps">
                           <li className="step">
                              <img
                                 src={stepsIcon}
                                 alt="steps-icon"
                                 className="icon"
                              />
                              <p>
                                 Alegere o temă din {""}
                                 <Link to="/list-of-topics" className="link">
                                    lista propunerilor
                                 </Link>{" "}
                                 {""}
                                 de lucrări de licență.
                              </p>
                           </li>
                           <li className="step">
                              <img
                                 src={statusIcon}
                                 alt="status-icon"
                                 className="icon"
                              />
                              Starea de acceptare coordonatorului pentru tema de
                              licenta.
                           </li>
                        </ul>
                     </div>
                     <UniversityLogo />
                  </div>
               </main>
            </>
         );
      } else if (userType === "coordonator") {
         // Select Main Column in a tables
         const tableCol1 = [
            "Nr",
            "Student",
            "Titlul lucrării",
            "Specializare",
            "Statutul de student",
         ];
         const tableCol2 = ["Nr", "Student", "Title", "Deadline"];
         // Extract data compatible with table columns num 01
         // const tableData = (data) => {
         //    // copy value to prevent read only property error;
         //    const sortedArray = [...data];
         //    if (data?.length > 0) {
         //       // sorting topic
         //       sortedArray.sort((a, b) => {
         //          const firEleDate = new Date(a["updated_at"]);
         //          const secEleDate = new Date(b["updated_at"]);
         //          return +secEleDate - +firEleDate;
         //       });
         //       return sortedArray.map((e, i) => {
         //          return [
         //             `${i + 1}.`,
         //             e["title"],
         //             e["detalii"],
         //             e["specializare"],
         //             <div className="topic-btns">
         //                <button
         //                   className="btn edite-btn"
         //                   onClick={() => {
         //                      navigate("edite-topic", {
         //                         state: { id: e.id },
         //                      });
         //                   }}
         //                >
         //                   Edite
         //                   <img
         //                      src={editeIcon}
         //                      alt="btn-icon"
         //                      className="btn-icon"
         //                   />
         //                </button>
         //                <button
         //                   className="btn delete-btn"
         //                   onClick={() => {
         //                      // dispatch(deleteTopic(e.id));
         //                      confirmDeletion(e.id);
         //                   }}
         //                >
         //                   Delete
         //                   <img
         //                      src={deleteIcon}
         //                      alt="btn-icon"
         //                      className="btn-icon"
         //                   />
         //                </button>
         //             </div>,
         //          ];
         //       });
         //    }
         // };
         return (
            <>
               <Header userType={userType} />
               <main className="main homepage-coordonator">
                  <div className="container">
                     <div className="content">
                        <div className="title">
                           <img
                              src={statusIcon}
                              alt="status-icon"
                              className="icon"
                           />
                           <p className="text">Studenților în așteptare</p>
                        </div>
                        <Table cols={tableCol1} />
                     </div>
                     <div className="content">
                        <div className="title">
                           <img
                              src={stepsIcon}
                              alt="steps-icon"
                              className="icon"
                           />
                           <p className="text">Sarcinile tale</p>
                        </div>
                        <Table cols={tableCol2} />
                     </div>
                  </div>
               </main>
            </>
         );
      } else if (userType === "adimn") {
         return (
            <>
               <Header userType={userType} />
               <main className="main">
                  <div className="container">
                     <h1>coordonator view</h1>
                  </div>
               </main>
            </>
         );
      } else {
         return <h1>Please Login or register </h1>;
      }
   } else {
      return <Navigate to="/" />;
   }
};

export default HomePage;
