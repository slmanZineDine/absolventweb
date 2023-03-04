const Table = ({ data, cols }) => {
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
                  ? data.map((topic, i) => {
                       // row
                       return (
                          <tr key={i} className="row">
                             {topic.map(
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
