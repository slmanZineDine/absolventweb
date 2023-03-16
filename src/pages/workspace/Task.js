import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import UniversityLogo from "../../components/UniversityLogo";
import { getEventById } from "../../redux/events/eventsAction";

const Task = () => {
   // ======================= Global Data =======================
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   // Compare User ID With Author ID To Prevent Not Author' Task, Edite Or Delete
   const userId = JSON.parse(user)?.id;

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   const event = useSelector((state) => state.events.eventById);
   console.log(event);

   // ======================= Router Hook =======================
   const navigate = useNavigate();
   const { state } = useLocation();

   // ======================= React Hook =======================
   useEffect(() => {
      if (state?.eventId) {
         dispatch(getEventById(state.eventId));
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
                        <h3 className="task-title">{event?.title}</h3>
                        <p className="task-content">{event?.descriere}</p>
                        <div className="task-deadlin">
                           <h4>Deadline:</h4>
                           <p className="text">{event?.due_date}</p>
                        </div>
                        <div className="edite-btn-space">
                           {event.author_id === userId ? (
                              <Link
                                 to="/workspace/edite-task"
                                 state={{
                                    eventId: state?.eventId,
                                 }}
                                 className="btn save-btn"
                              >
                                 Edite
                              </Link>
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
