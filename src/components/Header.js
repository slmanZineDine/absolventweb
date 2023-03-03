import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import logoutIcon from "../assets/imgs/icons/logoutIcon.png";
import { navLinks } from "../data/navlLinks";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/authSlice";
import Checking from "./Checking";
import { Logo } from "./Logo";

const Header = ({ userType, hideLinks }) => {
   const [toggleMenu, setToggleMenu] = useState(false);
   const headerElement = useRef(null);
   const dispatch = useDispatch();

   // Specify Checking message
   const [CheckingMsg, setCheckingMsg] = useState("");
   // Add show class to Checking component
   const [addShowClass, setAddShowClass] = useState("");
   // To romove show class and rerender the component
   const removeShowClass = () => setAddShowClass("");

   // Router Hook
   const navigate = useNavigate();

   // Add scoll-header class to show shadow on the navbar border bottom
   window.onscroll = () => {
      if (headerElement.current) {
         const ele = headerElement.current;
         window.scrollY > 80
            ? ele.classList.add("scroll-header")
            : ele.classList.remove("scroll-header");
      }
   };
   return (
      <header className="header" ref={headerElement}>
         <nav className="nav container">
            <Logo />
            {hideLinks ? null : (
               <div className="menu">
                  <ul className={`links ${toggleMenu ? "show" : ""}`}>
                     {navLinks[userType].map((e, i) => (
                        <li key={i} className="item">
                           <NavLink to={e.path} end>
                              {e.title}
                           </NavLink>
                        </li>
                     ))}
                     <li>
                        <button
                           className="btn logout-btn"
                           onClick={(_) => {
                              dispatch(logout());
                              setCheckingMsg("Logging out Success");
                              setAddShowClass("show-done");
                              setTimeout(() => {
                                 navigate("/", { replace: true });
                              }, 1500);
                              window.location.reload();
                           }}
                        >
                           Logout
                           <img
                              src={logoutIcon}
                              alt="logout-icon"
                              className="log-icon"
                           />
                        </button>
                     </li>
                  </ul>
                  <div
                     className={`toggle-mobile ${toggleMenu ? "close" : ""}`}
                     onClick={(_) => {
                        toggleMenu ? setToggleMenu(false) : setToggleMenu(true);
                     }}
                  >
                     <span className="toggle-mobile__span"></span>
                     <span className="toggle-mobile__span"></span>
                     <span className="toggle-mobile__span"></span>
                  </div>
               </div>
            )}
         </nav>
         <Checking
            message={CheckingMsg}
            showClass={addShowClass}
            removeShowClass={removeShowClass}
         />
      </header>
   );
};

export default Header;
