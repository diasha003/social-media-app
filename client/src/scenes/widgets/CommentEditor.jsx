import { Button, Card, Stack, TextField, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import FlexBetween from "../../components/FlexBetween";

export const CommentEditor = ({ postId }) => {
  const [formData, setFormData] = useState({
    content: "",
  });
  const token = useSelector((state) => state.token);

  const params = useParams();
  //console.log(params); params.userId

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //console.log(formData);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const body = {
        ...formData,
      };

      const savedPost = await axios.post(
        `http://localhost:3001/comments/${postId}`,
        body,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const posts = savedPost.data;
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
