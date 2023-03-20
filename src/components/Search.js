// External
import { useRef } from "react";
import { useDispatch } from "react-redux";
// Internal
import searchIcon from "../assets/imgs/icons/searchIcon.png";
import { searchTitle } from "../redux/topics/topicsSlice";

const Search = ({ resetPagination, searchMethod }) => {
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
                  if (e.target.value === "") {
                     // When Input Is Empty Reset Data In Table
                     dispatch(searchMethod(e.target.value));
                     // Reset Pagination After Serach Opreation Ending
                     resetPagination({
                        start: 0,
                        end: 3,
                     });
                  }
               }}
            />
            <div
               className="icon"
               onClick={() => {
                  dispatch(searchMethod(serachInput.current.value));
                  // Reset Pagination On Serach Opreation
                  resetPagination({
                     start: 0,
                     end: 3,
                  });
               }}
            >
               <img src={searchIcon} alt="search-icon" className="btn-icon" />
            </div>
         </div>
      </div>
   );
};

export default Search;
