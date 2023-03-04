import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./assets/css/style.css";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Greeting from "./pages/Greeting";
import HomePage from "./pages/HomePage";
import ListOfTopics from "./pages/ListOfTopics";
import Profile from "./pages/Profile";
import Workspace from "./pages/Workspace";
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
            <Route path="/profile" element={<Profile />} />
         </Routes>
      </>
   );
}

export default App;
