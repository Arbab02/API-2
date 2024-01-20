const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.get('/', (req, res) => {
  res.send('Hello World Storage!')
})
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle newUpload event
  socket.on("newUpload", (url) => {
    // Broadcast the newUpload event to all connected clients
    io.emit("newUpload", url);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
