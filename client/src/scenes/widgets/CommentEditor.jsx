import { Button, Card, Stack, TextField, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { useTheme } from "@mui/material/styles";

export const CommentEditor = ({
  postId,
  comment,
  addComment,
  setReplying,
  depth,
}) => {
  const [formData, setFormData] = useState({
    content: "",
  });
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);

  const params = useParams();
  //console.log(params); params.userId

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const theme = useTheme();
  console.log(theme);

  let style = {
    backgroundColor: theme.palette.background.alt,
  };

  if (depth % 2 === 1) {
    style.backgroundColor = theme.palette.background.default;
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const body = {
        ...formData,
        userId: userId,
        parentId: comment && comment._id,
      };

      //console.log(body);

      const savedPost = await axios.post(
        `http://localhost:3001/comments/${postId}`,
        body,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      formData.content = "";
      //console.log(savedPost.data);
      setReplying && setReplying(false);
      addComment(savedPost.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      sx={{
        backgroundColor:
          depth % 2 === 0
            ? theme.palette.background.alt
            : theme.palette.background.default,
        boxShadow: "none",
      }}
    >
      <Box mt="0.5rem">
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            multiline
            fullWidth
            rows={2}
            required
            label="What are your thoughts on this post?"
            name="content"
            onChange={handleChange}
            value={formData.content}
            sx={{
              px: "3px",
              color: theme.palette.text.primary,
              backgroundColor:
                depth % 2 === 0
                  ? theme.palette.background.alt
                  : theme.palette.background.primary,
            }}
          />

          <Button
            variant="outlined"
            type="submit"
            sx={{
              backgroundColor:
                depth % 2 === 0
                  ? theme.palette.background.alt
                  : theme.palette.background.default,
              m: "3px auto",
              display: "block",
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
