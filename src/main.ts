import express from "express";
import http from "http";
import { Server } from "socket.io";
import { assertDatabaseConnectionOk } from "./db/connect";
import dotenv from "dotenv";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 8000;

dotenv.config({
  path: `${__dirname}/../.env`
});

app.use(express.json());

assertDatabaseConnectionOk();

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (msg) => {
    console.log("Message received: ", msg);
    socket.emit("random", msg + " " + Math.random());
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});


server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
