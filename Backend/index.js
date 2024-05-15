require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
// const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");

mongoose.connect("mongodb://16.170.240.173:27017/users");
const db = mongoose.connection;
app.use(cors());

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("conneted to database");
})

app.use(express.json());
app.get("/test", (req, res) => {
    res.send("Working");
    res.end();
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null)
        return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err)
            return res.sendStatus(403);

        req.user = user;
        next();
    });
}

// app.use(express.json({ limit: "50mb" }));

// app.get("/user/:username", async (req, res) => {
//     const { username } = req.params;
//     res.status(200).json({ status: true, message: `${username} got data` });
// });

app.get("/user", authenticateToken, async (req, res) => {
    const { username } = req.user;
    const user = await User.findOne({ username });
    if (!user)
        return res.status(401).json({ status: false, message: `${username} not found` });
    // console.log(user.email);
    const data = {
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        firstname: user.firstname,
        lastname: user.lastname,
        profilePic: user.profilePicture,
        following: user.following,
        followers: user.followers,
        verified: user.verified6
    }
    // console.log("data email: ", data.email);

    // return res.status(200).json({ status: true, message: `${username} got data` });
    return res.status(200).json(data);
});

app.post("/signup", async (req, res) => {
    //fix later date not working
    // console.log("Request");
    const { username, name, password, firstname, lastname, birthDate, email, phone } = req.body;
    if (!username || !password || !email)
        // return res.status(401).json({status: false, message: "missed data"});
        return res.sendStatus(400);

    // console.log("birthdate: ", birthdate);
    // const year = birthdate.getFullYear();
    // const month = birthdate.getMonth();
    // const day = 
    // const bDate = new Date(`${birthdate}`);



    // 
    // const hashedPassword = await bcrypt.hash(password, 10);
    // 

    const newUser = new User({
        username,
        name: name ? name : "User",
        password,
        email,
        firstname,
        lastname,
        birthDate,
        phone: phone ? phone : 0,
        following: 0,
        followers: 0,
        verified: false,
        profilePicture: "data:image/png;base64,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",
        bio: "Hello, I use Fekr",
        posts: []
    });

    
    await newUser.save();
    res.status(201).json({ success: true, message: "New user has been created successfully" });
})

app.post("/login", async (req, res) => {
    //////////////////////
    //propebly there is a error User.find return list of users [] so may need access using user[0]
    ////////////////////////
    // console.log("here");
    const { username, password } = req.body;
    // console.log(req.body);
    if (!username || !password)
        return res.status(401).json({ status: false, message: "missed data" });

    const user = await User.findOne({ username });

    if (!user)
        return res.status(401).json({ status: false, message: "user not found" });

    // const hashedPassword = await bcrypt.hash(password, 10);

    // if (!hashedPassword)
    //     return res.status(400).json({ status: false, message: "error hashing password" });

    // (user.password !== hashedPassword)

    // 
    // const match = await bcrypt.compare(password, user.password);
    const match = password === user.password;
    // 

    if (!match)
        return res.status(400).json({ status: false, message: "wrong password" });

    const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN);
    // send user detailes later
    return res.status(200).json({ status: true, accessToken });
})

