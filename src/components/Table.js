const Table = ({ data, cols }) => {
   // Data: [Array] array of arrays contains data to put it in the table
   // Cols: [Array] contains cols name
   return (
      <div className="cover">
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
               {data?.length > 0
                  ? data.map((row, i) => {
                       // row
                       return (
                          <tr key={i} className="row">
                             {row.map(
                                (
                                   cell,
                                   i // columns
                                ) => (
                                   <td key={i} className="cell">
                                      {cell}
                                   </td>
                                )
                             )}
                          </tr>
                       );
                    })
                  : null}
            </tbody>
         </table>
      </div>
   );
};

export default Table;
