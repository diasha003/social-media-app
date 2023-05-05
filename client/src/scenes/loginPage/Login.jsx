import {
  Box,
  Typography,
  Container,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { withStyles } from "@mui/styles";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { loginUser } from "../../helpers/authHelper";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/authSlice";
import { CssTextField } from "../../theme";

const initialValuesLogin = {
  email: "",
  password: "",
};

const loginShema = yup.object().shape({
  email: yup.string(), //.email("Invalid email"),
  password: yup.string(),
  /*.matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      "Password can only contain minimum six characters, at least one letter, one number and one special character."
    ),*/
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const funcLogin = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await axios.post(
        "http://localhost:3001/auth/login",
        values
      );

      //console.log(loggedInResponse);

      const loggedIn = loggedInResponse.data;

      if (loggedIn) {
        dispatch(setLogin({ user: loggedIn._doc, token: loggedIn.token }));
      }

      navigate("/");
    } catch (error) {
      if (error.response.data) {
        if (error.response.data.message === "User does not exist") {
          onSubmitProps.setErrors({ email: "User does not exist" });
        } else if (error.response.data.message === "Invalid credentials") {
          onSubmitProps.setErrors({ password: "Invalid credentials" });
        }
      }
      console.log(error);
    }
  };

  return (
    <Container maxWidth={"xs"} sx={{ mt: 10, background: "#e8efe6" }}>
      <Stack alignItems="center">
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Login
        </Typography>
        <Typography color="text.secondary" sx={{ mb: "8px" }}>
          Don't have an account yet? <Link to="/signup">Sign Up</Link>
        </Typography>
        <Formik
          initialValues={initialValuesLogin}
          validationSchema={loginShema}
          onSubmit={funcLogin}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box textAlign="center">
                <CssTextField
                  fullWidth
                  margin="normal"
                  label="Email Address"
                  name="email"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <CssTextField
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  margin="normal"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    marginBottom: "8px",
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
            </form>
          )}
        </Formik>
      </Stack>
    </Container>
  );
};

export default Login;
