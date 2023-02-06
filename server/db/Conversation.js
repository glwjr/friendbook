const conn = require('./conn');

const { UUID, UUIDV4 } = conn.Sequelize;

const Conversation = conn.define(
  'conversation',
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    creatorId: {
      type: UUID,
      allowNull: false,
    },
    recipientId: {
      type: UUID,
      allowNull: false,
    },
  },
);

module.exports = Conversation;
