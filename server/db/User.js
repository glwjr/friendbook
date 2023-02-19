const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const conn = require('./conn');
const Message = require('./Message');
const Conversation = require('./Conversation');
const Post = require('./Post');
const Friendship = require('./Friendship');

const {
  Op, STRING, UUID, UUIDV4, BOOLEAN, TEXT,
} = conn.Sequelize;

const { JWT } = process.env;

const User = conn.define(
  'user',
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    username: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isAdmin: {
      type: BOOLEAN,
      allowNull: false,
    },
    bio: {
      type: TEXT,
    },
  },
  {
    hooks: {
      async beforeSave(user) {
        if (user.changed('password')) {
        // eslint-disable-next-line no-param-reassign
          user.password = await bcrypt.hash(user.password, 5);
        }
      },
    },
  },
);

User.findByToken = async function findByToken(token) {
  try {
    const { id } = jwt.verify(token, JWT);
    const user = await this.findByPk(id);

    if (user) {
      return user;
    }

    throw new Error('User not found');
  } catch (err) {
    const error = new Error('Bad credentials');
    error.status = 401;
    throw error;
  }
};

User.generateToken = function generateToken(user) {
  return jwt.sign({ id: user.id }, JWT);
};

User.authenticate = async function authenticate({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }

  const error = new Error('Bad credentials');
  error.status = 401;
  throw error;
};

User.encryptUser = async function encryptUser(user) {
  const { dataValues } = await User.create(user);
  return User.generateToken(dataValues);
};

User.prototype.getConversations = async function getUserConversations() {
  const conversations = await Conversation.findAll({
    where: {
      [Op.or]: [{ creatorId: this.id }, { recipientId: this.id }],
    },
    include: [Message],
  });

  return conversations;
};

User.prototype.getPosts = async function getUserPosts() {
  const posts = await Post.findAll({
    where: {
      userId: this.id,
    },
    include: User,
  });

  return posts;
};

User.prototype.getNetworkPosts = async function getNetworkPosts() {
  const friendships = await Friendship.findAll({
    where: {
      [Op.or]: [{ requestorId: this.id }, { accepteeId: this.id }],
      status: 'ACCEPTED',
    },
  });

  const requestors = await friendships.map((friendship) => friendship.requestorId);
  const acceptees = await friendships.map((friendship) => friendship.accepteeId);
  const result = requestors.concat(acceptees);

  const posts = await Post.findAll({
    where: {
      userId: result,
    },
  });

  return posts;
};

module.exports = User;
