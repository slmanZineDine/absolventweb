// External
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
// Internal
import mailIcon from "../assets/imgs/icons/mailIcon.png";
import lockIcon from "../assets/imgs/icons/lockIcon.png";
import { Logo } from "../components/Logo";
import UniversityLogo from "../components/UniversityLogo";
import Spinning from "../components/Spinning";
import { userLogin } from "../redux/auth/authActions";

const Login = () => {
   // ======================= Global Data =======================
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   // Set Page Title
   document.title = "Absolventweb | Login";

   // ======================= Select Input Elements =======================
   const emailInput = useRef(null);
   const passwordInput = useRef(null);

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   const userInfo = useSelector((state) => state.auth);

   // ======================= React Hook =======================
   // To Prevent useEffect Run Initial-Render
   const firstUpdate = useRef(true);

   useEffect(() => {
      if (!user) emailInput.current.focus();
   }, []);
   // ############## Alert Logic ##############
   useEffect(() => {
      if (firstUpdate.current) {
         firstUpdate.current = false;
         return;
      }
      if (!userInfo.loading && userInfo.error) {
         processChecking(userInfo.error, "error", "red-bg");
      } else if (!userInfo.loading && userInfo.success) {
         processChecking("Logging in Success", "success", "done").then(() =>
            navigate("/homepage", { replace: true })
         );
      }
   }, [userInfo.error, userInfo.success]);

   // ======================= Router Hook =======================
   const navigate = useNavigate();

   // ======================= Sweet Alert Labrary =======================
   const processChecking = async (msg, icon, theClassName) => {
      await swal(msg, {
         buttons: false,
         timer: 3000,
         icon: icon,
         className: theClassName,
         closeOnEsc: false,
      });
   };

   // ======================= Vaidation =======================
   const fieldsValidation = (userInput) => {
      const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!Object.values(userInput).every((e) => e !== ""))
         processChecking("Please Fill All Fields.", "warning", "red-bg");
      else if (!emailValidation.test(userInput.email)) {
         processChecking(
            "You Have Entered An Invalid Email Address.",
            "warning",
            "red-bg"
         );
      } else if (userInput.password.length < 6)
         processChecking("Your Password Is Too Short.", "warning", "red-bg");
      else return true;
   };

   // ======================= Handle Request =======================
   const handleLogin = (e) => {
      e.preventDefault();
      const userLoginInfo = {
         email: emailInput.current.value,
         password: passwordInput.current.value,
      };

      if (fieldsValidation(userLoginInfo)) {
         dispatch(userLogin(userLoginInfo));
      }
   };

   if (user) {
      return <Navigate to="/homepage" replace={true} />;
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
