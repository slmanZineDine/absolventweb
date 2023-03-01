import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import logoutIcon from "../assets/imgs/icons/logoutIcon.png";
import { navLinks } from "../data/navlLinks";
import { Logo } from "./Logo";

const Header = () => {
   const [toggleMenu, setToggleMenu] = useState(false);
   const headerElement = useRef(null);
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
            <div className="menu">
               <ul className={`links ${toggleMenu ? "show" : ""}`}>
                  {navLinks["student"].map((e, i) => (
                     <>
                        <li className="item" key={i}>
                           <NavLink to={e.path} end>
                              {e.title}
                           </NavLink>
                        </li>
                     </>
                  ))}
                  <li>
                     <button className="btn logout-btn">
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
         </nav>
      </header>
   );
};

export default Header;
