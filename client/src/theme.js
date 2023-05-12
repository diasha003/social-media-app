import { createTheme } from "@mui/material";
import { withStyles } from "@mui/styles";
import { TextField } from "@mui/material";

export const CssTextField = withStyles({
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

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    text: {
      icon: "#000000",
    },
    background: {
      default: "#ffffff",
      alt: "#dcdedf",
      navbar: "#edeeef",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      icon: "#ffffff",
    },
    background: {
      default: "#000000",
      alt: "#404040",
      navbar: "#707070",
    },
  },
});
