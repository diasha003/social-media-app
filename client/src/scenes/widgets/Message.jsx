import { Box, Card } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { ContentDetails } from "../../components/ContentDetails";

export const Message = (props) => {
  //console.log(props);
  return (
    <Box display="flex" flexDirection="column">
      {props.message.direction === "to" && <ContentDetails />}
      <Card
        sx={{
          borderRadius: "25px",

          borderWidth: "1px",
          paddingY: "12px",
          maxWidth: "70%",
          paddingX: 2,
        }}
      >
        content
      </Card>
    </Box>
  );
};
