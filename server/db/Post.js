const conn = require('./conn');

const {
  STRING, TEXT, UUID, UUIDV4,
} = conn.Sequelize;

const Post = conn.define(
  'post',
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    post: {
      type: TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imageUrl: {
      type: STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        isUrl: true,
      },
    },
    userId: {
      type: UUID,
      allowNull: false,
    },
  },
);

module.exports = Post;
