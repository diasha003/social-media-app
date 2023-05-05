import { Stack, Typography, Box } from "@mui/material";

import React, { useEffect, useState } from "react";
import { CommentEditor } from "./CommentEditor";
import { CommentWidget } from "./CommentWidget";
import { useSelector } from "react-redux";
import axios from "axios";

export const CommentsWidget = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const token = useSelector((state) => state.token);

  const getAllComments = async () => {
    const response = await axios.get(
      `http://localhost:3001/comments/post/${postId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const getComments = response.data.comments;
    setComments(getComments);

    console.log(response.data.comments);
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <Stack spacing={2}>
      <CommentEditor></CommentEditor>
      {comments.length > 0 ? (
        <Box pb={4}>
          {comments.map((comment, i) => (
            <>
              <CommentWidget
                comment={comment}
                key={comment._id}
                depth={0}
              ></CommentWidget>
            </>
          ))}
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          textAlign="center"
          paddingY={3}
        >
          <Box>
            <Typography variant="h6" color="text.secondary">
              No comments yet...
            </Typography>
            <Typography color="text.secondary">
              Be the first one to comment!
            </Typography>
          </Box>
        </Box>
      )}
    </Stack>
  );
};