import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema({
  message_from: String,
  message_to: String,
  content: String,
});

console.log("messageSchema added" );

export const Message = mongoose.model("Message", messageSchema);