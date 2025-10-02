// A socket.io server that can send messages to a specific user and show the user is online or offline
const jwt = require("jsonwebtoken");

const users = {};
let ioInstance = null;

const messageSocket = async (io) => {
  ioInstance = io;
  try {
    io.on("connection", (socket) => {
      console.log("A user connected");
      const userId = socket.handshake.query.userId;

      if (userId) {
        users[userId] = socket.id;
        io.emit("onlineUsers", Object.keys(users));
      }

      socket.on("sendMessage", (message) => {
        const receiverId = message.receiverId;
        const senderId = message.senderId;

        if (receiverId && senderId) {
          const receiverSocketId = users[receiverId];
          if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", message);
          }
        }
      });

      socket.on("disconnect", () => {
        delete users[userId];
        io.emit("onlineUsers", Object.keys(users));
        console.log("A user disconnected");
      });
    });
  } catch (error) {
    return console.log(error);
  }
};

module.exports = {
  users,
  messageSocket,
  ioInstance,
};
