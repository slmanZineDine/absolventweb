const Table = ({ data, cols }) => {
   return (
      <table className="table">
         <thead className="thead">
            <tr className="main-row">
               {cols.map((colName, i) => (
                  <th key={i} className="main-cell">
                     {colName}
                  </th>
               ))}
            </tr>
         </thead>
         <tbody className="tbody">
            <tr className="row">
               <td className="cell">1</td>
               <td className="cell">Title of project</td>
               <td className="cell">Detail of project</td>
               <td className="cell">specializare of project</td>
               <td className="cell">status</td>
            </tr>
         </tbody>
      </table>
   );
};

export default Table;
