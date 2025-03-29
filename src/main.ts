import express from "express";
import http from "http";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";


import { assertDatabaseConnectionOk, assertRedisConnectionOk } from "./db/connect";
import { Message } from "./schema/messageSchema";
import IMessage from "./type/messageType";


const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 8000;

dotenv.config({
  path: `${__dirname}/.env`
});
 
(async()=> {
  await assertDatabaseConnectionOk();
  const redisClient = await assertRedisConnectionOk()

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
    // @ts-ignore
    const userId = socket.userId;

    if (redisClient) {
      redisClient.sAdd(`user:${userId}:sockets`, socket.id);
    }

    socket.on("message", async (msg:IMessage) => {
      try {
        // @ts-ignore
        const userId = socket.userId;
        const recipientId = msg.message_to
        
        const socketIds = await redisClient?.sMembers(`user:${recipientId}:sockets`) || []

        socketIds.forEach(socketId => {
          io.to(socketId).emit("message", msg.content);
        }); 

        const message = new Message({...msg, message_from: userId});
        await message.save()

        console.log("Message received: ", msg);

      } catch (err) {
        console.log(err);
      }
    });
  
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
})();


server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
