import mailIcon from "../assets/imgs/icons/mailIcon.png";
import lockIcon from "../assets/imgs/icons/lockIcon.png";
import { Logo } from "../components/Logo";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/auth/authActions";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Spinning from "../components/Spinning";
import swal from "sweetalert";
import UniversityLogo from "../components/UniversityLogo";

const Login = () => {
   // Select input elements
   const emailInput = useRef(null);
   const passwordInput = useRef(null);

   // Get ueser info
   const user = localStorage.getItem("user");

   // Redux Hook
   const dispatch = useDispatch();
   const userInfo = useSelector((state) => state.auth);

   // Router Hook
   const navigate = useNavigate();

   // Alert Box From Sweet Alert labrary
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
         processChecking("Please Fill All Fields.", "warning", "red-bg");
      } else if (!emailValidation.test(userInput.email)) {
         processChecking(
            "You Have Entered An Invalid Email Address.",
            "warning",
            "red-bg"
         );
      } else if (userInput.password.length < 6) {
         processChecking("Your Password Is Too Short.", "warning", "red-bg");
      } else {
         return true;
      }
   };

   const handleLogin = (e) => {
      e.preventDefault();
      const userLoginInfo = {
         email: emailInput.current.value,
         password: passwordInput.current.value,
         // ================ Dev mode ==================
         // email: "drslman@gmail.com",
         // password: "123456",
         // email: "drsammar@gmail.com",
         // password: "123456",
         // email: "ali@gmail.com",
         // password: "123456",
         // email: "ziad@gmail.com",
         // password: "123456",
         // email: "rami@gmail.com",
         // password: "123456",
      };

      if (fieldsValidation(userLoginInfo)) {
         dispatch(userLogin(userLoginInfo));
      }
   };

   useEffect(() => {
      if (!user) {
         emailInput.current.focus();
      }
      if (!userInfo.loading && userInfo.error) {
         processChecking(userInfo.error, "error", "red-bg");
      } else if (!userInfo.loading && userInfo.success) {
         processChecking("Logging in Success", "success", "done");
         navigate("/homepage", { replace: true });
      }
   }, [userInfo.error, userInfo.success]);
   if (user) {
      return <Navigate to="/homepage" />;
   } else {
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
                           <Spinning size="full" />
                        ) : (
                           <button
                              type="submit"
                              className="btn auth-page-btn"
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
                     </form>
                  </div>
                  <UniversityLogo />
               </div>
            </div>
         </div>
      );
   }
};

export default Login;
