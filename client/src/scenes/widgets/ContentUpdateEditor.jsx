import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";

export const ContentUpdateEditor = (props) => {
  const [content, setContent] = useState(props.originalContent);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const theme = useTheme();

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
            backgroundColor:
              props.depth % 2 === 0
                ? theme.palette.background.alt
                : theme.palette.background.default,
          }}
          onChange={handleChange}
          multiline
        />
        <Button
          variant="outlined"
          type="submit"
          sx={{
            backgroundColor:
              props.depth % 2 === 0
                ? theme.palette.background.alt
                : theme.palette.background.default,
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
