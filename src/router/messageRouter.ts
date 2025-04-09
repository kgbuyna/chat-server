import { Router } from "express";
import { getMessages } from "../controller/messageController";

const messageRouter = Router({ mergeParams: true });

messageRouter.get('/', getMessages);

export default messageRouter
