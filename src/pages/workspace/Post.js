import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import avatarIcon from "../../assets/imgs/icons/avatarIcon.png";
import addCommentIcon from "../../assets/imgs/icons/addCommentIcon.png";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getEventById } from "../../redux/events/eventsAction";
import {
   addComment,
   deleteComment,
   editeComment,
   getComments,
} from "../../redux/comments/commentsAction";

const Post = () => {
   // ======================= Global Data =======================
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   // Compare User ID With Author ID To Prevent Not Author' Post, Comment Edite Or Delete
   const userId = JSON.parse(user)?.id;

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   const event = useSelector((state) => state.events.eventById);
   const comments = useSelector((state) => state.comments.comments);

   // ======================= Router Hook =======================
   const navigate = useNavigate();
   const { state } = useLocation();

   // ======================= Own Function =======================
   /**
    * Use This Function To Format Date Like Facebook
    * @param {Date} theDate
    * @returns Formated date
    */
   const customDate = (theDate) => {
      if (!theDate) return "";
      const eventDate = new Date(theDate);
      const thisMoment = new Date();
      let min = (+thisMoment - eventDate) / 60000;
      let hour = min / 60;
      let day = hour / 24;
      let week = day / 7;

      if (min < 59) {
         if (Math.trunc(min) === 0) return `1 min ago.`;
         return `${Math.trunc(min)} min ago.`;
      } else if (min > 59 && hour < 24) {
         return `${Math.trunc(hour)} hours ago.`;
      } else if (hour > 23 && day < 7) {
         return `${Math.trunc(day)} days ago.`;
      } else if (day > 6) {
         return `${Math.trunc(week)} weeks ago.`;
      }
   };

   // ======================= Select Input Elements =======================
   const commentInput = useRef(null);
   const commentField = useRef(null);

   // ======================= React Hook =======================
   const [showOption, setShowOption] = useState(false);
   const [commentId, setCommentId] = useState(null);
   const [editeMode, setEidteMode] = useState(false);
   // For Show Post Dropdown Option, Edite Post, Delete Post
   const [showPostOption, setPostOption] = useState(false);

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
                           <header className="post-header">
                              <div className="title">
                                 <img
                                    src={avatarIcon}
                                    alt="avatar-icon"
                                    className="btn-icon"
                                 />
                                 <h3 className="username">
                                    {event.author_name}
                                 </h3>
                              </div>
                              <ul
                                 className={`points ${
                                    userId !== event?.author_id
                                       ? "hide-points"
                                       : ""
                                 }`}
                                 onClick={() => {
                                    if (showPostOption) {
                                       setPostOption(false);
                                    } else {
                                       setPostOption(true);
                                    }
                                 }}
                              >
                                 <li className="point"></li>
                                 <li className="point"></li>
                                 <li className="point"></li>
                                 <li className="nested-list">
                                    <ul
                                       className={`options ${
                                          showPostOption ? "show" : ""
                                       }`}
                                    >
                                       <li
                                          className="option"
                                          onClick={() => {
                                             dispatch(deleteEvent(event.id));
                                             setPostOption(false);
                                             navigate("/workspace");
                                          }}
                                       >
                                          Delete
                                       </li>
                                       <li
                                          className="option"
                                          onClick={() => {
                                             navigate("/workspace/edite-post", {
                                                state: {
                                                   eventId: event.id,
                                                },
                                             });
                                          }}
                                       >
                                          Edite
                                       </li>
                                    </ul>
                                 </li>
                              </ul>
                           </header>
                           <div className="post-info">
                              <h4 className="topic-name">{event?.title}</h4>
                              <p className="the-date">
                                 {customDate(event?.updated_at)}
                              </p>
                           </div>
                        </div>
                        <div className="text">
                           <p>{event?.descriere}</p>
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
                                             content:
                                                commentInput.current.value,
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
                        </div>
                     </div>
                     <div className="comments-list">
                        <h3 className="title">({comments.length}) Comments</h3>
                        {comments.length > 0
                           ? comments.map((comment, i) => (
                                <div key={i} className="comment">
                                   <div className="author-name">
                                      <img
                                         src={avatarIcon}
                                         alt="avatar-icon"
                                         className="btn-icon"
                                      />
                                      <h3 className="username">
                                         {comment.author_name}
                                      </h3>
                                      <span className="the-date">
                                         {customDate(comment?.updated_at)}
                                      </span>
                                      <div className="comment-btns">
                                         <ul
                                            className={`points ${
                                               userId !== comment?.author_id
                                                  ? "hide-points"
                                                  : ""
                                            }`}
                                            onClick={() => {
                                               setCommentId(comment.id);
                                               setEidteMode(false);
                                               if (showOption)
                                                  setShowOption(false);
                                               else setShowOption(true);
                                            }}
                                         >
                                            <li className="point"></li>
                                            <li className="point"></li>
                                            <li className="point"></li>
                                         </ul>
                                         <ul
                                            className={`options ${
                                               showOption &&
                                               commentId === comment.id
                                                  ? "show"
                                                  : ""
                                            }`}
                                         >
                                            <li
                                               className="option"
                                               onClick={() => {
                                                  dispatch(
                                                     deleteComment(comment.id)
                                                  );
                                               }}
                                            >
                                               Delete
                                            </li>
                                            <li
                                               className="option"
                                               onClick={() => {
                                                  setEidteMode(true);
                                                  setShowOption(false);
                                               }}
                                            >
                                               Edite
                                            </li>
                                         </ul>
                                      </div>
                                   </div>
                                   {editeMode && commentId === comment.id ? (
                                      <>
                                         <input
                                            className="input-field"
                                            type="text"
                                            ref={commentField}
                                            defaultValue={comment.content}
                                         />
                                         <span
                                            className="comment-edition"
                                            onClick={() => {
                                               setEidteMode(false);
                                               dispatch(
                                                  editeComment({
                                                     commentId: comment.id,
                                                     commentContent: {
                                                        content:
                                                           commentField.current
                                                              .value,
                                                     },
                                                  })
                                               );
                                            }}
                                         >
                                            Ok
                                         </span>
                                         .
                                         <span
                                            className="comment-edition"
                                            onClick={() => {
                                               setEidteMode(false);
                                            }}
                                         >
                                            Cancel
                                         </span>
                                      </>
                                   ) : (
                                      <p className="text">{comment.content}</p>
                                   )}
                                </div>
                             ))
                           : null}
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
