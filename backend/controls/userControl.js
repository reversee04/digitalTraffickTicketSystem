const User = require('../models/user');
const TrafficOfficer = require('../models/TrafficOfficer');
const Admin = require('../models/Admin');
const Driver = require('../models/Driver');

async function createUser(req, res) {
  const { username, password, email, role, additionalData } = req.body;

  try {
    const user = await User.create({ username, password, email, role });

    switch (role) {
      case 'TRAFFIC_OFFICER':
        await TrafficOfficer.create({
          ...additionalData,
          userId: user.id,
        });
        break;

      case 'ADMIN':
        await Admin.create({
          ...additionalData,
          userId: user.id,
        });
        break;

      case 'DRIVER':
        await Driver.create({
          ...additionalData,
          userId: user.id,
        });
        break;

      default:
        throw new Error('Invalid role');
    }

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
