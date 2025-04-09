import { RequestHandler } from "express";
import getMessagesService from "../service/getMessageService";

export const getMessages: RequestHandler = async (
    req,
    res,
    next,
  ) => {
    try {
        const {
            offset, 
            limit,
        } = req.query; 
        const userId = req.headers["x-user-id"] as string;
        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
        }
        
        const messages = await getMessagesService(userId, limit as string, offset as string);
        res.json(messages);

    } catch(error) {
      next(error)
    }
  };