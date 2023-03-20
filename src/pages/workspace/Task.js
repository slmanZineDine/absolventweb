// External
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
// Internal
import Header from "../../components/Header";
import UniversityLogo from "../../components/UniversityLogo";

const Task = () => {
   // ======================= Global Data =======================
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   // Compare User ID With Author ID To Prevent Not Author' Task, Edite Or Delete
   const userId = JSON.parse(user)?.id;
   document.title = "Absolventweb | Task";

   // ======================= Redux Hook =======================
   const workspaceEvents = useSelector((state) => state.events.workspaceEvents);

   // ======================= Router Hook =======================
   const navigate = useNavigate();
   const { state } = useLocation();

   // ======================= React Hook =======================
   // Store Task
   const [taskById, setTaskById] = useState({});
   useEffect(() => {
      // Prevent User Enter This Page Directly
      if (state?.eventId && workspaceEvents.length > 0) {
         const task = workspaceEvents.find((task) => task.id === state.eventId);
         setTaskById(task);
      } else {
         navigate("/workspace");
      }
   }, []);

   if (user) {
      return (
         <>
            <Header userType={userType} />
            <main className="main task-page">
               <div className="container">
                  <div className="content">
                     <h2 className="title">Task</h2>
                     <div className="box">
                        <h3 className="task-title">{taskById?.title}</h3>
                        <p className="task-content">{taskById?.descriere}</p>
                        <div className="task-deadlin">
                           <h4>Deadline:</h4>
                           <p className="text">{taskById?.due_date}</p>
                        </div>
                        <div className="edite-btn-space">
                           {taskById.author_id === userId ? (
                              <button
                                 className="btn save-btn"
                                 onClick={() => {
                                    navigate("/workspace/edite-task", {
                                       state: {
                                          eventId: state?.eventId,
                                       },
                                    });
                                 }}
                              >
                                 Edite
                              </button>
                           ) : null}
                        </div>
                     </div>
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

export default Task;
