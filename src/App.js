import "./assets/css/style.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Greeting from "./pages/Greeting";
import HomePage from "./pages/HomePage";
import ListOfTopics from "./pages/ListOfTopics";
import Profile from "./pages/Profile";
import Workspace from "./pages/Workspace";
import AddNewTopic from "./pages/topic/AddNewTopic";
import { EditeTopic } from "./pages/topic/EditeTopic";
import Support from "./pages/Support";
import PageNotFound from "./pages/PageNotFound";

function App() {
   return (
      <>
         <Routes>
            <Route index element={<Greeting />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/list-of-topics" element={<ListOfTopics />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/profile" element={<Outlet />}>
               <Route index element={<Profile />} />
               <Route path="add-new-topic" element={<AddNewTopic />} />
               <Route path="edite-topic" element={<EditeTopic />} />
            </Route>
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<PageNotFound />} />
         </Routes>
      </>
   );
}

export default App;
