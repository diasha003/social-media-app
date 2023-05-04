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

    //console.log(posts);
    let likeCount = 0;

    posts.map((post) => {
      //console.log(post.likes.size);
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
    //console.log(req.params);
    const user = await User.findById(_id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    //console.log(formattedFriends);

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    //console.log(req.params);
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

export const updateUser = async (req, res) => {
  try {
    console.log(req.body);

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

    return res.status(200).json(updateUser);
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

    console.log(user);

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
