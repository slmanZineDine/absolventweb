import { Link } from "react-router-dom";

export const Logo = () => {
   return (
      <Link to="/" className="logo">
         <span className="logo-text">AbsolentWeb</span>
      </Link>
   );
};
