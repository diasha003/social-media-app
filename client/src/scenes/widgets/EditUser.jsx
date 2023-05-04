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
import FormUser from "../../components/FormUser";

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

export const EditUser = ({ user, isOpen, onClose }) => {
  const dispatch = useDispatch();
  //const [image, setImage] = useState(post.picturePath);
  const token = useSelector((state) => state.token);
  //const [description, setDescription] = useState(post.description);

  const changeHandler = (e) => {
    //setDescription(e.target.value);
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
            <FormUser update={true} user={user} onClose={onClose}></FormUser>
          </Box>
          <FlexBetween sx={{ mt: "5px" }}>
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
          </FlexBetween>
        </Box>
      </Modal>
    </Box>
  );
};
