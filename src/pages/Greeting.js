import Header from "../components/Header";
import unvLogo from "../assets/imgs/university-logo.png";
import loginIcon from "../assets/imgs/icons/loginIcon.png";
import registerIcon from "../assets/imgs/icons/registerIcon.png";
import { Link, Navigate } from "react-router-dom";

const Greeting = () => {
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   if (user) {
      return <Navigate to="/homepage" />;
   } else {
      return (
         <>
            <Header hideLinks={true} />
            <main className="main greeting-page">
               <div className="container">
                  <div className="content">
                     <p className="greeting-msg">Welcome To Our Website</p>
                     <p className="website-info">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Fugiat, consequatur, voluptatum, ex reprehenderit
                        minima doloremque numquam voluptate explicabo nostrum
                        excepturi error optio nobis? Eligendi excepturi
                        consequatur vero, vitae corrupti veniam!
                     </p>
                     <div className="auth-btn">
                        <Link to="/login" className="btn login-btn">
                           Login
                           <img
                              src={registerIcon}
                              alt="logout-icon"
                              className="log-icon"
                           />
                        </Link>
                        <p>OR</p>
                        <Link to="/register" className="btn register-btn">
                           Register
                           <img
                              src={loginIcon}
                              alt="logout-icon"
                              className="log-icon"
                           />
                        </Link>
                     </div>
                  </div>
                  <div className="university-logo">
                     <img src={unvLogo} alt="university-logo" />
                  </div>
               </div>
            </main>
         </>
      );
   }
};

export default Greeting;
