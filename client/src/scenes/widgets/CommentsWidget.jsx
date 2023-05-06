import { Stack, Typography, Box } from "@mui/material";

import React, { useEffect, useState } from "react";
import { CommentEditor } from "./CommentEditor";
import { CommentWidget } from "./CommentWidget";
import { useSelector } from "react-redux";
import axios from "axios";

export const CommentsWidget = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const token = useSelector((state) => state.token);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    getAllComments();
    console.log(rerender);
  }, [rerender]);

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
    //console.log(response.data);
    setComments(getComments);
  };

  const findComment = (id) => {
    let commentToFind;

    const recurse = (comment, id) => {
      //console.log(comment);
      if (comment._id === id) {
        commentToFind = comment;
      } else {
        for (let i = 0; i < comment.children.length; i++) {
          const commentToSearch = comment.children[i];
          recurse(commentToSearch, id);
        }
      }
    };

    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      recurse(comment, id);
    }

    return commentToFind;
  };

  const removeComment = (removedComment) => {
    //console.log(removedComment);
    if (removedComment.parent) {
      const parentComment = findComment(removedComment.parent);
      parentComment.children = parentComment.children.filter(
        (comment) => comment._id !== removedComment._id
      );
      setRerender(() => {
        return !rerender;
      });
    } else {
      setComments(
        comments.filter((comment) => comment._id !== removedComment._id)
      );
    }
  };

  const addComment = (comment) => {
    if (comment.parent) {
      let parentComment = findComment(comment.parent);
      parentComment.children = [...parentComment.children, comment];
      //console.log(parentComment);
      setRerender(() => {
        return !rerender;
      });
    } else {
      setComments([comment, ...comments]);
    }
  };

  return (
    <Stack spacing={2}>
      <CommentEditor postId={postId} addComment={addComment}></CommentEditor>
      {comments.length > 0 ? (
        <Box pb={4}>
          {comments.map((comment, i) => (
            <>
              <CommentWidget
                comment={comment}
                key={comment._id}
                removeComment={removeComment}
                addComment={addComment}
                postId={postId}
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
