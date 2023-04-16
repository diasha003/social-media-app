import {
  Box,
  Typography,
  Container,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import * as yup from "yup";

import React from "react";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "react-router-dom";
import { Formik } from "formik";

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#81cfc8",
      },
      "&:hover fieldset": {
        borderColor: "#5b918c",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00968f",
      },
    },
    "& .MuiInputBase-input": {
      padding: "10px",
    },
    "& .MuiFormLabel-root": {
      top: "-5px",
    },
    ".Mui-focused, .MuiInputLabel-shrink": {
      top: "0px",
    },
  },
})(TextField);

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  location: "",
  occupation: "",
  picture: "",
  email: "",
  password: "",
};

const registerShema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "Must be longer than 2 charachers")
    .max(50, "Nice try, nobody has a first name that long")
    .required("Required"),
  lastName: yup
    .string()
    .min(2, "Must be longer than 2 charachers")
    .max(50, "Nice try, nobody has a last name that long")
    .required("Required"),
  location: yup.string().required("Required"),
  occupation: yup.string().required("Required"),

  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .min(6, "Must be longer than 6 characters")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .required("Required"),
});

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
        <Formik
          initialValues={initialValuesRegister}
          validationSchema={registerShema}
        >
          {({ values, errors, touched, handleBlur, handleChange }) => (
            <>
              <Box
                component="form"
                display="grid"
                gap="10px"
                sx={{
                  gridColumn: undefined,
                }}
              >
                <CssTextField
                  label="First Name"
                  name="firstName"
                  sx={{
                    gridColumn: "span 2",
                  }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                ></CssTextField>
                <CssTextField
                  label="Last Name *"
                  name="lastName"
                  sx={{ gridColumn: "span 2" }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
                <CssTextField
                  label="Location *"
                  name="location"
                  sx={{ gridColumn: "span 4" }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                />
                <CssTextField
                  label="Occupation *"
                  name="occupation"
                  sx={{ gridColumn: "span 4" }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                />

                <Box
                  gridColumn="span 4"
                  border={`1px solid ${`#81cfc8`}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}

                    /*onDrop={(acceptedFiles) =>
                  setFieldValue("picture", acceptedFiles[0])
                }*/
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${`#5b918c`}`}
                        p="1rem"
                        sx={{
                          "&:hover": { cursor: "pointer" },
                          fontSize: "11px",
                        }}
                      >
                        <input {...getInputProps()} />
                        {true ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography></Typography>
                            <EditOutlinedIcon />
                          </Box>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>

                <CssTextField
                  label="Email *"
                  id="email"
                  sx={{ gridColumn: "span 4" }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <CssTextField
                  label="Password"
                  name="password"
                  sx={{ gridColumn: "span 4" }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  my: 1,
                  color: "#000000",
                  backgroundColor: "#5bc2bb",
                  "&:hover": {
                    backgroundColor: "#21b6ae",
                  },
                }}
              >
                Login
              </Button>
            </>
          )}
        </Formik>
      </Stack>
    </Container>
  );
};

export default Register;

/* <Typography
            onClick={() => {
              setPageType(isLogin ? "register" : "login");
              resetForm();
            }}
            sx={{
              textDecoration: "underline",
              color: palette.primary.main,
              "&:hover": {
                cursor: "pointer",
                color: palette.primary.light,
              },
            }}
          >
            {isLogin
              ? "Don't have an account? Sign Up here."
              : "Already have an account? Login here."}
          </Typography>*/
