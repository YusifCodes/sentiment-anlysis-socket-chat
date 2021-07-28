const sentiment = require("./emoji-ai")
const express = require("express");
const app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
app.use(express.static("dist"));
app.get("/", function (req, res) {
  res.sendFile("C:/Users/User/Desktop/Coding/Mood chat/dist/index.html");
});

// Define users aray for convenience
users = [];

// When we receive a connection we emit a userSet if the name is unique, if not userExists
io.on("connection", function (socket) {
  console.log("A user connected");
  console.log(users);

  socket.on("setUsername", function (data) {
    if (users.indexOf(data) == -1) {
      users.push(data);
      socket.emit("userSet", data);
    } else {
      socket.emit(
        "userExists",
        data + " username is taken! Try some other username."
      );
    }
  });

  //When there is a msg, we use our analyzer function, and assign the string and emoji
  socket.on("msg", function (data) {
    score = sentiment.analyze(data.message)
    emoji = score == 1 ? "😊" : score == 0 ? "😐" : "🙁";

    // Redefine the data object
    data = { message: data.message, username: data.username, emoji: emoji }
    //Emit it
    io.sockets.emit("newmsg", data);
  });
});

//Listen on this address
http.listen(3000, function () {
  console.log("listening on http://localhost:3000");
});


// VOILA, HAVE FUN !!!

//Yusif Malikov 7/28/2021