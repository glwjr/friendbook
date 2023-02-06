const conn = require('./conn');

const { TEXT, UUID, UUIDV4 } = conn.Sequelize;

const Message = conn.define(
  'message',
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    message: {
      type: TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    senderId: {
      type: UUID,
      allowNull: false,
    },
    recipientId: {
      type: UUID,
      allowNull: false,
    },
    conversationId: {
      type: UUID,
      allowNull: false,
    },
  },
);

module.exports = Message;
