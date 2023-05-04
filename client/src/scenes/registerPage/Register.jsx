import { Typography, Container, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import FormUser from "../../components/FormUser";

const Register = () => {
  return (
    <Container sx={{ mt: 5, background: "#e8efe6", width: "500px" }}>
      <Stack alignItems="center">
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Register
        </Typography>
        <Typography color="text.secondary" sx={{ mb: "8px" }}>
          Already have an account? <Link to="/login">Login </Link> here
        </Typography>
        <FormUser></FormUser>
      </Stack>
    </Container>
  );
};

export default Register;
