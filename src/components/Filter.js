import { useState } from "react";

const Filter = ({ doctor, programmingLang, topicType }) => {
   return (
      <div className="filter">
         <h3 className="filter_title">Filtru</h3>
         <div className="filter_options">
            {doctor ? (
               <button className="btn filter-btn">Coordonator</button>
            ) : null}
            {programmingLang ? (
               <button className="btn filter-btn">Limbaj de programare</button>
            ) : null}
            {topicType ? (
               <button className="btn filter-btn">Tip tema</button>
            ) : null}
         </div>
      </div>
   );
};

export default Filter;
