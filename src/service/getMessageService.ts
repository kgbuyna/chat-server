import { Message } from "../schema/messageSchema";

const getMessagesService = async (userId:string, limit: string, offset:string) => {
    const messages = Message.find({
        $or: [
            { message_from: userId },
            { message_to: userId },
        ],
    })
      .sort({ createdAt: -1 })
      .skip(Number(offset))
      .limit(Number(limit));
      
    return messages;
}

export default getMessagesService;