const User = require('../models/user');

module.exports = {
  getUserById: async id => {
    return User.findOne({id}, {_id: 0});
  },
  updateUser: async (id, {data}) => {
    return User.findOneAndUpdate({id}, data);
  },
  getAll: async () => {
    return User.find({});
  },
  remove: async id => {
    return User.findOneAndDelete({id});
  },
  createUser: data => {
    return new User(data).save();
  }
};
