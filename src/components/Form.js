import { useRef, useState } from "react";
import mailIcon from "../assets/imgs/icons/mailIcon.png";
import lockIcon from "../assets/imgs/icons/lockIcon.png";

const Form = ({ authProcess }) => {
   const userTypeSelect = useRef(null);
   const userTypes = ["student", "doctor", "admin"];
   const [SelectedLevel, setSelectedLevel] = useState(null);
   console.log(authProcess);
   if (authProcess === "login") {
      return (
         <form className="form-element">
            <div className="form-group">
               <label>User type</label>
               <div
                  className="custom-select"
                  onClick={(_) =>
                     userTypeSelect.current.classList.toggle("show-options")
                  }
               >
                  {SelectedLevel !== null
                     ? userTypes[SelectedLevel]
                     : "Select type"}
                  <span className="arrow"></span>
                  <ul className="select" ref={userTypeSelect}>
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
               <input type="checkbox" className="form-input" id="remember-me" />
               <label htmlFor="remember-me">Remember my username</label>
            </div>
            <button type="submit" className="btn login-page-btn">
               Login
            </button>
         </form>
      );
   } else if (authProcess === "register") {
      return (
         <form className="form-element">
            <div className="form-group">
               <label>User type</label>
               <div
                  className="custom-select"
                  onClick={(_) =>
                     userTypeSelect.current.classList.toggle("show-options")
                  }
               >
                  {SelectedLevel !== null
                     ? userTypes[SelectedLevel]
                     : "Select type"}
                  <span className="arrow"></span>
                  <ul className="select" ref={userTypeSelect}>
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
               <label htmlFor="password-confirm">Password Confirm</label>
               <div className="img-input">
                  <img src={lockIcon} alt="lock-icon" />
               </div>
               <input
                  type="password"
                  className="form-input"
                  required
                  id="password-confirm"
                  placeholder="Write here"
               />
            </div>
            <div className="form-group">
               <label htmlFor="phone">Phone</label>
               <input
                  type="number"
                  className="form-input"
                  required
                  id="phone"
                  placeholder="Write here"
               />
            </div>
            <div className="form-group">
               <label htmlFor="address">Address</label>
               <input
                  type="text"
                  className="form-input"
                  required
                  id="address"
                  placeholder="Write here"
               />
            </div>
            <div className="form-group">
               <label htmlFor="specializare">Specializare</label>
               <input
                  type="text"
                  className="form-input"
                  required
                  id="specializare"
                  placeholder="Write here"
               />
            </div>
            <div className="form-group">
               <label htmlFor="facultatea">Facultatea</label>
               <input
                  type="text"
                  className="form-input"
                  required
                  id="facultatea"
                  placeholder="Write here"
               />
            </div>
            <div className="form-group">
               <input type="checkbox" className="form-input" id="remember-me" />
               <label htmlFor="remember-me">Remember my username</label>
            </div>
            <button type="submit" className="btn login-page-btn">
               rigister
            </button>
         </form>
      );
   }
};

export default Form;
