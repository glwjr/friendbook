const conn = require('./conn');

const { TEXT, UUID, UUIDV4 } = conn.Sequelize;

const Post = conn.define('post', {
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
  userId: {
    type: UUID,
    allowNull: false,
  },
});

Post.getUserPosts = function getUserPosts(userId) {
  return Post.findAll({
    where: {
      userId,
    },
  });
};

module.exports = Post;
