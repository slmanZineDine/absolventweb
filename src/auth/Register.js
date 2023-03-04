import unvLogo from "../assets/imgs/university-logo.png";
import mailIcon from "../assets/imgs/icons/mailIcon.png";
import lockIcon from "../assets/imgs/icons/lockIcon.png";
import phoneIcon from "../assets/imgs/icons/phoneIcon.png";
import addressIcon from "../assets/imgs/icons/addressIcon.png";
import { Logo } from "../components/Logo";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinning from "../components/Spinning";
import { registerUser } from "../redux/auth/authActions";
import swal from "sweetalert";

const Register = () => {
   // To select user type
   const userTypeSelect = useRef(null);
   const userTypes = ["student", "coordonator", "admin"];
   const [selectedType, setSelectedType] = useState(null);
   // const getSelectedType = (type) => setSelectedType(type);

   // Select input elements
   const nameInput = useRef(null);
   const emailInput = useRef(null);
   const passwordInput = useRef(null);
   const passwordConFirmInput = useRef(null);
   const phoneInput = useRef(null);
   const addressInput = useRef(null);
   const facultyInput = useRef(null);
   const specializareInput = useRef(null);

   // Redux Hook
   const dispatch = useDispatch();
   const userInfo = useSelector((state) => state.auth);

   // Router Hook
   const navigate = useNavigate();
   // Sweet alert labrary
   const processChecking = async (msg, icon, theClassName) => {
      await swal(msg, {
         buttons: false,
         timer: 3000,
         icon: icon,
         className: theClassName,
         closeOnEsc: false,
      });
   };

   // Vaidation
   const fieldsValidation = (userInput) => {
      const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!Object.values(userInput).every((e) => e !== "")) {
         processChecking("Please fill all fields.", "warning", "red-bg");
      } else if (!emailValidation.test(userInput.email)) {
         processChecking(
            "You have entered an invalid email address.",
            "warning",
            "red-bg"
         );
      } else if (userInput.password.length < 6) {
         processChecking("Your password is too short.", "warning", "red-bg");
      } else if (userInput.password !== userInput["password_confirmation"]) {
         processChecking("passwords are not identical.", "warning", "red-bg");
      } else {
         return true;
      }
   };
   const handleRegister = (e) => {
      e.preventDefault();
      const userRegisterInfo = {
         type: selectedType,
         name: nameInput.current.value,
         email: emailInput.current.value,
         password: passwordInput.current.value,
         password_confirmation: passwordConFirmInput.current.value,
         phone: phoneInput.current.value,
         address: addressInput.current.value,
         facultatea: facultyInput.current.value,
         specializare: specializareInput.current.value,
         // ================ Dev mode ==================
         // name: "name1",
         // email: "num00812212@gmail.com",
         // password: "123456",
         // password_confirmation: "123456",
         // phone: "123456",
         // type: "coordonator",
         // address: "address1",
         // facultatea: "facultatea1",
         // specializare: "specializare1",
         // is_admin: 1,
      };
      if (selectedType !== "student") {
         userRegisterInfo["is_admin"] = 1;
      }
      if (fieldsValidation(userRegisterInfo)) {
         dispatch(registerUser(userRegisterInfo));
      }
   };
   useEffect(() => {
      if (userInfo.error) {
         processChecking(userInfo.error, "error", "red-bg");
      } else if (userInfo.success) {
         processChecking("Register Success", "success", "done");
         navigate("/homepage", { replace: true });
      }
   }, [userInfo.error, userInfo.success]);
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
                              userTypeSelect.current.classList.toggle(
                                 "show-options"
                              )
                           }
                        >
                           {selectedType !== null
                              ? userTypes[selectedType]
                              : "Select type"}
                           <span className="arrow"></span>
                           <ul className="select" ref={userTypeSelect}>
                              {userTypes.map((e, i) => {
                                 return (
                                    <li
                                       key={i}
                                       className="option"
                                       onClick={(_) => setSelectedType(i)}
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
                           ref={nameInput}
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
                           ref={emailInput}
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
                           ref={passwordInput}
                        />
                     </div>
                     <div className="form-group">
                        <label htmlFor="password-confirm">
                           Password Confirm
                        </label>
                        <div className="img-input">
                           <img src={lockIcon} alt="lock-icon" />
                        </div>
                        <input
                           type="password"
                           className="form-input"
                           required
                           id="password-confirm"
                           placeholder="Write here"
                           ref={passwordConFirmInput}
                        />
                     </div>
                     <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <div className="img-input">
                           <img src={phoneIcon} alt="phone-icon" />
                        </div>
                        <input
                           type="number"
                           className="form-input"
                           required
                           id="phone"
                           placeholder="Write here"
                           ref={phoneInput}
                        />
                     </div>
                     <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <div className="img-input">
                           <img src={addressIcon} alt="address-icon" />
                        </div>
                        <input
                           type="text"
                           className="form-input"
                           required
                           id="address"
                           placeholder="Write here"
                           ref={addressInput}
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
                           ref={specializareInput}
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
                           ref={facultyInput}
                        />
                     </div>

                     {userInfo.loading ? (
                        <Spinning />
                     ) : (
                        <button
                           type="submit"
                           className="btn login-page-btn"
                           onClick={handleRegister}
                        >
                           Rigister
                        </button>
                     )}
                     <p className="note">
                        Already have an account?{" "}
                        <Link to="/login" className="link">
                           Login
                        </Link>
                     </p>
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

export default Register;
