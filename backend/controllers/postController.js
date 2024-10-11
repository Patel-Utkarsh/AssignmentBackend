const post = require("../models/post");
const userModel = require("../models/userModel");
const commentSchema = require("../models/comment");

exports.createPost = async (req, res) => {
  const { postData } = req.body;
  const { user_id } = req;

  try {
    const newPost = await post.create({ title: postData, author: user_id });

    await userModel.findByIdAndUpdate(user_id, {
      $push: { posts: newPost._id },
    });
    res.status(200).json({
      success: true,
      message: "post created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.likePost = async (req, res) => {
  const { post_id } = req.body;
  const { user_id } = req;

  try {
    const Post = await post.findByIdAndUpdate(post_id, {
      $push: { likes: user_id },
    });
    await userModel.findByIdAndUpdate(user_id, { $push: { likes: Post._id } });

    res.status(200).json({
      success: true,
      message: "post liked successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.commentPost = async (req, res) => {
  const { user_id } = req;
  const { comment, post_id } = req.body;

  try {
    const com = await commentSchema.create({
      comment: comment,
      author: user_id,
    });
     await post.findByIdAndUpdate(post_id, {
      $push: { comments: com._id },
    });
    await userModel.findByIdAndUpdate(user_id, {
      $push: { comments: com._id },
    });

    res.status(200).json({
      success: true,
      message: "commented successfully",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};
