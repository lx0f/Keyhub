module.exports = {
  ...require('./auth'),
  ...require('./cart'),
  ...require('./fixtures'),
  ...require('./helpers'),
  ...require('./mail'),
  ...require('./upload'),
  ...require('./socketio'),
  ...require('./generateDefaultRoom'),
};
