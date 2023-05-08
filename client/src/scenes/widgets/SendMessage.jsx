import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBetween from "../../components/FlexBetween";

export const SendMessage = (props) => {
  const [content, setContent] = useState("");

  const handleSendMessage = () => {
    props.onSendMessage(content);
    setContent("");
  };

  return (
    <Box
      sx={{
        m: 2,
        height: "40px",
      }}
      justifyContent="center"
    >
      <FlexBetween>
        <TextField
          onChange={(e) => setContent(e.target.value)}
          label="Send a message..."
          fullWidth
          autoComplete="off"
          size="small"
          value={content}
          onKeyPress={(e) => {
            if (e.key === "Enter" && content.length > 0) {
              handleSendMessage();
            }
          }}
        />

        <Button disabled={content.length === 0} onClick={handleSendMessage}>
          Send
        </Button>
      </FlexBetween>
    </Box>
  );
};
