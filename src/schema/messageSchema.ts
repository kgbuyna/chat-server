import mongoose, { Schema } from "mongoose";
import IMessage from "../type/messageType";


const messageSchema = new Schema<IMessage>({
  message_from: String,
  message_to: String,
  content: String,
});


export const Message = mongoose.model("Message", messageSchema);