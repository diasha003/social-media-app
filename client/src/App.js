import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <>
      <AppBar></AppBar>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Register></Register>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
