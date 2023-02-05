const conn = require('./conn');
const User = require('./User');
const Friendship = require('./Friendship');
const Post = require('./Post');
const Message = require('./Message');
const Conversation = require('./Conversation');

// Friendship Associations

User.hasMany(Friendship, {
  as: 'SentFriendRequest',
  foreignKey: 'requestorId',
});

User.hasMany(Friendship, {
  as: 'AcceptedFriendRequest',
  foreignKey: 'accepteeId',
});

Friendship.belongsTo(User, {
  as: 'Requestor',
  foreignKey: 'requestorId',
});

Friendship.belongsTo(User, {
  as: 'Acceptee',
  foreignKey: 'accepteeId',
});

// Post Associations

User.hasMany(Post);
Post.belongsTo(User);

// Message & Conversation Associations

User.hasMany(Message, {
  as: 'SentMessage',
  foreignKey: 'senderId',
});

User.hasMany(Message, {
  as: 'ReceivedMessage',
  foreignKey: 'recipientId',
});

Message.belongsTo(User, {
  as: 'Sender',
  foreignKey: 'senderId',
});

Message.belongsTo(User, {
  as: 'Recipient',
  foreignKey: 'recipientId',
});

Message.belongsTo(Conversation);

Conversation.hasMany(Message);

User.hasMany(Conversation, {
  foreignKey: 'creatorId',
});

User.hasMany(Conversation, {
  foreignKey: 'recipientId',
});

Conversation.belongsTo(User, {
  as: 'Creator',
  foreignKey: 'creatorId',
});

Conversation.belongsTo(User, {
  as: 'Recipient',
  foreignKey: 'recipientId',
});

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  await User.create({ username: 'admin', password: '123', isAdmin: true });

  const [gary, mysia, mariahdessa, fady] = await Promise.all([
    User.create({ username: 'gary', password: '123', isAdmin: false }),
    User.create({ username: 'mysia', password: '123', isAdmin: false }),
    User.create({ username: 'mariahdessa', password: '123', isAdmin: false }),
    User.create({ username: 'fady', password: '123', isAdmin: false }),
  ]);

  const [conversationOne, conversationTwo] = await Promise.all([
    Conversation.create({ creatorId: gary.id, recipientId: mysia.id }),
    Conversation.create({ creatorId: fady.id, recipientId: gary.id }),
  ]);

  await Promise.all([
    Friendship.create({ requestorId: gary.id, accepteeId: mysia.id }),
    Friendship.create({ requestorId: mariahdessa.id, accepteeId: mysia.id }),
    Friendship.create({ requestorId: fady.id, accepteeId: gary.id }),
    Post.create({ post: 'This is test post number one. Gary wrote this.', userId: gary.id }),
    Post.create({ post: 'This is test post number two. Mysia wrote this.', userId: mysia.id }),
    Post.create({ post: 'This is test post number three. Mariahdessa wrote this.', userId: mariahdessa.id }),
    Post.create({ post: 'This is test post number four. Fady wrote this.', userId: fady.id }),
    Message.create({
      message: 'Message from Gary to Mysia.', senderId: gary.id, recipientId: mysia.id, conversationId: conversationOne.id,
    }),
    Message.create({
      message: 'Message from Mysia to Gary.', senderId: mysia.id, recipientId: gary.id, conversationId: conversationOne.id,
    }),
    Message.create({
      message: 'Message from Fady to Gary.', senderId: fady.id, recipientId: gary.id, conversationId: conversationTwo.id,
    }),
    Message.create({
      message: 'Message from Gary to Fady.', senderId: gary.id, recipientId: fady.id, conversationId: conversationTwo.id,
    }),
  ]);
};

module.exports = {
  syncAndSeed,
  User,
  Friendship,
  Message,
  Conversation,
  Post,
};
