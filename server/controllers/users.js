import User from "../models/User.js";
import Post from "../models/Post.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const posts = await Post.find({
      userId: id,
    });

    let likeCount = 0;

    posts.map((post) => {
      likeCount += post.likes.size;
    });

    const data = {
      user,
      likeCount,
    };

    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { _id } = req.params;

    const user = await User.findById(_id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { _id, friendId } = req.params;
    const user = await User.findById(_id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== _id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(_id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const friendFriends = await Promise.all(
      friend.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    const formattedFriendFriends = friendFriends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json({ formattedFriends, formattedFriendFriends });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      location,
      occupation,
      picturePath,
      email,
      oldPassword,
      newPassword,
    } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);

    if (email !== user.email) {
      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        return res.status(400).json({ message: "Email must be unique" });
      }
    }

    if (newPassword) {
      const validPassword = bcrypt.compareSync(oldPassword, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: "Passwords must match" });
      }
    }

    if (newPassword) {
      const saltRounds = 7;
      const salt = bcrypt.genSaltSync(saltRounds);
      newPassword = bcrypt.hashSync(newPassword, salt);
    } else {
      newPassword = user.password;
    }

    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        location,
        occupation,
        picturePath: picturePath,
        email,
        password: newPassword,
      },
      { new: true }
    );

    const updatePosts = await Post.updateMany(
      { userId: id },
      {
        firstName,
        lastName,
        userPicturePath: picturePath,
      },
      { new: true }
    );

    const allPosts = await Post.find().sort({ createdAt: -1 });

    return res.status(200).json({ updateUser, allPosts });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const updateViewedUser = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      throw new Error("User does not exist");
    }

    const updateUser = await User.findByIdAndUpdate(
      id,
      { viewedProfile: user.viewedProfile + 1 },
      { new: true }
    );

    return res.status(200).json(updateUser);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getAllFriends = async (req, res) => {
  try {
    const user = await User.find();

    const formattedFriends = user.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
