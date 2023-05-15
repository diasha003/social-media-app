import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

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
    const posts = await Post.find({ userId: userId }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { _id } = req.params;
    const { loggedInUserId } = req.body;
    const post = await Post.findById(_id);

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

    res.status(200).json(updatePost);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { _id } = req.params;

    //console.log(req.body);
    const updatePost = await Post.findByIdAndUpdate(
      _id,
      {
        picturePath: req.body.picturePath,
        description: req.body.description,
        editing: true,
      },
      { new: true }
    );

    return res.status(200).json(updatePost);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { _id } = req.params;

    const findComments = await Comment.find({ post: _id });
    const deletePostResult = await Post.deleteOne({ _id: _id });

    //console.log(findComments);

    await Comment.deleteMany({
      _id: {
        $in: findComments.map((comment) => comment._id),
      },
    });

    const allPosts = await Post.find().sort({ createdAt: -1 });

    return res.status(200).json(allPosts);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
