import { useRef, useState } from "react";
import { Logo } from "../components/Logo";
import unvLogo from "../assets/imgs/university-logo.png";
import mailIcon from "../assets/imgs/icons/mailIcon.png";
import lockIcon from "../assets/imgs/icons/lockIcon.png";

const Login = () => {
   const levelSelect = useRef(null);
   const userTypes = ["student", "doctor", "admin"];
   const [SelectedLevel, setSelectedLevel] = useState(null);
   return (
      <div className="auth">
         <div className="container">
            <div className="content">
               <div className="form">
                  <Logo />
                  <form className="form-element">
                     <div className="form-group">
                        <label>User type</label>
                        <div
                           className="custom-select"
                           onClick={(_) =>
                              levelSelect.current.classList.toggle(
                                 "show-options"
                              )
                           }
                        >
                           {SelectedLevel !== null
                              ? userTypes[SelectedLevel]
                              : "Select type"}
                           <span className="arrow"></span>
                           <ul className="select" ref={levelSelect}>
                              {userTypes.map((e, i) => {
                                 return (
                                    <li
                                       key={i}
                                       className="option"
                                       onClick={(_) => setSelectedLevel(i)}
                                    >
                                       {e}
                                    </li>
                                 );
                              })}
                           </ul>
                        </div>
                     </div>
                     <div className="form-group">
                        <label htmlFor="username">User name</label>
                        <input
                           type="text"
                           className="form-input"
                           required
                           id="username"
                           placeholder="Write here"
                        />
                     </div>
                     <div className="form-group">
                        <label htmlFor="email">User email</label>
                        <div className="img-input">
                           <img src={mailIcon} alt="mail-icon" />
                        </div>
                        <input
                           type="email"
                           className="form-input"
                           required
                           id="email"
                           placeholder="Write here"
                        />
                     </div>
                     <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="img-input">
                           <img src={lockIcon} alt="lock-icon" />
                        </div>
                        <input
                           type="password"
                           className="form-input"
                           required
                           id="password"
                           placeholder="Write here"
                        />
                     </div>
                     <div className="form-group">
                        <input
                           type="checkbox"
                           className="form-input"
                           id="remember-me"
                        />
                        <label htmlFor="remember-me">
                           Remember my username
                        </label>
                     </div>
                     <button type="submit" className="btn login-page-btn">
                        Login
                     </button>
                  </form>
               </div>
               <div className="university-logo">
                  <img src={unvLogo} alt="university-logo" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