app.put("/passwordUpdate", authenticateToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const { username } = req.user;
    if (!username || !newPassword || !currentPassword)
        return res.status(400).json({ status: false, message: "missed data" });
    const user = await User.findOne({ username });

    if (!user)
        return res.status(400).json({ status: false, message: "user not found" });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
        // console.log("not match")
        return res.status(400).json({ status: false, message: "wrong password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (!hashedPassword)
        return res.status(400).json({ status: false, message: "faild to hash password" });


    // console.log(user.password);
    user.password = hashedPassword;
    await user.save();
    // console.log(user.password);

    return res.status(200).json({ success: true, message: "password has been updated successfully" })
})

app.put("/editProfile", authenticateToken, async (req, res) => {
    // console.log("here");
    const { bio, email, phone, profilePicture, date, firstname, lastname } = req.body;
    if (!bio && !email && !phone && !profilePicture && !date && !firstname && !lastname)
        return res.status(400).json({ status: false, message: "missed data" });

    const { username } = req.user;
    // console.log(username);
    const user = await User.findOne({ username });

    if (!user)
        return res.status(400).json({ status: false, message: "user not found" });

    // console.log(user.bio)
    if (bio)
        user.bio = bio;

    if (email)
        user.email = email;

    if (phone)
        user.phone = phone;

    if (profilePicture) {
        // console.log("profile pic: ", profilePicture);
        user.profilePicture = profilePicture;
    }

    if (date)
        user.date = date;

    if (firstname)
        user.firstname = firstname;

    if (lastname)
        user.lastname = lastname;

    await user.save();
    return res.status(200).json({ status: true, message: "profile data has been updated successfully" })
})

app.post("/admin/createUser", async (req, res) => {
    const { username, name, password, firstname, lastname, date, email, phone } = req.body;
    if (!username || !password || !email)
        return res.sendStatus(400);

    const hashedPassword = await bcrypt.hash(password, 10);
    // const bdate = new Date(date.valueOf());
    const bdate = new Date().getTime();
    const newUser = new User({
        username,
        name,
        password: hashedPassword,
        email,
        firstname,
        lastname,
        date: bdate,
        phone: phone ? phone : 0,
        following: 71,
        followers: 1601100,
        verified: true,
        profilePicture: "data:image/png;base64,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",
        bio: "Hello, I use Fekr",
        posts: []
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "New user has been created successfully" });
})

app.get("/user/profile", authenticateToken, async (req, res) => {
    // app.get("/user/profile", async (req, res) => {
    // const username = "abc";
    const { username } = req.user;
    if (!username) {
        return res.status(400).json({ status: false, message: "missed data" });
    }
    const user = await User.findOne({ username });
    const postsIDs = user.posts;
    // console.log(postsIDs);

    const length = postsIDs.length;
    // console.log("postsIDs length: ", length);

    let post;
    const postList = [];

    for (let i = 0; i < length; i++) {
        post = await Post.findById(postsIDs[i]);
        postList.push(post);
        // console.log(post);
    }
    // console.log("postList: ", postList);
    const srortedPostList = [...postList].reverse();

    const data = {
        username,
        name: user.name,
        bio: user.bio,
        profilePicture: user.profilePicture,
        following: user.following,
        followers: user.followers,
        verified: user.verified,
        postsList: srortedPostList
    }

    return res.status(200).json(data);
})

app.get("/whotofollow", authenticateToken, async (req, res) => {
    const user = await User.findOne({ username: req.user.username });
    const dontFollow = user.followingList.map(list => list.userID);
    // console.log("here");
    User.aggregate([
        { $match: { _id: { $nin: [user._id, ...dontFollow] } } }, // Exclude users in your followingList
        { $sample: { size: 4 } }
    ]).exec()
        .then((randomUsers) => {
            // console.log(randomUsers.length);
            return res.status(200).json({ whoToFollow: randomUsers });
        })
        .catch(err => {
            return res.status(401).json({ success: false, message: "Something went wrong" });
        })

});

// edit timeLine before tomorrow
app.get("/timeline", authenticateToken, async (req, res) => {
    const { username } = req.user;
    // const username = "test";
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ status: false, message: "User not found" });
    }


    const followingList = user.followingList.map(entry => entry.userID);
    const allPosts = await Post.find({});
    const data = await Promise.all(user.followingList.map(async (u) => {
        const uuser = await User.findById(u.userID);
        userPosts = allPosts.filter(ppost => uuser.posts.includes(ppost._id));
        return { ...uuser._doc, posts: userPosts };

    }))
    // const posts = await Post.find({ _id: { $in: followingList } })
    // return res.status(200).json(posts);
    return res.status(200).json({ data });
})

