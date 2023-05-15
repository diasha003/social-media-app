import { Typography, Container, Stack, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import FormUser from "../../components/FormUser";
import { useTheme } from "@mui/material/styles";

const Register = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        paddingTop: "64px",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container
        sx={{
          mt: 5,
          width: "500px",
          position: "relative",
          zIndex: 1,
          background: theme.palette.background.alt,
        }}
      >
        <Stack alignItems="center">
          <Typography
            variant="h6"
            color="text.secondary"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Register
          </Typography>
          <Typography color="text.secondary" sx={{ mb: "8px" }}>
            Already have an account?
            <Link to="/login" style={{ color: theme.palette.text.primary }}>
              Login{" "}
            </Link>
            here
          </Typography>
          <FormUser></FormUser>
        </Stack>
      </Container>
    </Box>
  );
};

export default Register;
