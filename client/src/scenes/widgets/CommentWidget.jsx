import { Stack, Typography, Box, IconButton, useTheme } from "@mui/material";

import React, { useState } from "react";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HorizontalRuleOutlinedIcon from "@mui/icons-material/HorizontalRuleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import FlexBetween from "../../components/FlexBetween";
import { ContentDetails } from "../../components/ContentDetails";
import { ContentUpdateEditor } from "./ContentUpdateEditor";
import { CommentEditor } from "./CommentEditor";
import axios from "axios";
import { useSelector } from "react-redux";

export const CommentWidget = (props) => {
  const theme = useTheme();
  const commentData = props.comment;
  const [comment, setComment] = useState(commentData);
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const { depth } = props;
  const { postId, removeComment, addComment } = props;
  const [minimised, setMinimised] = useState(depth % 4 === 3);
  const token = useSelector((state) => state.token);
  //console.log("! ", comment);

  const handleDelete = async () => {
    const response = await axios.delete(
      `http://localhost:3001/comments/${comment._id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    //console.log("responsse ", response.data);
    removeComment(response.data);
  };

  let style = {
    backgroundColor: "#dcddde",
    borderRadius: 1.5,
    mb: "1rem",
  };

  if (depth % 2 === 1) {
    style.backgroundColor = "#ffffff";
  }
  return (
    comment && (
      <Box sx={style}>
        <Box
          sx={{
            px: "1.2rem",
            py: "1rem",
          }}
        >
          <>
            <FlexBetween>
              <FlexBetween gap="1rem">
                <ContentDetails
                  friendId={comment.commenter._id}
                  createdAt={comment.updatedAt}
                  name={`${comment.commenter.firstName} ${comment.commenter.lastName}`}
                  userPicturePath={comment.commenter.picturePath}
                ></ContentDetails>
                <IconButton
                  sx={{ color: "#000000" }}
                  onClick={() => setMinimised(!minimised)}
                >
                  {minimised ? (
                    <AddOutlinedIcon size={15} />
                  ) : (
                    <HorizontalRuleOutlinedIcon size={15} />
                  )}
                </IconButton>
              </FlexBetween>

              <FlexBetween gap="0.5rem">
                <IconButton
                  sx={{ color: "#000000" }}
                  size="small"
                  onClick={() => {
                    setReplying(!replying);
                    setEditing(false);
                  }}
                >
                  {!replying ? (
                    <ReplyOutlinedIcon></ReplyOutlinedIcon>
                  ) : (
                    <CancelOutlinedIcon></CancelOutlinedIcon>
                  )}
                </IconButton>
                <IconButton
                  sx={{ color: "#000000" }}
                  onClick={() => {
                    setEditing(!editing);
                    setReplying(false);
                  }}
                >
                  {!editing ? (
                    <BorderColorOutlinedIcon></BorderColorOutlinedIcon>
                  ) : (
                    <CancelOutlinedIcon></CancelOutlinedIcon>
                  )}
                </IconButton>
                <IconButton sx={{ color: "#000000" }} onClick={handleDelete}>
                  <DeleteOutlinedIcon></DeleteOutlinedIcon>
                </IconButton>
              </FlexBetween>
            </FlexBetween>
            <Box sx={{ mt: 1 }} overflow="hidden">
              {!editing ? (
                <Typography>{comment.content} </Typography>
              ) : (
                <ContentUpdateEditor originalContent={comment.content} />
              )}

              {replying && (
                <Box sx={{ mt: 2 }}>
                  <CommentEditor
                    setReplying={setReplying}
                    comment={comment}
                    addComment={addComment}
                    postId={postId}
                  ></CommentEditor>
                </Box>
              )}
              {comment.children && (
                <Box>
                  {comment.children.map((reply, i) => (
                    <CommentWidget />
                  ))}
                </Box>
              )}
            </Box>
            {!minimised && (
              <Box sx={{ mt: 1 }} overflow="hidden">
                {comment.children && (
                  <Box sx={{ pt: theme.spacing(2) }}>
                    {comment.children.map((reply, i) => (
                      <>
                        <CommentWidget
                          key={reply._id}
                          postId={postId}
                          comment={reply}
                          depth={depth + 1}
                          addComment={addComment}
                          removeComment={removeComment}
                        />
                      </>
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </>
        </Box>
      </Box>
    )
  );
};
