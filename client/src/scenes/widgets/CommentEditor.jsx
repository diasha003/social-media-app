import { Button, Card, Stack, TextField, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import FlexBetween from "../../components/FlexBetween";

export const CommentEditor = ({ postId, comment, addComment, setReplying }) => {
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const body = {
        ...formData,
        userId: userId,
        parentId: comment && comment._id,
      };

      console.log(body);

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
    <Card sx={{}}>
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
              backgroundColor: "white",
              px: "3px",
            }}
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
            Submit
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
