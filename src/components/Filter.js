import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ProgrammingLangList, TipTemaList } from "../data/globalDate";
import { setSearchMethod, setSearchMode } from "../redux/global/globalSlice";
import { searchGlobaly } from "../redux/topics/topicsSlice";

const Filter = ({ coordinator, programmingLang, topicType, searchMethod }) => {
   // ======================= Redux Hook =======================
   const dispatch = useDispatch();

   // ======================= React Hook =======================
   // Store Selected Option Index
   const [selectedLang, setSelectedLang] = useState(null);
   // Store Selected Option Index
   const [selectedTip, setSelectedTip] = useState(null);
   // Checking If Coordinator Filter Is Selected;
   const [selected, setSelected] = useState(false);

   // ======================= Select Elements =======================
   const programmingLangFilter = useRef(null);
   const TipTema = useRef(null);

   return (
      <div className="filter">
         <h3 className="filter_title">Filtru</h3>
         <div className="filter_options">
            {coordinator ? (
               <p
                  className={`filter_option ${selected ? "selected" : ""}`}
                  onClick={(_) => {
                     if (selected) {
                        setSelected(false);
                        dispatch(setSearchMethod("searchGlobaly"));
                     } else {
                        setSelected(true);
                        dispatch(setSearchMethod("serachByCoordinator"));
                     }
                  }}
               >
                  Coordinator
               </p>
            ) : null}
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
                                 dispatch(searchMethod(lang));
                                 // Making Search Mode Ture To Reset All Pagination To Start Point
                                 dispatch(setSearchMode(true));
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
                                 dispatch(searchMethod(tip));
                                 // Reset Pagination On Serach Opreation
                                 // Making Search Mode Ture To Reset All Pagination To Start Point
                                 dispatch(setSearchMode(true));
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
