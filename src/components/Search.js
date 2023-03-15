import { useRef } from "react";
import { useDispatch } from "react-redux";
import searchIcon from "../assets/imgs/icons/searchIcon.png";
import { getAllTopicsByDoctor } from "../redux/topics/topicsActions";
import { searchTitle } from "../redux/topics/topicsSlice";

const Search = () => {
   // ======================= Select Input Elements =======================
   const serachInput = useRef(null);

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   return (
      <div className="search">
         <h3 className="search_title">Cautare</h3>
         <div className="search_field">
            <input
               type="search"
               placeholder="Search"
               className="search_field_input"
               ref={serachInput}
               onInput={(e) => {
                  if (e.target.value === "")
                     // When Input Is Empty Reset Data In Table
                     dispatch(searchTitle(e.target.value));
               }}
            />
            <div
               className="icon"
               onClick={() => {
                  dispatch(searchTitle(serachInput.current.value));
               }}
            >
               <img src={searchIcon} alt="search-icon" className="btn-icon" />
            </div>
         </div>
      </div>
   );
};

export default Search;
