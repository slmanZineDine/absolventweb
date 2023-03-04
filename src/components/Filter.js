import { useRef, useState } from "react";
import CustomSelect from "./CustomSelect";

const Filter = ({ doctor, programmingLang, topicType }) => {
   // To select user type
   // const userTypeSelect = useRef(null);
   // const userTypes = ["student", "coordonator", "admin"];
   const [selectedType, setSelectedType] = useState(null);
   const getSelectedType = (type) => setSelectedType(type);
   console.log(selectedType);

   return (
      <div className="filter">
         <h3 className="filter_title">Filtru</h3>
         <div className="filter_options">
            {doctor ? <button className="btn">Coordonator</button> : null}
            {programmingLang ? (
               // <CustomSelect
               //    options={["opt01", "opt02", "opt03"]}
               //    defaultOption="Limbaj de programare"
               // />
               <h1>bla bla</h1>
            ) : null}
            {topicType ? (
               <CustomSelect
                  options={["opt01", "opt02", "opt03"]}
                  defaultOption="Tip tema"
                  valSelected={getSelectedType}
               />
            ) : null}
         </div>
      </div>
   );
};

export default Filter;
