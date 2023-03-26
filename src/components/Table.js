// External
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// Internal
import Pagination from "./Pagination";
import TableProcess from "./TableProcess";

const Table = ({ tableCols, tableData, resetPagination, msg }) => {
   // ======================= Redux Hook =======================
   const searchMode = useSelector((state) => state.global.searchMode);

   // ======================= Reacts Hook =======================
   // Pagination Value For The Table
   const [paginationValueTable, setPaginationValueTable] = useState({
      start: 0,
      end: 3,
   });

   useEffect(() => {
      // Checking If Serach Mode Ture To Reset Pagination To Start Point
      if (searchMode) resetPagination(setPaginationValueTable);
   }, [searchMode]);

   return (
      <>
         <div className="cover">
            <table className="table">
               <thead className="thead">
                  <tr className="main-row">
                     {tableCols.map((colName, i) => (
                        <th key={i} className="main-cell">
                           {colName.heading}
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody className="tbody">
                  {tableData.length > 0 ? (
                     tableData
                        .map((item, i) => {
                           return (
                              <tr key={i} className="row">
                                 {tableCols.map((cell, j) => {
                                    if (cell.heading === "Nr")
                                       return (
                                          <td className="cell" key={j}>
                                             {i + 1}.
                                          </td>
                                       );
                                    if (cell.heading === "Process") {
                                       return (
                                          <td className="cell" key={j}>
                                             <TableProcess
                                                process={cell.val}
                                                selectionInfo={{
                                                   tema_id: item?.id || null,
                                                   coordonator_id:
                                                      item?.coordonator_id ||
                                                      null,
                                                }}
                                                workspaceInfo={{
                                                   student_id:
                                                      item?.student?.id || null,
                                                   student_email:
                                                      item?.student?.email ||
                                                      null,
                                                   workspace_id:
                                                      item?.worspace_id || null,
                                                   tema_name:
                                                      item?.tema?.title || null,
                                                }}
                                                temaId={item?.id || null}
                                             />
                                          </td>
                                       );
                                    }
                                    // Checking If Object Has Nested Object To Extract it
                                    if (cell.val.includes(".")) {
                                       const arr = cell.val.split(".");
                                       return (
                                          <td className="cell" key={j}>
                                             {item[arr[0]][arr[1]]}
                                          </td>
                                       );
                                    } else {
                                       return (
                                          <td className="cell" key={j}>
                                             {item[cell.val]}
                                          </td>
                                       );
                                    }
                                 })}
                              </tr>
                           );
                        })
                        .slice(
                           paginationValueTable.start,
                           paginationValueTable.end
                        )
                  ) : (
                     <tr className="row">
                        <td
                           className="cell empty-table"
                           colSpan={tableCols.length}
                        >
                           {msg}
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
         <Pagination
            paginationCount={tableData.length}
            setPaginationValue={setPaginationValueTable}
         />
      </>
   );
};

export default Table;
