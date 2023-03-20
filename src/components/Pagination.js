import { useState } from "react";

const Pagination = ({ paginationCount, setPaginationValue }) => {
   // ======================= React Hook =======================
   // Use This To Specify Selected Pagin
   const [selectedPagin, setSelectedPagin] = useState(0);

   // ======================= Own Function =======================
   /**
    * Use This Function To Create Paination Beasd in Tema Count (3 Tema in 1 Pagination)
    * @param Number Count of Teme
    * @returns Array Of Count Pagination
    */
   const getPagination = (paginationCount) => {
      const pagination = [];
      for (let i = 0; i < Math.ceil(paginationCount / 3); i++)
         pagination.push(i);
      return pagination;
   };

   return (
      <div className="pagination">
         {getPagination(paginationCount).map((pagin, i) => (
            <span
               key={pagin}
               className={`pagin ${
                  selectedPagin === pagin ? "selected-pagin" : ""
               }`}
               onClick={() => {
                  setPaginationValue({
                     start: i * 3,
                     end: (i + 1) * 3,
                  });
                  setSelectedPagin(pagin);
               }}
            >
               {i + 1}
            </span>
         ))}
      </div>
   );
};

export default Pagination;
