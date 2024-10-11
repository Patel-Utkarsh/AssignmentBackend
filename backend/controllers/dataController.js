const post = require("../models/post");
const userModel = require("../models/userModel");

exports.fetchFeed = async (req, res) => {
  const { user_id } = req;

  try {
    const user = await userModel.findById(user_id).populate("friends");

    const friendsID = user.friends.map((friend) => friend._id);

    const posts = await post
      .find()
      .populate("author", "name")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "name",
        },
      })
      .exec();

    const postsWithFilteredComments = posts.map((post) => {
      const totalComments = post.comments.length;

      return {
        ...post.toObject(),
        totalComments,
      };
    });

    res.status(200).json({
      posts: postsWithFilteredComments,
      user_id,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.fetchUserDetails = async (req, res) => {
  const { user_id } = req;
  const { another_user_id } = req?.body;

  const id = another_user_id || user_id;

  try {
    let userData = await userModel.findById(id).populate("posts");
    userData.password = null;
    res.status(200).json({
      success: true,
      message: "data fetched successfully",
      userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error in fetching data",
    });
  }
};
