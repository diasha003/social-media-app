import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../store/authSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#e8efe6",
  boxShadow: 24,
  p: 2,
};

export const EditPost = ({ post, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState({ name: post.picturePath });

  const token = useSelector((state) => state.token);
  const [description, setDescription] = useState(post.description);

  const changeHandler = (e) => {
    setDescription(e.target.value);
  };

  const update = async () => {
    if (!image && !description) {
      alert("Fill in at least one field");
      return;
    }

    let formData = new FormData();
    formData.append("description", description);
    formData.append("picturePath", image.name);
    formData.append("picture", image);
    const response = await axios.patch(
      `http://localhost:3001/posts/${post._id}`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    dispatch(setPost({ post: response.data }));
    onClose();
  };

  return (
    <Box>
      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <FlexBetween gap="1.5rem" pb="1rem">
              <TextField
                id="filled-basic"
                label="What would you like to post today..."
                variant="outlined"
                sx={{
                  width: "100%",
                  color: "#000000",
                }}
                multiline={true}
                rows={3}
                value={description}
                onChange={changeHandler}
              ></TextField>
            </FlexBetween>
            <Box
              gridColumn="span 4"
              border={`1px solid ${`#81cfc8`}`}
              borderRadius="5px"
              p="0.5rem"
              display="flex"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                name="pictureFormat"
                onDrop={(acceptedFiles) => {
                  if (
                    !["image/jpeg", "image/jpg", "image/png"].includes(
                      acceptedFiles[0].type
                    )
                  ) {
                    alert("Only .jpg, .jpeg or .png");
                  } else {
                    setImage(acceptedFiles[0]);
                  }
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    display="flex"
                    sx={{ wordBreak: "break-word", boxSizing: "border-box" }}
                  >
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${`#5b918c`}`}
                      p="1rem"
                      sx={{
                        "&:hover": { cursor: "pointer" },
                        fontSize: "12px",
                      }}
                    >
                      <input {...getInputProps()} />
                      {!image ? (
                        <p>
                          Drag and drop some files here, or click to select
                          files
                        </p>
                      ) : (
                        <>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography>{image.name}</Typography>
                            <IconButton sx={{ color: "#000000" }}>
                              <EditOutlinedIcon />
                            </IconButton>
                          </Box>
                        </>
                      )}
                    </Box>
                    {!image ? (
                      <></>
                    ) : (
                      <Box display="flex">
                        <IconButton
                          sx={{ color: "#000000" }}
                          onClick={() => setImage(null)}
                        >
                          <ClearOutlinedIcon />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
          </Box>

          <FlexBetween sx={{ mt: "5px" }}>
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
            <Button variant="outlined" onClick={update}>
              Update
            </Button>
          </FlexBetween>
        </Box>
      </Modal>
    </Box>
  );
};
