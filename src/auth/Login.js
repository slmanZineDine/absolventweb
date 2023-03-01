import { Logo } from "../components/Logo";
import unvLogo from "../assets/imgs/university-logo.png";
import { Form } from "components/Form";

const Login = () => {
   return (
      <div className="auth">
         <div className="container">
            <div className="content">
               <div className="form">
                  <Logo />
                  <Form />
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
