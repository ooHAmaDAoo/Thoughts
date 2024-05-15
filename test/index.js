const express = require("express");
const serverless = require("serverless-http");
const app = express();

app.use(express.json());

app.get("/hello", (req, res) => {
    res.send("Working");
});


module.exports.handler = serverless(app);



