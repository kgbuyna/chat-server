import { Message } from "../schema/messageSchema";
import IMessage from "../type/messageType";

const saveMessageService = async (message: IMessage) => {
    const msg = new Message(message);
    return await msg.save();
}

export default saveMessageService;