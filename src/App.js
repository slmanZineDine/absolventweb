import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./assets/css/style.css";
import Auth from "./auth/Auth";
import Greeting from "./pages/Greeting";
import HomePage from "./pages/HomePage";
function App() {
   // let data = JSON.stringify({
   //    name: "name1",
   //    email: "testee1@gmail.com",
   //    password: "123456",
   //    password_confirmation: "123456",
   //    phone: "123456",
   //    type: "student",
   //    address: "address1",
   //    facultatea: "facultatea1",
   //    specializare: "specializare1",
   // });
   useEffect(() => {
      // axios
      //    .post("http://127.0.0.1:8000/api/register", data, {
      //       headers: { "Content-Type": "application/json" },
      //    })
      //    .then(function (response) {
      //       console.log(response);
      //    })
      //    .catch(function (error) {
      //       console.log(error.response.data);
      //    });
   }, []);
   return (
      <>
         <Routes>
            <Route index element={<Greeting />} />
            <Route path="/login" element={<Auth authProcess="login" />} />
            <Route path="/register" element={<Auth authProcess="register" />} />
            <Route path="/homepage" element={<HomePage />} />
         </Routes>
      </>
   );
}

export default App;
