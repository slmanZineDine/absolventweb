// External
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
// Internal
import Header from "../components/Header";
import Search from "../components/Search";
import Filter from "../components/Filter";
import {
   getAllTopicsByDoctor,
   getTopicsByDoctorId,
} from "../redux/topics/topicsActions";
import { createWorkspace } from "../redux/workspaces/workspacesActions";
import { getStudentStatus } from "../redux/users/uersAction";
import Spinning from "../components/Spinning";
import {
   searchByCoordinator,
   searchGlobaly,
} from "../redux/topics/topicsSlice";
import Table from "../components/Table";
import { setSearchMethod } from "../redux/global/globalSlice";
import { getCoordinatorTemeTable } from "../redux/export/exportActions";
import arrowUpIcon from "../assets/imgs/icons/arrowUpIcon.png";

const ListOfTopics = () => {
   // ======================= Global Data =======================
   // Get User Information To Permission For Enter This Page Or Not
   const user = localStorage.getItem("user");
   const userType = JSON.parse(user)?.type;
   document.title = "Absolventweb | Teme Propuse";

   // ======================= Redux Hook =======================
   const dispatch = useDispatch();
   const topicsByDoctor = useSelector((state) => state.topics.topicsByDoctor);
   const workspace = useSelector((state) => state.workspaces);
   // Use This To Get Selected Tema Information To Send It To Create Workspace With 0 Status
   const workspaceInfo = useSelector((state) => state.global.workspaceInfo);
   // Use This To Get Student Status
   const userStatus = useSelector((state) => state.users.studentStatus);
   // Use This To Get Selected Search Method
   const searchMethod = useSelector((state) => state.global.searchMethod);
   // For Table Msg [Coordinator] Show Diff Msg Based On SearchMode
   const { searchMode } = useSelector((state) => state.global);
   const exportProcess = useSelector((state) => state.export);

   // ======================= Router Hook =======================
   const navigate = useNavigate();

   // ======================= Own Function =======================
   /**
    * Use This Function To Get Pagination Value From Each Table And Reset It Based On Search Mode
    * @param Function UseState Fuction That Contain Pagination Values
    * @returns Undefined
    */
   const resetPagination = (resetFuc) => {
      resetFuc({
         start: 0,
         end: 3,
      });
   };

   // ======================= Sweet Alert Labrary =======================
   const processChecking = async (msg, icon, theClassName) => {
      await swal(msg, {
         buttons: false,
         timer: 3000,
         icon: icon,
         className: theClassName,
         closeOnEsc: false,
      });
   };
   // Checking Box To Confirm Creation A New Workspace
   const confirmCreation = async (workspace) => {
      let checkBox = await swal("Are you sure?", {
         dangerMode: true,
         buttons: true,
      });
      if (checkBox) {
         dispatch(createWorkspace(workspace));
         setProcessDone(true);
      }
   };

   // ======================= Handle User Select =======================
   // Checking If User Select A Tema of Not
   const handleCreation = () => {
      if (workspaceInfo.tema_id && workspaceInfo.coordonator_id)
         confirmCreation(workspaceInfo);
      else processChecking("Please Select A Tema.", "warning", "red-bg");
   };

   // ======================= React Hook =======================
   // Specify Search Method To Send It To Search Compnent
   const [theSearchMethod, setTheSearchMethod] = useState({
      searchGlobaly: searchGlobaly,
      serachByCoordinator: searchByCoordinator,
   });
   // Get Scroll Top Btn To Scroll Top When Use Select A Tema
   const scrollTopBtn = useRef();
   // To Prevent Show Alert Unless Process Is Success Or Rejected
   const [processDone, setProcessDone] = useState(false);
   const anchorLink = useRef(null);
   useEffect(() => {
      // If Student Or Admin => Getting All Doctors teme
      if (user && (userType === "student" || userType === "admin")) {
         dispatch(getAllTopicsByDoctor());
         // Set Default Search Method To Use It In Search Bar
         dispatch(setSearchMethod("searchGlobaly"));
      }
      // If Coordinator => Getting Only Doctor's teme
      else if (user && userType === "coordonator") {
         const doctorId = JSON.parse(user)?.coordonator?.id;
         if (doctorId) {
            dispatch(getTopicsByDoctorId(doctorId));
         }
      }
      if (userType === "student") {
         dispatch(getStudentStatus());
      }
   }, []);
   useEffect(() => {
      if (userType === "student") scrollTopBtn.current.click();
   }, [workspaceInfo]);
   // Variable Below To Prevent Run useEffect Initial-Render
   const firstUpdate = useRef(true);
   useEffect(() => {
      if (firstUpdate.current) {
         firstUpdate.current = false;
         return;
      }
      if (userType === "student") {
         if (processDone) {
            if (!workspace.loading && workspace.error) {
               processChecking(workspace.error, "error", "red-bg");
               setProcessDone(false); // Reset
            } else if (!workspace.loading && workspace.success) {
               processChecking("Process Successfully", "success", "done");
               setProcessDone(false); // Reset
               navigate("/homepage");
            }
         }
      }
   }, [workspace.error, workspace.success]);
   if (user) {
      if (userType === "student") {
         // Names Of Table Columns
         const tableCols = [
            { heading: "Nr", val: "" },
            { heading: "Tema", val: "title" },
            { heading: "Type", val: "tema_type" },
            { heading: "Detalii", val: "detalii" },
            { heading: "Specializare", val: "specializare" },
            {
               heading: "Process",
               val: { select: true },
            },
         ];

         return (
            <>
               <Header userType={userType} />
               <main className="main list-of-topics-page">
                  <div className="container">
                     <Search searchMethod={theSearchMethod[searchMethod]} />
                     <Filter
                        coordinator={true}
                        programmingLang={true}
                        topicType={true}
                        searchMethod={searchGlobaly}
                     />
                     {userStatus?.workspace_status === 1 ||
                     userStatus?.workspace_status === 0 ? null : (
                        <div className="btns-space">
                           {workspace.loading ? (
                              <Spinning size="small" />
                           ) : (
                              <button
                                 className={`btn save-btn ${
                                    workspaceInfo.tema_id
                                       ? "save-btn-animation"
                                       : null
                                 }`}
                                 onClick={handleCreation}
                              >
                                 Save
                              </button>
                           )}
                        </div>
                     )}
                     {topicsByDoctor.length > 0
                        ? topicsByDoctor.map((doctor, i) => (
                             <div key={i} className="content">
                                <h2 className="title">
                                   {i + 1}. {doctor.name} ({doctor.email})
                                </h2>
                                <Table
                                   tableCols={tableCols}
                                   tableData={doctor.teme}
                                   resetPagination={resetPagination}
                                   msg="There Are No Teme To Show"
                                />
                             </div>
                          ))
                        : null}
                  </div>
                  <a href="#" className="scroll-top" ref={scrollTopBtn}>
                     <img
                        src={arrowUpIcon}
                        alt="arrow-up"
                        className="btn-icon"
                     />
                  </a>
               </main>
            </>
         );
      } else if (userType === "coordonator") {
         // Names Of Table Columns
         const tableCols = [
            { heading: "Nr", val: "" },
            { heading: "Tema", val: "title" },
            { heading: "Type", val: "tema_type" },
            { heading: "Detalii", val: "detalii" },
            { heading: "Specializare", val: "specializare" },
         ];

         return (
            <>
               <Header userType={userType} />
               <main className="main list-of-topics-page">
                  <div className="container">
                     <Search searchMethod={searchGlobaly} />
                     <Filter
                        coordinator={false}
                        programmingLang={true}
                        topicType={true}
                        searchMethod={searchGlobaly}
                     />
                     <div className="content">
                        <h2 className="title">
                           Coordinator: {JSON.parse(user)?.name}
                        </h2>
                        <Table
                           tableCols={tableCols}
                           tableData={topicsByDoctor?.[0]?.teme || []}
                           resetPagination={resetPagination}
                           msg={
                              searchMode ? (
                                 "There Are No Matched Teme."
                              ) : (
                                 <p>
                                    You Don't Any Tema Yet. Go To{" "}
                                    <Link
                                       to="/profile"
                                       style={{
                                          textDecoration: "underLine",
                                          color: "blue",
                                          fontWeight: "bold",
                                       }}
                                    >
                                       Profile
                                    </Link>{" "}
                                    To Add A New Tema.
                                 </p>
                              )
                           }
                        />
                     </div>
                  </div>
               </main>
            </>
         );
      } else if (userType === "admin") {
         // Names Of Table Columns
         const tableCols = [
            { heading: "Nr", val: "" },
            { heading: "Tema", val: "title" },
            { heading: "Type", val: "tema_type" },
            { heading: "Detalii", val: "detalii" },
            { heading: "Specializare", val: "specializare" },
         ];

         return (
            <>
               <Header userType={userType} />
               <main className="main list-of-topics-page">
                  <div className="container">
                     <Search searchMethod={theSearchMethod[searchMethod]} />
                     <Filter
                        coordinator={true}
                        programmingLang={true}
                        topicType={true}
                        searchMethod={searchGlobaly}
                     />
                     <div className="btns-space">
                        <a
                           ref={anchorLink}
                           style={{
                              display: "none",
                           }}
                        ></a>
                        {exportProcess.loading ? (
                           <Spinning size="small" />
                        ) : (
                           <button
                              className="btn save-btn"
                              onClick={() => {
                                 dispatch(getCoordinatorTemeTable()).then(
                                    ({ payload }) => {
                                       const blob = new Blob([payload], {
                                          type: "octet-stream",
                                       });
                                       const href = URL.createObjectURL(blob);
                                       anchorLink.current.href = href;
                                       anchorLink.current.download =
                                          "coordinator_teme.csv";
                                       anchorLink.current.click();
                                       URL.revokeObjectURL(href);
                                    }
                                 );
                              }}
                           >
                              Export
                           </button>
                        )}
                     </div>
                     {topicsByDoctor.length > 0
                        ? topicsByDoctor.map((doctor, i) => (
                             <div key={i} className="content">
                                <h2 className="title">
                                   {i + 1}. {doctor.name} ({doctor.email})
                                   (Coordinator ID: {doctor.id})
                                </h2>
                                <Table
                                   tableCols={tableCols}
                                   tableData={doctor.teme}
                                   resetPagination={resetPagination}
                                   msg="There Are No Teme To Show"
                                />
                             </div>
                          ))
                        : null}
                  </div>
               </main>
            </>
         );
      } else {
         return <Navigate to="/" />;
      }
   } else {
      return <Navigate to="/" />;
   }
};

export default ListOfTopics;
