import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    //const postId = req.params.id;
    //const { content, parentId, userId } = req.body;

    const parentId = "64556707faffb61c9b436fd6";
    const postId = "6454b2e80290fe0200846bb7";
    const userId = "645402a4e76a0c8ac2942a45";
    const content = "wedfgh dffffffffffffffffffffffff dftghbffg gfhdg";

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    const comment = await Comment.create({
      content,
      parent: parentId,
      post: postId,
      commenter: userId,
    });

    post.commentCount += 1;
    await post.save();

    await Comment.populate(comment, { path: "commenter", select: "-password" });

    res.status(200).json(comment);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getPostComments = async (req, res) => {
  try {
    const postId = req.params._id;
    const comments = await Comment.find({ post: postId })
      .populate("commenter", "-password")
      .sort({
        createdAt: -1,
      });

    let rootComments = [];
    let commentParents = [];

    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      commentParents[comment._id] = comment;
    }

    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      if (comment.parent) {
        let commentParent = commentParents[comment.parent];
        commentParent.children = [...commentParent.children, comment];
        //console.log(rootComments);
      } else {
        rootComments = [...rootComments, comment];
      }
    }

    res.status(200).json({ comments: rootComments });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw new Error("Comment not found");
    }

    const post = await Post.findById(comment.post);
    await Comment.deleteOne({ _id: commentId });
    post.commentCount = (await Comment.find({ post: post._id })).length;
    await post.save();

    //console.log(comment);

    res.status(200).json(comment);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
