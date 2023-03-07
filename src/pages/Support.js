import Header from "../components/Header";
import mailIcon from "../assets/imgs/icons/mailIcon.png";
import phoneIcon from "../assets/imgs/icons/phoneIcon.png";
import locationIcon from "../assets/imgs/icons/locationIcon.png";
import UniversityLogo from "../components/UniversityLogo";

const Support = () => {
   // Getting user type
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   return (
      <>
         <Header userType={userType} />
         <main className="main support-page">
            <div className="container">
               <ul className="box">
                  <li className="item">
                     <img src={mailIcon} alt="mail-icon" className="icon" />
                     <p className="text">
                        Contact us at support@uvt.ro or info@e-uvt.ro
                     </p>
                  </li>
                  <li className="item">
                     <img src={phoneIcon} alt="phone-icon" className="icon" />
                     <p className="text">+40 256 592 111</p>
                  </li>
                  <li className="item">
                     <img src={mailIcon} alt="mail-icon" className="icon" />
                     <p className="text">secretariat.uvt@e-uvt.ro</p>
                  </li>
                  <li className="item">
                     <img
                        src={locationIcon}
                        alt="locatin-icon"
                        className="icon"
                     />
                     <p className="text">
                        Bd. Vasile Pârvan nr. 4, Timișoara,
                        <br /> cod poștal 300223, județul Timiș, România
                     </p>
                  </li>
               </ul>
               <UniversityLogo />
            </div>
         </main>
      </>
   );
};

export default Support;
