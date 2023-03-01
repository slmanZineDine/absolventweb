import unvLogo from "../assets/imgs/university-logo.png";
import Form from "../components/Form";
import { Logo } from "../components/Logo";

const Auth = ({ authProcess }) => {
   return (
      <div className="auth">
         <div className="container">
            <div className="content">
               <div className="form">
                  <Logo />
                  <Form authProcess={authProcess} />
               </div>
               <div className="university-logo">
                  <img src={unvLogo} alt="university-logo" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Auth;