app.post("/postCreate", authenticateToken, async (req, res) => {
    //username    v v v v v v 
    const { content, picturesList } = req.body;
    const { username } = req.user;
    // console.log(username);

    if (!content && !picturesList)
        return res.sendStatus(403);

    const user = await User.findOne({ username });
    if (!user)
        return res.sendStatus(403);


    const newPost = new Post({
        content,
        picturesList,
        likes: 0,
        postTime: new Date,
        commentNum: 0,
        comments: [],
        repost: 0,
        isEdited: false
    });

    if (!newPost)
        return res.status(400).json({ status: false, message: "post failed" })

    await newPost.save();
    user.posts = [...user.posts, newPost.id];
    await user.save();
    return res.status(200).json({ status: true, message: "post has been shared successfully" });
});

app.get("/post/:postID", authenticateToken, async (req, res) => {
    const id = req.params.postID;
    if (!id)
        return res.status(401).json({ status: false, message: "missed data" });

    const user = await User.findOne({ "posts": id }, { "username": 1, "_id": 0, "name": 1, "profilePicture": 1, "verified": 1 })
    if (!user)
        return res.status(401).json({ status: false, message: "user not found" });

    const post = await Post.findById(id);
    if (!post)
        return res.status(401).json({ status: false, message: "post not found" });

    const data = {
        name: user.name,
        username: user.username,
        profilePicture: user.profilePicture,
        verified: user.verified,
        post
    }

    console.log(data);

    return res.status(200).json(data);
})

app.put("/postUpdate", authenticateToken, async (req, res) => {
    // sequrity disaster any logged in user can write in url:
    // /post/edit/(post id), can edit the post even he is not the one who post!!
    console.log(req.body)
    const { id, content, picture } = req.body;
    const { username } = req.user;
    if (!content && !picture)
        return res.status(401).json({ status: false, message: "missing data" });

    const post = await Post.findOneAndUpdate({ _id: id }, { content, picture });
    return res.status(200).json({ success: true, message: "The post has been updated successfully" });

    // const { username } = req.body;
    // const user = await User.find({ username });
    // return res.json(user);
})

app.delete("/postDelete", authenticateToken, async (req, res) => {
    // console.log("here");
    const { id } = req.body;
    const { username } = req.user;
    // const id = "6587b442fd65f562ee2983ff";
    // const username = "abc";
    const post = await Post.findById({ _id: id });
    // const deletedPost = await Post.findOneAndDelete({ _id: id });
    // if (!deletedPost || !username)
    //     return res.status(400).json({ success: false, message: "delete post failed" });

    const user = await User.findOne({ username });
    if (!user)
        return res.status(400).json({ success: false, message: "user not found" });

    // console.log(post);
    // console.log("user.post: ", user.posts);

    // let postsList;
    const updatedPostsList = user.posts.filter((post_id) => !post_id.equals(id));
    user.posts = updatedPostsList;
    await user.save();
    // console.log("filtered: ", postsList);
    // console.log("user.post: ", user.posts);


    // romve post id from user posts list 


    return res.status(200).json({ success: true, message: "post has been removed successfully" });
});

app.put("/postComment", async (req, res) => {
    const { postId, username, content } = req.body;
    if (!postId || !username || !content)
        return res.status(400).json({ status: false, message: "missed data" });
    // console.log(postId);
    // const commentId = 111;// set a uniqe id
    const post = await Post.findById(postId);
    if (!post)
        return res.status(400).json({ status: false, message: "faild to find post" })


    const commentsList = post.comments;
    const comment = { username, content };
    const updatedCommentsList = [...commentsList, comment];
    // await post.updateOne({ comments: [{ username, content }] });
    post.comments = updatedCommentsList;
    await post.save();
    return res.status(200).json({ status: true, message: "comment has been posted successfully" });
})

