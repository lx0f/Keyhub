const { Room } = require('../models');
const generateDefaultRoom = async () => {
  const defaultRoomName = 'Default Room';
  const defaultRoomDescription =
    'This is the default room. Please be respectfull to others. Happy typing!';
  const [_, created] = await Room.findOrCreate({
    where: {
      name: defaultRoomName,
    },
    defaults: {
      name: defaultRoomName,
      description: defaultRoomDescription,
    },
  });
  if (created) {
    console.log('DEFAULT ROOM GENERATED');
  }
};
module.exports = { generateDefaultRoom };
