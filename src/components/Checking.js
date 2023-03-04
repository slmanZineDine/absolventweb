import React, { useEffect, useRef } from "react";

const Checking = ({ message, showClass, removeShowClass }) => {
   const element = useRef(null);
   console.log(message);
   useEffect(() => {
      setTimeout((_) => {
         if (element.current) {
            element.current.classList.remove("show");
            element.current.classList.remove("show-done");
         }
         removeShowClass();
      }, 6000);
   }, [showClass]);
   return (
      <div className={`checking-message ${showClass}`} ref={element}>
         {message}
      </div>
   );
};

export default Checking;
