import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/loginPage/Login";
import Register from "./pages/registerPage/Register";
import NavBar from "./components/AppBar/AppBar";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Register></Register>}></Route>
          <Route path="/home" element></Route>
          <Route path="/profile/:userId" elemen></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
