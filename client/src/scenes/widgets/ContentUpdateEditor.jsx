import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { CssTextField } from "../../theme";
import axios from "axios";
import { useSelector } from "react-redux";

export const ContentUpdateEditor = (props) => {
  const [content, setContent] = useState(props.originalContent);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <Box component="form" onSubmit={props.handleSubmit}>
      <Box>
        <TextField
          value={content}
          fullWidth
          required
          margin="normal"
          name="content"
          sx={{
            backgroundColor: props.depth % 2 === 0 ? "#dcddde" : "#ffffff",
          }}
          onChange={handleChange}
          multiline
        />
        <Button
          variant="outlined"
          type="submit"
          sx={{
            backgroundColor: props.depth % 2 === 0 ? "#dcddde" : "#ffffff",
            m: "3px auto",
            display: "block",
          }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};
