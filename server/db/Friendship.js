const conn = require('./conn');

const { UUID, UUIDV4, ENUM } = conn.Sequelize;

const Friendship = conn.define(
  'friendship',
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    status: {
      type: ENUM('PENDING', 'ACCEPTED', 'REJECTED'),
      allowNull: false,
      default: 'PENDING',
    },
    requestorId: {
      type: UUID,
      allowNull: false,
    },
    accepteeId: {
      type: UUID,
      allowNull: false,
    },
  },
);

module.exports = Friendship;
