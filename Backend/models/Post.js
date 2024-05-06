const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    content: String,
    picturesList: [String],
    likes: Number,
    postTime: Date,
    usersLiked: [{ userID: mongoose.Schema.Types.ObjectId }],
    commentNum: Number,
    comments: [{ username: String, content: String }],
    repost: Number,
    isEdited: Boolean
});

const postDb = mongoose.connection.useDb("posts");
const Post = postDb.model("Post", postSchema);
module.exports = Post;