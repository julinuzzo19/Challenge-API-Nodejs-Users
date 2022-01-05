const statusCode = require('../constants/constants');
const responseMessage = require('../constants/messages');
const User = require('../models/user');
require('../config/config');

module.exports = {
  createUser: async (req, res) => {
    console.log(req.body);
    const {email, first_name, last_name, company, url, text} = req.body;

    try {
      const userCreated = await new User({
        email,
        first_name,
        last_name,
        company,
        url,
        text
      }).save();

      if (userCreated) {
        res.status(statusCode.RESPONSE_OK_CREATED).json({
          message: responseMessage.RESPONSE_OK_CREATED,
          data: userCreated
        });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }
};
