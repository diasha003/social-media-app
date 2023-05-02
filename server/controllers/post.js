import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find().sort({ createdAt: -1 });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const post = await Post.find().sort({ createdAt: -1 });

    res.status(200).json({ post: post });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId: userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    //console.log(req.params, req.body);
    const { _id } = req.params;
    const { loggedInUserId } = req.body;
    const post = await Post.findById(_id);

    // console.log( req.body);

    const isLikes = post.likes.get(loggedInUserId);

    if (isLikes) {
      post.likes.delete(loggedInUserId);
    } else {
      post.likes.set(loggedInUserId, true);
    }

    const updatePost = await Post.findByIdAndUpdate(
      _id,
      { likes: post.likes },
      { new: true }
    );
    console.log(updatePost);
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
