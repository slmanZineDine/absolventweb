import { Route, Routes } from "react-router-dom";
import "./assets/css/style.css";
import Greeting from "./pages/Greeting";
function App() {
   return (
      <>
         <Routes>
            <Route index element={<Greeting />} />
         </Routes>
      </>
   );
}

export default App;
