import { Stack, Typography, Box, IconButton, useTheme } from "@mui/material";

import React, { useState } from "react";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HorizontalRuleOutlinedIcon from "@mui/icons-material/HorizontalRuleOutlined";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import FlexBetween from "../../components/FlexBetween";
import { ContentDetails } from "../../components/ContentDetails";

export const CommentWidget = (props) => {
  const theme = useTheme();
  const commentData = props.comment;
  const [comment, setComment] = useState(commentData);
  const { depth } = props;
  const [minimised, setMinimised] = useState(depth % 4 === 3);
  console.log("! ", comment);

  let style = {
    backgroundColor: theme.palette.grey[100],
    borderRadius: 1.5,
    mb: theme.spacing(2),
    padding: theme.spacing(0),
  };

  if (depth % 2 === 1) {
    style.backgroundColor = "white";
  }
  return (
    comment && (
      <Box sx={style}>
        <Box
          sx={{
            pl: theme.spacing(2),
            pt: theme.spacing(1),
            pb: theme.spacing(1),
            pr: 1,
          }}
        >
          {false ? (
            <Box>
              <Typography variant="h6">
                <Link underline="hover" to={"/posts/"}></Link>
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              ></Typography>
            </Box>
          ) : (
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
                  <IconButton sx={{ color: "#000000" }}>
                    <ReplyOutlinedIcon></ReplyOutlinedIcon>
                  </IconButton>
                  <IconButton sx={{ color: "#000000" }}>
                    <BorderColorOutlinedIcon></BorderColorOutlinedIcon>
                  </IconButton>
                  <IconButton sx={{ color: "#000000" }}>
                    <DeleteOutlinedIcon></DeleteOutlinedIcon>
                  </IconButton>
                </FlexBetween>
              </FlexBetween>
              <Box sx={{ mt: 1 }} overflow="hidden">
                <Typography> comment.content </Typography>
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
                        <CommentWidget
                          key={reply._id}
                          comment={reply}
                          depth={depth + 1}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    )
  );
};