app.put("/commentUpdate", async (req, res) => {
    const { postId, commentId, content } = req.body;
    if (!postId || !content || !commentId)
        return res.status(400).json({ status: false, message: "missed data" });

    const post = await Post.findById(postId);
    if (!post)
        return res.status(400).json({ status: false, message: "faild to find the post" });

    const commentsList = await post.comments;
    if (!commentsList)
        return res.status(400).json({ status: false, message: "failed to find the comments list" });

    const comment = commentsList.find((comment) => comment._id.equals(commentId));

    if (!comment)
        return res.status(400).json({ status: false, message: "failed to find the comment" });

    comment.content = content;

    await post.save();
    return res.status(200).json({ status: true, message: "comment has been updated successfully" })
});

app.put("/commentDelete", async (req, res) => {
    const { postId, commentId } = req.body;
    if (!postId || !commentId)
        return res.status(400).json({ status: false, message: "missed data" });

    const post = await Post.findById(postId);
    if (!post)
        return res.status(400).json({ status: false, message: "faild to find the post" });

    const commentsList = await post.comments;
    if (!commentsList)
        return res.status(400).json({ status: false, message: "failed to find the comments list" });


    const updatedCommentsList = commentsList.filter(comment => comment._id.toString() !== commentId);

    if (!updatedCommentsList)
        return res.status(400).json({ status: false, message: "failed to delete the comment" });

    post.comments = updatedCommentsList;
    await post.save();
    return res.status(200).json({ status: true, message: "comment has been removed successfully" })

})

// app.post("/bio", async (req, res) => {
//     const { bio } = req.body;
//     if (!bio)
//         return res.sendStatus(403);

//     await User.updateOne({ username: "dsfasdf" }, { bio: bio });
//     return res.status(201).json({ success: true, message: "bio has been updated successfully" });

// })

app.delete("/accountDelete", async (req, res) => {
    const { username } = req.body;
    const deletedUser = await User.findOneAndDelete({ username: username });
    if (!deletedUser)
        return res.status(401).json({ success: false, message: "delete user failed" });

    return res.status(201).json({ success: true, message: "user has been removed successfully" });
})

// app.get("/search", async (req, res) => {
app.post("/search", async (req, res) => {
    const { key } = req.body;
    // console.log(key);
    if (!key)
        return res.status(400).json({ status: false, message: "missed key" });


    const searchTerm = new RegExp(key, 'i');
    const matchList = await User.find({
        $or: [
            { name: { $regex: searchTerm } },
            { username: { $regex: searchTerm } }
        ]
    });

    return res.status(200).json({ matchList });
})


app.get("/userpage/:userID", authenticateToken, async (req, res) => {

    const userID_fromParam = req.params.userID;
    // const { userID } = req.params;
    const userID = req.params.userID
    // const userID = "6587b37dfd65f562ee2983fb";
    // const userID = "6590e1b8bca609f919d23bbe";
    // const userID = "6587b37dfd65f562ee2983fb";

    const { username } = req.user;
    console.log(req.user);
    console.log("userID", userID);
    console.log(req.params);

    if (!username || !userID) {
        // console.log("here");
        return res.status(400).json({ status: false, message: "missed data" });
    }

    const user = await User.findOne({ username });
    const userToReturn = await User.findById({ _id: userID });

    if (!user || !userToReturn)
        return res.status(400).json({ status: false, message: "user not found" });
    // console.log("22222");

    // console.log(userToReturn);

    // const isFollowed = user.followingList.includes(userID);

    let followingListLength = user.followingList.length;
    // console.log(user.followingList);
    // console.log(followingListLength);

    let isFollowed = false;
    for (i = 0; i < followingListLength; i++) {
        if (user.followingList[i].userID.equals(userID)) {
            // console.log(user.followingList[i]);
            isFollowed = true;
            break;
        }
    }
    // console.log("is followed: ", isFollowed);

    const postsIDs = userToReturn.posts;
    // console.log(postsIDs);

    const length = postsIDs.length;
    // console.log("postsIDs length: ", length);

    let post;
    const postList = [];

    for (let i = 0; i < length; i++) {
        post = await Post.findById(postsIDs[i]);
        postList.push(post);
        // console.log(post);
    }
    // console.log("postList: ", postList);
    const srortedPostList = [...postList].reverse();

    const data = {
        id: userToReturn._id,
        username: userToReturn.username,
        name: userToReturn.name,
        bio: userToReturn.bio,
        profilePicture: userToReturn.profilePicture,
        following: userToReturn.following,
        followers: userToReturn.followers,
        verified: userToReturn.verified,
        postsList: srortedPostList,
        isFollowed
    }

    return res.status(200).json(data);
})


