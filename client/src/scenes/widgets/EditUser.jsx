import { Box, Modal, IconButton } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
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
  return (
    <Box>
      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton sx={{ color: "#000000" }} onClick={() => onClose(user)}>
              <ClearOutlinedIcon />
            </IconButton>
          </Box>
          <Box>
            <FormUser update={true} user={user} onClose={onClose}></FormUser>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
