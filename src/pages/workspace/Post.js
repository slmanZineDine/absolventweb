import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import avatarIcon from "../../assets/imgs/icons/avatarIcon.png";
import addCommentIcon from "../../assets/imgs/icons/addCommentIcon.png";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventById } from "../../redux/events/eventsAction";
import { addComment, getComments } from "../../redux/comments/commentsAction";

const Post = () => {
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // Redux Hook
   const dispatch = useDispatch();
   const event = useSelector((state) => state.events.eventById);
   const comments = useSelector((state) => state.comments.comments);
   console.log(comments);

   // Router Hook
   const navigate = useNavigate();
   const { state } = useLocation();

   // console.log(state?.eventId);

   // Select input elements
   const commentInput = useRef(null);

   // React Hook
   useEffect(() => {
      if (state?.eventId) {
         dispatch(getEventById(state.eventId));
         dispatch(getComments(state.eventId));
      } else {
         navigate("/workspace");
      }
   }, []);

   if (user) {
      return (
         <>
            <Header userType={userType} />
            <main className="main post-page">
               <div className="container">
                  <div className="content">
                     <h2 className="title">Post</h2>
                     <div className="box">
                        <div className="info">
                           <div className="title">
                              <img
                                 src={avatarIcon}
                                 alt="avatar-icon"
                                 className="btn-icon"
                              />
                              <h3 className="username">{event.author_name}</h3>
                           </div>
                           <div className="post-info">
                              <h4 className="topic-name">{event?.title}</h4>
                              <p className="the-date">2023 - 12 - 8</p>
                           </div>
                        </div>
                        <div className="text">
                           <p>{event?.descriere}</p>
                        </div>
                     </div>
                     <div className="comments">
                        <div className="add-comment">
                           <img
                              src={avatarIcon}
                              alt="avatar-icon"
                              className="btn-icon"
                           />
                           <textarea
                              placeholder="Scrie aici"
                              className="input-field"
                              ref={commentInput}
                           ></textarea>
                           <button
                              className="send"
                              onClick={() => {
                                 if (commentInput.current.value !== "") {
                                    dispatch(
                                       addComment({
                                          event_id: state.eventId,
                                          content: commentInput.current.value,
                                       })
                                    );
                                    commentInput.current.value = "";
                                 }
                              }}
                           >
                              <img
                                 src={addCommentIcon}
                                 alt="btn-icon"
                                 className="btn-icon"
                              />
                           </button>
                        </div>
                        <div className="comments-list">
                           <h3 className="title">(4) Comments</h3>

                           <div className="comment">
                              <h3 className="username">User 01</h3>
                              <p className="text">
                                 Lorem ipsum dolor, sit amet consectetur
                                 adipisicing elit. Adipisci vero reprehenderit
                                 quia.
                              </p>
                              <span className="the-date">
                                 Due Jan 6, 2023, 11:59 PM
                              </span>
                           </div>
                           <div className="comment">
                              <h3 className="username">User 02</h3>
                              <p className="text">
                                 Lorem ipsum dolor, sit amet consectetur
                                 adipisicing elit. Adipisci vero reprehenderit
                                 quia.
                              </p>
                              <span className="the-date">
                                 Due Jan 6, 2023, 11:59 PM
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </main>
         </>
      );
   } else {
      return <Navigate to="/" />;
   }
};

export default Post;
