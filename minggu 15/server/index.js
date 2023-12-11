const express = require("express");
const app = express();
const PORT = 4000;

const http = require("http").Server(app);
const cors = require("cors");
app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = []; // Initialize an empty array to store users

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  // Handling new user event
  socket.on("newUser", (data) => {
    users.push({ socketID: socket.id, username: data.username }); // Assuming data has a 'username' property
    socketIO.emit("newUserResponse", users);
  });

  // Handling message event
  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });

  // Handling disconnect event
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");

    // Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);

    // Sends the updated list of users to the client
    socketIO.emit("newUserResponse", users);
  });
});

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});