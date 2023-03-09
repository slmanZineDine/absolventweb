import { Navigate } from "react-router-dom";
import Header from "../../components/Header";
import avatarIcon from "../../assets/imgs/icons/avatarIcon.png";
import addCommentIcon from "../../assets/imgs/icons/addCommentIcon.png";
import { useRef } from "react";

const Post = () => {
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;

   // Select input elements
   const commentInput = useRef(null);

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
                                 alt="btn-icon"
                                 className="btn-icon"
                              />
                              <h3 className="topic-name">Plan de licenta</h3>
                           </div>
                           <div className="post-info">
                              <h4 className="username">Daniela zaharie</h4>
                              <p className="the-date">Sep 6, 2022</p>
                           </div>
                        </div>
                        <div className="text">
                           <p>
                              Vă rog să utilizați fișierul șablon de Latex și sa
                              adăugați plan de liceanta care o sa contine
                              deadlin urile pentru fiecare etapa de lucru. Vă
                              doresc spor la treabă
                           </p>
                        </div>
                     </div>
                     <div className="comments">
                        <div className="add-comment">
                           <img
                              src={avatarIcon}
                              alt="btn-icon"
                              className="btn-icon"
                           />
                           <textarea
                              placeholder="Scrie aici"
                              className="input-field"
                              ref={commentInput}
                           ></textarea>
                           <button className="send">
                              <img
                                 src={addCommentIcon}
                                 alt="btn-icon"
                                 className="btn-icon"
                              />
                           </button>
                        </div>
                        <div className="comments-list">
                           <h2 className="title">Comments</h2>
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
