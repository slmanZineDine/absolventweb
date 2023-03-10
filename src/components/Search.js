import searchIcon from "../assets/imgs/icons/searchIcon.png";
const Search = () => {
   return (
      <div className="search">
         <h3 className="search_title">Cautare</h3>
         <div className="search_field">
            <input
               type="search"
               placeholder="Search"
               className="search_field_input"
            />
            <div className="icon">
               <img src={searchIcon} alt="search-icon" className="btn-icon" />
            </div>
         </div>
      </div>
   );
};

export default Search;
