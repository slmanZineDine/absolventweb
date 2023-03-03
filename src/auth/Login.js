import unvLogo from "../assets/imgs/university-logo.png";
import mailIcon from "../assets/imgs/icons/mailIcon.png";
import lockIcon from "../assets/imgs/icons/lockIcon.png";
import { Logo } from "../components/Logo";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/auth/authActions";
import { Link, useNavigate } from "react-router-dom";
import Spinning from "../components/Spinning";
import Checking from "../components/Checking";
const Login = () => {
   // Select input elements
   const emailInput = useRef(null);
   const passwordInput = useRef(null);

   // Redux Hook
   const dispatch = useDispatch();
   const userInfo = useSelector((state) => state.auth);

   // Router Hook
   const navigate = useNavigate();

   // Specify Checking message
   const [CheckingMsg, setCheckingMsg] = useState("");
   // Add show class to Checking component
   const [addShowClass, setAddShowClass] = useState("");
   // To romove show class and rerender the component
   const removeShowClass = () => setAddShowClass("");

   // Vaidation
   const fieldsValidation = (userInput) => {
      const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!Object.values(userInput).every((e) => e !== "")) {
         setCheckingMsg("Please fill all fields.");
         setAddShowClass("show");
      } else if (!emailValidation.test(userInput.email)) {
         setCheckingMsg("You have entered an invalid email address.");
         setAddShowClass("show");
      } else if (userInput.password.length < 6) {
         setCheckingMsg("Your password is too short.");
         setAddShowClass("show");
      } else {
         return true;
      }
   };

   const handleLogin = (e) => {
      e.preventDefault();
      const userLoginInfo = {
         // email: emailInput.current.value,
         // password: passwordInput.current.value,
         // ================ Dev mode ==================
         email: "testee1@gmail.com",
         password: "123456",
      };

      if (fieldsValidation(userLoginInfo)) {
         dispatch(userLogin(userLoginInfo));
      }
   };

   useEffect(() => {
      if (userInfo.error) {
         setCheckingMsg(userInfo.error);
         setAddShowClass("show");
      } else if (userInfo.success) {
         setCheckingMsg("Logging in Success");
         setAddShowClass("show-done");
         setTimeout(() => {
            navigate("/homepage", { replace: true });
         }, 1500);
      }
   }, [userInfo.error, userInfo.success]);
   return (
      <div className="auth login-page">
         <div className="container">
            <div className="content">
               <div className="form">
                  <Logo />
                  <form className="form-element">
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
                     {/* <div className="form-group">
               <input type="checkbox" className="form-input" id="remember-me" />
               <label htmlFor="remember-me">Remember my username</label>
            </div> */}
                     {userInfo.loading ? (
                        <Spinning />
                     ) : (
                        <button
                           type="submit"
                           className="btn login-page-btn"
                           onClick={handleLogin}
                        >
                           Login
                        </button>
                     )}
                     <p className="note">
                        Don't have an account?{" "}
                        <Link to="/register" className="link">
                           Register
                        </Link>
                     </p>
                     <Checking
                        message={CheckingMsg}
                        showClass={addShowClass}
                        removeShowClass={removeShowClass}
                     />
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
