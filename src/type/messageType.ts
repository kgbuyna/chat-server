import { UUID } from "crypto";
import { Optional } from "sequelize";

export interface MessageAttributes {
    id: UUID; 
    message_from: UUID;
    message_to: UUID; 
    content: string; 
    createdAt?: Date;
  }
  
  // Define optional attributes for creation
export type MessageCreationAttributes = Optional<MessageAttributes, "id">;
