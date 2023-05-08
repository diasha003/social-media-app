import { Box, Card } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { ContentDetails } from "../../components/ContentDetails";

export const Message = (props) => {
  //console.log(props);

  let styles = {};
  if (props.message.direction === "to") {
    styles = {
      justifyContent: "flex-start",
    };
  } else if (props.message.direction === "from") {
    styles = {
      //messageColor: theme.palette.grey["100"],
      justifyContent: "flex-end",
    };
  }

  return (
    <Box display="flex" justifyContent={styles.justifyContent} sx={{ mb: 1 }}>
      {props.message.direction === "to" && (
        <ContentDetails
          size="40px"
          userPicturePath={props.conversant.picturePath}
        />
      )}
      <Card
        sx={{
          borderRadius: "25px",
          borderWidth: "1px",
          paddingY: "12px",
          maxWidth: "70%",
          paddingX: 2,
        }}
      >
        {props.message.content}
      </Card>
    </Box>
  );
};
