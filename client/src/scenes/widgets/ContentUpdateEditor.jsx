import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { CssTextField } from "../../theme";

export const ContentUpdateEditor = (props) => {
  const [content, setContent] = useState(props.originalContent);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    let error = null;

    if (props.validate) {
      error = props.validate(content);
    }

    if (error && error.length !== 0) {
    } else {
      props.handleSubmit(e);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box>
        <TextField
          value={content}
          fullWidth
          required
          margin="normal"
          name="content"
          sx={{ backgroundColor: "white" }}
          onChange={handleChange}
          multiline
        />
        <Button
          variant="outlined"
          type="submit"
          sx={{
            backgroundColor: "white",
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
