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
import EditeTopic from "./pages/topic/EditeTopic";
import Support from "./pages/Support";
import PageNotFound from "./pages/PageNotFound";
import Student from "./pages/Students";
import AddPost from "./pages/workspace/AddPost";
import AddTask from "./pages/workspace/AddTask";
import AddMeeting from "./pages/workspace/AddMeeting";
import Post from "./pages/workspace/Post";
import EditePost from "./pages/workspace/EditePost";
import EditeMeeting from "./pages/workspace/EditeMeeting";
import EditeTask from "./pages/workspace/EditeTask";
import Task from "./pages/workspace/Task";
import Doctors from "./pages/Doctors";

function App() {
   return (
      <>
         <Routes>
            <Route index element={<Greeting />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/list-of-topics" element={<ListOfTopics />} />
            <Route path="/workspace" element={<Outlet />}>
               <Route index element={<Workspace />} />
               <Route path="add-post" element={<AddPost />} />
               <Route path="edite-post" element={<EditePost />} />
               <Route path="add-task" element={<AddTask />} />
               <Route path="edite-task" element={<EditeTask />} />
               <Route path="add-meeting" element={<AddMeeting />} />
               <Route path="edite-meeting" element={<EditeMeeting />} />
               <Route path="post" element={<Post />} />
               <Route path="task" element={<Task />} />
            </Route>
            <Route path="/profile" element={<Outlet />}>
               <Route index element={<Profile />} />
               <Route path="add-new-topic" element={<AddNewTopic />} />
               <Route path="edite-topic" element={<EditeTopic />} />
            </Route>
            <Route path="/students" element={<Student />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<PageNotFound />} />
         </Routes>
      </>
   );
}

export default App;
