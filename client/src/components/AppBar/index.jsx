import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Container,
  Button,
  TextField,
  Stack,
} from "@mui/material";

import { Link } from "react-router-dom";

import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";

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
                    backgroundColor: "#21b6ae",
                  }}
                >
                  Sign in
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    color: "#000000",
                    backgroundColor: "#21b6ae",
                  }}
                >
                  Sign up
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Container maxWidth={"xs"} sx={{ mt: 10, background: "#e8efe6" }}>
        <Stack alignItems="center">
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <Typography color="text.secondary">
            Don't have an account yet?
          </Typography>
          <Box component="form" textAlign="center">
            <TextField
              label="Email Address"
              fullWidth
              margin="normal"
              required
              id="email"
              name="email"
              type="email"
            />
            <TextField
              label="Password"
              fullWidth
              required
              margin="normal"
              id="password  "
              name="password"
              type="password"
            />

            <Button
              type="submit"
              variant="outlined"
              sx={{
                my: 2,
                backgroundColor: "#21b6ae",
                color: "#000000",
              }}
            >
              Login
            </Button>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default NavBar;
