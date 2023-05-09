import { useDispatch, useSelector } from "react-redux";
import { Friend } from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  setAllFilteredFriends,
  setAllFriends,
  setFriendFriends,
  setFriends,
} from "../../store/authSlice";
import { Box, IconButton, InputBase, List, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useParams } from "react-router-dom";

export const FriendListWidget = ({ user, isProfile = false }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const { userId } = useParams();
  const friends = useSelector((state) =>
    isProfile ? state.friendFriends : state.userFriends
  );
  const allFilteredFriends = useSelector((state) => state.allFilterFriends);
  const [search, setSearch] = useState("");

  //console.log("user ", isProfile);

  const handleChange = (e) => {
    if (e.target.value) {
      setSearch(e.target.value);
      dispatch(setAllFilteredFriends(search));
    } else {
      setSearch("");
      dispatch(setAllFilteredFriends());
    }
  };

  const getFriends = async () => {
    const responce = await axios.get(
      `http://localhost:3001/users/${isProfile ? userId : user._id}/friends`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const allFriends = responce.data;

    isProfile
      ? dispatch(setFriendFriends({ friends: allFriends }))
      : dispatch(setFriends({ friends: allFriends }));
  };

  const getAllFriends = async () => {
    const responce = await axios.get(`http://localhost:3001/users/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const allFriends = responce.data;
    dispatch(setAllFriends(allFriends));
  };

  useEffect(() => {
    getFriends();
    getAllFriends();
  }, [user]);

  return (
    <WidgetWrapper>
      <Typography
        variant="h6"
        fontWeight="700"
        sx={{ textAlign: "center", mb: "0.2rem" }}
      >
        Friend List
      </Typography>

      <Box
        sx={{
          border: "1px solid gray",
          mb: "1.5rem",
        }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1, color: "#000000" }}
          placeholder="Search friend..."
          inputProps={{ "aria-label": "search google maps" }}
          onChange={handleChange}
          value={search}
        />
        <IconButton
          type="button"
          sx={{ color: "#000000", ml: "27px" }}
          aria-label="search"
          onClick={() => {
            setSearch("");
            dispatch(setAllFilteredFriends());
          }}
        >
          <CloseOutlinedIcon></CloseOutlinedIcon>
        </IconButton>
      </Box>

      <Box sx={{ height: "calc(100vh - 390px)" }} className="scroll">
        <Box sx={{ height: "100%" }}>
          <List sx={{ padding: 0, maxHeight: "100%", overflowY: "auto" }}>
            {allFilteredFriends.length !== 0
              ? allFilteredFriends.map((friend) => (
                  <>
                    <Friend
                      key={friend._id}
                      friendId={friend._id}
                      userId={user._id}
                      name={`${friend.firstName} ${friend.lastName}`}
                      userPicturePath={friend.picturePath}
                      occupation={friend.occupation}
                    ></Friend>
                  </>
                ))
              : friends &&
                friends.map((friend) => (
                  <>
                    <Friend
                      key={friend._id}
                      friendId={friend._id}
                      userId={user._id}
                      name={`${friend.firstName} ${friend.lastName}`}
                      userPicturePath={friend.picturePath}
                      occupation={friend.occupation}
                    ></Friend>
                  </>
                ))}
          </List>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};
