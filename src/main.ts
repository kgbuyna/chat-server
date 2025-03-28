import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { assertDatabaseConnectionOk } from "./db/connect";
import jwt from "jsonwebtoken";


const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 8000;

dotenv.config({
  path: `${__dirname}/.env`
});
 
(async()=> {
  await assertDatabaseConnectionOk();

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET!) as { id: string; username: string };
      // @ts-ignore
      socket.userId = decoded.id 
      next();
    } catch (err) {
      next(new Error('Authentication error: Invalid token'));
    }
  });
  
  io.on("connection", (socket) => {
    console.log("A user connected");
  
    socket.on("message", (msg) => {
      // !TODO save message to database
      // !TODO send message to the recipient
  
      console.log("Message received: ", msg);
      socket.emit("random", msg + " " + Math.random());
    });
  
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

})();



server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
