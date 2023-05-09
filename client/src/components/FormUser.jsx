import { Box, Typography, Button, IconButton } from "@mui/material";
import * as yup from "yup";
import React from "react";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import { CssTextField } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setPosts, setUpdateUser } from "../store/authSlice";

const FormUser = ({ update = false, user = null, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const registerSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(2, "Must be longer than 2 characters")
      .max(50, "Nice try, nobody has a first name that long")
      .required("Required"),
    lastName: yup
      .string()
      .min(2, "Must be longer than 2 characters")
      .max(50, "Nice try, nobody has a last name that long")
      .required("Required"),
    location: yup.string().required("Required"),
    occupation: yup.string().required("Required"),
    pictureFormat: yup.string(),
    email: yup.string().email("Invalid email").required("Required"),
    ...(!update
      ? {
          password: yup
            .string()
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
              "Password can only contain minimum six characters, at least one letter, one number and one special character."
            )
            .required("Required"),
        }
      : {}),
    oldPassword: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Password can only contain minimum six characters, at least one letter, one number and one special character."
      ),
    newPassword: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Password can only contain minimum six characters, at least one letter, one number and one special character."
      ),
  });

  //console.log("user", user);
  const initialValues = {
    firstName: user ? user.firstName : "",
    lastName: user ? user.lastName : "",
    location: user ? user.location : "",
    occupation: user ? user.occupation : "",
    picture: "",
    picturePath: user ? user.picturePath : "",
    email: user ? user.email : "",
    password: "",
    oldPassword: "",
    newPassword: "",
  };

  const funcRegister = async (values, onSubmitProps) => {
    try {
      //console.log(onSubmitProps);
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }

      const savedUserResponce = await axios.post(
        "http://localhost:3001/auth/register",
        formData
      );

      const savedUser = savedUserResponce.data;
      //console.log(savedUser);
      //loginUser(savedUser.token);
      navigate("/login");
    } catch (error) {
      if (error.response.data) {
        if (error.response.data.message === "Email must be unique") {
          onSubmitProps.setErrors({ email: "Email must be unique" });
        } else {
          console.log(error);
        }
      }
    }
  };

  const updateUser = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }

      console.log(formData);
      const result = await axios.patch(
        `http://localhost:3001/users/${user._id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      //console.log(result.data);
      dispatch(setUpdateUser({ user: result.data.updateUser }));
      dispatch(setPosts({ posts: result.data.allPosts }));
      onClose(result.data.updateUser);
    } catch (error) {
      if (error.response.data) {
        if (error.response.data.message === "Passwords must match") {
          onSubmitProps.setErrors({ oldPassword: "Passwords must match" });
        } else if (error.response.data.message === "Email must be unique") {
          onSubmitProps.setErrors({ email: "Email must be unique" });
        }
      }
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={update ? updateUser : funcRegister}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        setFieldValue,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="12px"
            sx={{
              gridColumn: undefined,
            }}
          >
            <CssTextField
              label="First Name *"
              name="firstName"
              sx={{
                gridColumn: "span 2",
              }}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.firstName) && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              value={values.firstName}
            ></CssTextField>
            <CssTextField
              label="Last Name *"
              name="lastName"
              sx={{ gridColumn: "span 2" }}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.lastName) && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              value={values.lastName}
            />
            <CssTextField
              label="Location *"
              name="location"
              sx={{ gridColumn: "span 4" }}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.location) && Boolean(errors.location)}
              helperText={touched.location && errors.location}
              value={values.location}
            />
            <CssTextField
              label="Occupation *"
              name="occupation"
              sx={{ gridColumn: "span 4" }}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.occupation) && Boolean(errors.occupation)}
              helperText={touched.occupation && errors.occupation}
              value={values.occupation}
            />

            <Box
              gridColumn="span 4"
              border={`1px solid ${`#81cfc8`}`}
              borderRadius="5px"
              p="0.5rem"
              display="flex"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                name="pictureFormat"
                onDrop={(acceptedFiles) => {
                  if (
                    !["image/jpeg", "image/jpg", "image/png"].includes(
                      acceptedFiles[0].type
                    )
                  ) {
                    alert("Only .jpg, .jpeg or .png");
                  } else {
                    //console.log(acceptedFiles[0].name);
                    setFieldValue("picture", acceptedFiles[0]);
                    setFieldValue("picturePath", acceptedFiles[0].name);
                  }
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    display="flex"
                    sx={{ wordBreak: "break-word", boxSizing: "border-box" }}
                  >
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${`#5b918c`}`}
                      p="1rem"
                      sx={{
                        "&:hover": { cursor: "pointer" },
                        fontSize: "12px",
                      }}
                    >
                      <input {...getInputProps()} />
                      {!values.picturePath ? (
                        <p>
                          Drag and drop some files here, or click to select
                          files
                        </p>
                      ) : (
                        <>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography>{values.picturePath}</Typography>
                            <IconButton sx={{ color: "#000000" }}>
                              <EditOutlinedIcon />
                            </IconButton>
                          </Box>
                        </>
                      )}
                    </Box>
                    {!values.picturePath ? (
                      <></>
                    ) : (
                      <Box display="flex">
                        <IconButton
                          sx={{ color: "#000000" }}
                          onClick={() => setFieldValue("picture", "")}
                        >
                          <ClearOutlinedIcon />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>

            <CssTextField
              label="Email *"
              name="email"
              sx={{ gridColumn: "span 4" }}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              value={values.email}
            />

            {update ? (
              <>
                <CssTextField
                  label="Old password"
                  type="password"
                  name="oldPassword"
                  sx={{ gridColumn: "span 4" }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    Boolean(touched.oldPassword) && Boolean(errors.oldPassword)
                  }
                  helperText={touched.oldPassword && errors.oldPassword}
                />
                <CssTextField
                  label="New password"
                  type="password"
                  name="newPassword"
                  sx={{ gridColumn: "span 4" }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    Boolean(touched.newPassword) && Boolean(errors.newPassword)
                  }
                  helperText={touched.newPassword && errors.newPassword}
                />
              </>
            ) : (
              <CssTextField
                label="Password"
                type="password"
                name="password"
                sx={{ gridColumn: "span 4" }}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            )}
          </Box>

          <Box textAlign="center">
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
              {update ? "Update" : "Sign Up"}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default FormUser;
