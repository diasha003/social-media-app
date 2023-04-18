import {
  Box,
  Typography,
  Container,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Container maxWidth={"xs"} sx={{ mt: 10, background: "#e8efe6" }}>
      <Stack alignItems="center">
        <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
          Login
        </Typography>
        <Typography color="text.secondary">
          Don't have an account yet? <Link to="/signup">Sign Up</Link>
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
            variant="contained"
            sx={{
              my: 2,
              color: "#000000",
              backgroundColor: "#5bc2bb",
              "&:hover": {
                backgroundColor: "#21b6ae",
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
