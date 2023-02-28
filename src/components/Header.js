import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import logoutIcon from "../assets/imgs/icons/logoutIcon.png";

const Header = () => {
   const [toggleMenu, setToggleMenu] = useState(false);
   const headerElement = useRef(null);
   window.onscroll = () => {
      const ele = headerElement.current;
      window.scrollY > 80
         ? ele.classList.add("scroll-header")
         : ele.classList.remove("scroll-header");
   };

   return (
      <header className="header" ref={headerElement}>
         <nav className="nav container">
            <Link to="/" className="logo">
               <span className="logo-text">AbsolentWeb</span>
            </Link>
            <div className="menu">
               <ul className={`links ${toggleMenu ? "show" : ""}`}>
                  <li className="item">
                     <a>Home</a>
                  </li>
                  <li className="item">
                     <a>About</a>
                  </li>
                  <li className="item">
                     <a>Contact</a>
                  </li>
                  <li className="item">
                     <a>students</a>
                  </li>
                  <li className="item">
                     <a>ohter</a>
                  </li>
                  <li>
                     <button className="btn logout-btn">
                        Logout
                        <img
                           src={logoutIcon}
                           alt="logout-icon"
                           className="logout-icon"
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
