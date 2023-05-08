import { Box, Typography, Button, InputBase, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FlexBetween from "../../components/FlexBetween";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";

import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setLogout, setMode } from "../../store/authSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const theme = useTheme();

  return (
    <>
      <FlexBetween backgroundColor="#e8efe6" padding="0.6rem 3%">
        <FlexBetween>
          <ConnectWithoutContactIcon
            fontSize="large"
            sx={{ display: { xs: "flex" }, mr: 1, color: "black" }}
          />
          <Typography
            variant="h4"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "black",
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
          >
            Connectify
          </Typography>
        </FlexBetween>

        {user && (
          <Box
            sx={{
              border: "1px solid gray",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, color: "#000000" }}
              placeholder="Search..."
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton
              type="button"
              sx={{ p: "10px", color: "#000000" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Box>
        )}

        <FlexBetween>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <>
                <DarkModeIcon
                  sx={{
                    fontSize: 25,
                    color: "#000000",
                  }}
                />
              </>
            ) : (
              <>
                <LightModeIcon
                  sx={{
                    fontSize: 25,
                    color: "#000000",
                  }}
                />
              </>
            )}
          </IconButton>

          {user ? (
            <>
              <IconButton component={Link} to={"/"}>
                <HomeIcon
                  sx={{
                    fontSize: 25,
                    cursor: "pointer",
                    color: "#000000",
                  }}
                />
              </IconButton>
              <IconButton component={Link} to={"/chat"}>
                <EmailIcon
                  sx={{
                    fontSize: 25,
                    cursor: "pointer",
                    color: "#000000",
                  }}
                />
              </IconButton>

              <Button
                variant="text"
                sx={{ marginRight: "4px" }}
                onClick={() => {
                  dispatch(setLogout());
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="text" sx={{ marginRight: "4px" }} href="/signup">
                Sign up
              </Button>
              <Button variant="text" href="/login">
                Login
              </Button>
            </>
          )}
        </FlexBetween>
      </FlexBetween>
    </>
  );
};

export default NavBar;

/* <IconButton component={Link} to={"/"}>
                <PersonIcon
                  sx={{
                    fontSize: 25,
                    cursor: "pointer",
                    color: "#000000",
                  }}
                />
              </IconButton>*/
