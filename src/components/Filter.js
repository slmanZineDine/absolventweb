import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ProgrammingLangList, TipTemaList } from "../data/globalDate";
import { searchTitle } from "../redux/topics/topicsSlice";

const Filter = ({ resetPagination, programmingLang, topicType }) => {
   // ======================= Select Elements =======================
   const programmingLangFilter = useRef(null);
   const TipTema = useRef(null);

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();

   // ======================= React Hook =======================
   // Store Selected Option Index
   const [selectedLang, setSelectedLang] = useState(null);
   // Store Selected Option Index
   const [selectedTip, setSelectedTip] = useState(null);

   return (
      <div className="filter">
         <h3 className="filter_title">Filtru</h3>
         <div className="filter_options">
            {programmingLang ? (
               <div
                  className="custom-select"
                  onClick={(_) => {
                     programmingLangFilter.current.classList.toggle(
                        "show-options"
                     );
                     setSelectedTip(null);
                  }}
               >
                  {selectedLang !== null ? (
                     <p>{ProgrammingLangList[selectedLang]}</p>
                  ) : (
                     <p>Limbaj de programare</p>
                  )}
                  <span className="arrow"></span>
                  <ul className="select" ref={programmingLangFilter}>
                     {ProgrammingLangList.map((lang, i) => {
                        return (
                           <li
                              key={i}
                              className="option"
                              onClick={(_) => {
                                 setSelectedLang(i);
                                 dispatch(searchTitle(lang));
                                 // Reset Pagination On Serach Opreation
                                 resetPagination({
                                    start: 0,
                                    end: 3,
                                 });
                              }}
                           >
                              {lang}
                           </li>
                        );
                     })}
                  </ul>
               </div>
            ) : null}
            {topicType ? (
               <div
                  className="custom-select"
                  onClick={(_) => {
                     TipTema.current.classList.toggle("show-options");
                     setSelectedLang(null);
                  }}
               >
                  {selectedTip !== null ? (
                     <p>{TipTemaList[selectedTip]}</p>
                  ) : (
                     <p>Tip Tema</p>
                  )}
                  <span className="arrow"></span>
                  <ul className="select" ref={TipTema}>
                     {TipTemaList.map((tip, i) => {
                        return (
                           <li
                              key={i}
                              className="option"
                              onClick={(_) => {
                                 setSelectedTip(i);
                                 dispatch(searchTitle(tip));
                                 // Reset Pagination On Serach Opreation
                                 resetPagination({
                                    start: 0,
                                    end: 3,
                                 });
                              }}
                           >
                              {tip}
                           </li>
                        );
                     })}
                  </ul>
               </div>
            ) : null}
         </div>
      </div>
   );
};

export default Filter;
