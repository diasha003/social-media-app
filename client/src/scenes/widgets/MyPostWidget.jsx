import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  TextField,
  Typography,
} from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import { useEffect, useRef, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/authSlice";
import { useTheme } from "@mui/material/styles";

export const MyPostWidget = ({ userId, picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const theme = useTheme();

  const changeHandler = (e) => {
    setPost(e.target.value);
  };

  useEffect(() => {
    //console.log(post);
  }, [post]);

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", _id);
      //console.log(post);
      formData.append("description", post);

      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }

      const savedPost = await axios.post(
        "http://localhost:3001/posts",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const posts = savedPost.data;
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost(" ");

      setIsImage(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WidgetWrapper mb="1rem">
      <Box>
        <FlexBetween gap="1.5rem" pb="1rem">
          <UserImage image={picturePath} size="50px"></UserImage>
          <TextField
            id="filled-basic"
            label="What would you like to post today..."
            variant="outlined"
            sx={{
              width: "100%",
              color: theme.palette.text.primary,
            }}
            multiline={true}
            rows={3}
            onChange={changeHandler}
            value={post}
          ></TextField>
        </FlexBetween>

        {isImage ? (
          <Box
            gridColumn="span 4"
            border={`1px solid ${`#81cfc8`}`}
            borderRadius="5px"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              name="pictureFormat"
              onDrop={(acceptedFiles) => {
                //console.log(acceptedFiles[0].type);
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
                    <p style={{ color: theme.palette.text.primary }}>
                      Drag and drop some files here, or click to select files
                    </p>
                  ) : (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography sx={{ color: theme.palette.text.primary }}>
                        {image.name}
                      </Typography>
                      <EditOutlinedIcon />
                    </Box>
                  )}
                </Box>
              )}
            </Dropzone>
          </Box>
        ) : (
          <></>
        )}

        <Divider></Divider>

        <FlexBetween mt="3px">
          <FlexBetween>
            <IconButton
              sx={{ color: theme.palette.text.icon }}
              onClick={() => {
                if (isImage) {
                  setIsImage(false);
                } else {
                  setIsImage(true);
                }
              }}
            >
              <ImageOutlinedIcon></ImageOutlinedIcon>
            </IconButton>

            <Typography sx={{ color: theme.palette.text.primary }}>
              Image
            </Typography>
          </FlexBetween>
          <Button
            variant="outlined"
            onClick={handlePost}
            disabled={!(post || image)}
            sx={{ color: theme.palette.text.primary }}
          >
            Post
          </Button>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};
