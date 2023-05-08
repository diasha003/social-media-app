import { MenuItem, ListItemAvatar, ListItemText } from "@mui/material";

import { ContentDetails } from "../../components/ContentDetails";

export const UserMessengerEntry = (props) => {
  const recipient = props.conversation.recipient;
  const selected = props.conversat && props.conversat.email === recipient.email;
  //console.log(props.conversation.recipient);

  const handleClick = () => {
    //console.log(recipient);
    props.setСonversant(recipient);
  };

  return (
    <>
      <MenuItem
        divider
        disableGutters
        sx={{ padding: 1 }}
        selected={selected}
        onClick={handleClick}
      >
        <ListItemAvatar>
          <ContentDetails
            createdAt={
              props.conversation.lastMessageAt
                ? props.conversation.lastMessageAt
                : ""
            }
            name={`${recipient.firstName} ${recipient.lastName}`}
            userPicturePath={recipient.picturePath}
          ></ContentDetails>
        </ListItemAvatar>
      </MenuItem>
    </>
  );
};
