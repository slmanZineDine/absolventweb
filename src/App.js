import { Route, Routes } from "react-router-dom";
import "./assets/css/style.css";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Greeting from "./pages/Greeting";
function App() {
   return (
      <>
         <Routes>
            <Route index element={<Greeting />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
         </Routes>
      </>
   );
}

export default App;
