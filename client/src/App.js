import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./scenes/loginPage/Login";
import Register from "./scenes/registerPage/Register";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import HomePage from "./scenes/homePage/HomePage";
import { darkTheme, lightTheme } from "./theme";
import NavBar from "./scenes/navBar/NavBar";
import { ProfilePage } from "./scenes/profilePage/ProfilePage";

function App() {
  const theme = useSelector((state) => state.darkMode);
  const isAuth = useSelector((state) => state.token);

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme ? darkTheme : lightTheme}>
          <NavBar></NavBar>
          <Routes>
            <Route
              path="/login"
              element={isAuth ? <Navigate to="/" /> : <Login />}
            ></Route>
            <Route
              path="/signup"
              element={isAuth ? <Navigate to="/" /> : <Register />}
            ></Route>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            ></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