app.put("/follow", authenticateToken, async (req, res) => {
    const { username } = req.user;
    const { usernameToFollow } = req.body;
    const userToFollow = await User.findOne({ username: usernameToFollow });
    const user = await User.findOne({ username });

    // console.log("user", user);
    // console.log("user to follow", userToFollow);

    if (!user || !userToFollow)
        return res.status(400).json({ status: false, message: "user not found" });


    // console.log(user.followingList.length);

    // return res.status(400).json({ status: false, message: "user not found" });
    const IDtoFollow = userToFollow._id.toString();

    let length = user.followingList.length;
    let isFollowed = false;

    for (i = 0; i < length; i++) {
        if (user.followingList[i].userID.equals(IDtoFollow)) {
            isFollowed = true;
            break;
        }
    }

    if (isFollowed)
        return res.status(400).json({ status: false, message: "user is already followed" });

    // console.log(IDtoFollow);
    const updatedList = [...user.followingList, { userID: IDtoFollow }];

    user.followingList = updatedList;
    user.following++;
    userToFollow.followers++;
    await user.save();
    await userToFollow.save();

    return res.status(200).json({ status: true, message: "user has been followed successfully" });
})

app.put("/unfollow", authenticateToken, async (req, res) => {

    const { username } = req.user;
    const { usernameToUnFollow } = req.body;
    const user = await User.findOne({ username });
    const userToUnFollow = await User.findOne({ username: usernameToUnFollow });

    if (!user || !userToUnFollow)
        return res.status(400).json({ status: false, message: "user not found" });

    const IDtoUnFollow = userToUnFollow._id.toString();

    const found = user.followingList.find(user => user.userID.toString() === IDtoUnFollow);
    if (!found)
        return res.status(400).json({ status: false, message: "user not found" });

    const list = user.followingList.filter(user => user.userID.toString() !== IDtoUnFollow);

    user.followingList = list;
    user.following--;
    userToUnFollow.followers--;
    await user.save();
    await userToUnFollow.save();

    return res.status(200).json({ status: true, message: "user has been followed successfully" });

    // let isFollowed = false;

    // for (i = 0; i < length; i++) {
    //     if (user.followingList[i].userID.equals(IDtoUnFollow)) {
    //         isFollowed = true;
    //         break;
    //     }
    // }

    // if (!isFollowed)
    //     return res.status(400).json({ status: false, message: "user is not followed" });


    // const updatedList = [...user.followingList, { userID: IDtoUnFollow }];
    // user.followingList = updatedList;
    //=========================================
    //=========================================
    //=========================================

    // const { userID, idToUnfollow } = req.body;
    // if (!idToUnfollow || !userID)
    // return res.status(400).json({ status: false, message: "missed data" });

    // const user = await User.findById(userID);
    // if (!user)
    // return res.status(400).json({ status: false, message: "user not found" });


    // const found = user.followingList.find(user => user.userID.toString() === idToUnfollow);
    // if (!found)
    // return res.status(400).json({ status: false, message: "user not found" });

    // const list = user.followingList.filter(user => user.userID.toString() !== idToUnfollow);
    // user.followingList = list;

    // await user.save();
    // return res.status(200).json({ status: true, message: "user has been unfollowed successfully" });
})

// app.use("*", (req, res) => {
//     res.sendStatus(404);
// })


// app.listen(PORT, () => {
//     console.log("Listening on port", PORT);
// });

module.exports.handler = serverless(app);