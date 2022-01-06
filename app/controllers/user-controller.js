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
  },

  update: async (req, res) => {
    const id = req.params.id;
    const {email, company, first_name, last_name, url, text} = req.body;

    try {
      const result = await User.findByIdAndUpdate(id, {
        email,
        company,
        first_name,
        last_name,
        url,
        text
      });
      console.log(result);
      if (result) {
        res
          .status(statusCode.RESPONSE_OK)
          .json({message: responseMessage.RESPONSE_OK_UPDATED});
      } else {
        res
          .status(statusCode.BAD_REQUEST_ERROR)
          .json({message: responseMessage.BAD_REQUEST_ERROR});
      }
    } catch (error) {
      console.log(error);
    }
  }
};
