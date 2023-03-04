import { useEffect, useRef, useState } from "react";

const CustomSelect = ({ options, defaultOption, valSelected }) => {
   // Options: [Array] of select options
   // DefaultOption: [String] represent the default option
   // ValSelected: [Function] to send a selected option to parent component
   const selectElement = useRef(null);
   const [selectedOption, setSelectedOption] = useState(null);

   useEffect(() => {
      valSelected(options[selectedOption]);
   }, [selectedOption]);
   return (
      <div
         className="custom-select"
         onClick={(_) => selectElement.current.classList.toggle("show-options")}
      >
         {selectedOption !== null ? options[selectedOption] : defaultOption}
         <span className="arrow"></span>
         <ul className="select" ref={selectElement}>
            {options.map((option, i) => (
               <li
                  key={i}
                  className="option"
                  onClick={(_) => {
                     setSelectedOption(i);
                  }}
               >
                  {option}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default CustomSelect;
