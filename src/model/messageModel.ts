import { DataTypes, Model, Optional } from "sequelize";

import { MessageAttributes } from "../type/messageType";
import { sequelizer } from "../db/connect";


type MessageCreationAttributes = Optional<MessageAttributes, "id">;

// Define the Message model
export default class Messages
  extends Model<MessageAttributes, MessageCreationAttributes> {}

Messages.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1
      },
      message_from: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      message_to: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: sequelizer,
      modelName: "Messages", // Explicit table name (optional)
      timestamps: true, // Automatically add createdAt and updatedAt fields
    },
  );
  