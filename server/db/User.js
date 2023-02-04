const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const conn = require('./conn');

const {
  STRING, UUID, UUIDV4, BOOLEAN,
} = conn.Sequelize;

const { JWT } = process.env;

const User = conn.define('user', {
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
    defaultValue: false,
  },
});

User.findByToken = async (token) => {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);

    if (user) {
      return user;
    }

    throw new Error('User not found');
  } catch (err) {
    const error = new Error('Bad Credentials');
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = () => jwt.sign({ id: this.id }, JWT);

User.authenticate = async ({ username, password }) => {
  const user = await this.findOne({
    where: {
      username,
    },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }

  const error = new Error('Bad Credentials');
  error.status = 401;
  throw error;
};

User.encryptUser = async (user) => {
  const newUser = await User.create(user);
  return newUser.generateToken();
};

module.exports = User;
