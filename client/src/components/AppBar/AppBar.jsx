import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Container,
  Button,

} from "@mui/material";

import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import React from "react";

const NavBar = () => {
  return (
    <>
      <Box flex="1">
        <AppBar
          position="sticky"
          disablegutters="true"
          style={{
            top: 0,
            left: 0,
            margin: 0,
            background: "#e8efe6",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar>
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

              <Box sx={{ flexGrow: 0 }}>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    mr: 2,
                    color: "#000000",
                    backgroundColor: "#5bc2bb",
                    "&:hover": {
                      backgroundColor: "#21b6ae",
                    },
                  }}
                >
                  Sign in
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    color: "#000000",
                    backgroundColor: "#5bc2bb",
                    "&:hover": {
                      backgroundColor: "#21b6ae",
                    },
                  }}
                >
                  Sign up
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;
