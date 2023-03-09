import { Navigate } from "react-router-dom";
import studentsIcon from "../assets/imgs/icons/studentsIcon.png";
import Header from "../components/Header";
import UniversityLogo from "../components/UniversityLogo";

const Students = () => {
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   if (user) {
      if (userType === "coordonator") {
         // Names Of Table Columns
         const tableCol = ["Nr", "Student", "Titlul lucrării", "Specializare"];
         // Content Of Table Rows
         const tableContent = [
            {
               Student: "student",
               "Titlul lucrării": "Titlul lucrăre studentului de licenta",
               Specializare: "IR/IA/IE",
            },
            {
               Student: "student",
               "Titlul lucrării": "Titlul lucrăre studentului de licenta",
               Specializare: "IR/IA/IE",
            },
            {
               Student: "student",
               "Titlul lucrării": "Titlul lucrăre studentului de licenta",
               Specializare: "IR/IA/IE",
            },
         ];
         return (
            <>
               <Header userType={userType} />
               <main className="main students-page-coordonator">
                  <div className="container">
                     <div className="content">
                        <div className="title">
                           <img
                              src={studentsIcon}
                              alt="students-icon"
                              className="icon"
                           />
                           <p className="text">Studenți</p>
                        </div>
                        <div className="cover">
                           <table className="table">
                              <thead className="thead">
                                 <tr className="main-row">
                                    {tableCol.map((colName, i) => (
                                       <th key={i} className="main-cell">
                                          {colName}
                                       </th>
                                    ))}
                                 </tr>
                              </thead>
                              <tbody className="tbody">
                                 {tableContent.length > 0
                                    ? tableContent.map((cell, i) => {
                                         return (
                                            <tr key={i} className="row">
                                               <td className="cell">
                                                  {i + 1}.
                                               </td>
                                               <td className="cell">
                                                  {cell.Student}
                                               </td>
                                               <td className="cell">
                                                  {cell["Titlul lucrării"]}
                                               </td>
                                               <td className="cell">
                                                  {cell.Specializare}
                                               </td>
                                            </tr>
                                         );
                                      })
                                    : null}
                              </tbody>
                           </table>
                        </div>
                     </div>
                     <UniversityLogo />
                  </div>
               </main>
            </>
         );
      } else if (userType === "admin") {
         return (
            <>
               <Header userType={userType} />
               <main className="main students-page-admin">
                  <div className="container">Hello Admin</div>
               </main>
            </>
         );
      } else {
         return <Navigate to="/homepage" />;
      }
   } else {
      return <Navigate to="/" />;
   }
};

export default Students;
