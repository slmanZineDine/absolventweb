import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./assets/css/style.css";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Greeting from "./pages/Greeting";
import HomePage from "./pages/HomePage";
function App() {
   return (
      <>
         <Routes>
            <Route index element={<Greeting />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/homepage" element={<HomePage />} />
         </Routes>
      </>
   );
}

export default App;
