const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    birthDate: Date,  // ???
    phone: Number,
    following: Number,
    followers: Number,
    followersList: [{ userID: mongoose.Schema.Types.ObjectId }],
    followingList: [{ userID: mongoose.Schema.Types.ObjectId }],
    verified: Boolean,
    profilePicture: String,
    bio: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

const userDb = mongoose.connection.useDb("users");
const User = userDb.model("User", userSchema);
module.exports = User;