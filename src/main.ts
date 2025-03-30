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

  io.use((socket, next) => {
    console.log(socket.handshake);
    const token = socket.handshake.auth?.token || socket.handshake.headers?.token;
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
    socket.join(userId!);

    socket.on("message", async (msg:IMessage) => {
      try {
        // @ts-ignore
        const userId = socket.userId;
        const recipientId = msg.message_to;
                
        // sending message to sender as sender can have more than one device or tab opened in browser 
        socket.to(userId!).to(recipientId).emit("message", {
          content: msg.content,
          message_from: userId,
          to: recipientId,
        });

        const message = new Message({...msg, message_from: userId});
        await message.save()

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
