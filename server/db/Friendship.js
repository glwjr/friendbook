const conn = require('./conn');

const { UUID, UUIDV4 } = conn.Sequelize;

const Friendship = conn.define('friendship', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  requestorId: {
    type: UUID,
    allowNull: false,
  },
  accepteeId: {
    type: UUID,
    allowNull: false,
  },
});

module.exports = Friendship;
