import Header from "../components/Header";
import unvLogo from "../assets/imgs/university-logo.png";
import { Link } from "react-router-dom";
const Greeting = () => {
   return (
      <>
         <Header />
         <main className="main greeting-page">
            <div className="container">
               <div className="content">
                  <p className="greeting-msg">welcome to our website</p>
                  <p className="website-info">
                     Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                     Fugiat, consequatur, voluptatum, ex reprehenderit minima
                     doloremque numquam voluptate explicabo nostrum excepturi
                     error optio nobis? Eligendi excepturi consequatur vero,
                     vitae corrupti veniam!
                  </p>
                  <div className="auth-btn">
                     <div className="register auth-box">
                        <p className="text">
                           register if you dont have account
                        </p>
                        <Link to="/register" className="btn register-btn">
                           Register
                        </Link>
                     </div>
                     <div className="login auth-box">
                        <p className="text">
                           login if yor already have account
                        </p>
                        <Link to="/login" className="btn login-btn">
                           Login
                        </Link>
                     </div>
                  </div>
               </div>
               <div className="university-logo">
                  <img src={unvLogo} alt="university-logo" />
               </div>
            </div>
         </main>
      </>
   );
};

export default Greeting;
