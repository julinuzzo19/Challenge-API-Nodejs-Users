const statusCode = require('../constants/constants');
const responseMessage = require('../constants/messages');
const User = require('../models/user');
require('../config/config');

module.exports = {
  createUser: async (req, res) => {
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
      res.status(statusCode.INTERNAL_ERROR).json(responseMessage.INTERNAL_ERROR);
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
      res.status(statusCode.INTERNAL_ERROR).json(responseMessage.INTERNAL_ERROR);
      console.log(error);
    }
  },

  remove: async (req, res) => {
    const id = req.params.id;

    try {
      const result = await User.findOneAndDelete({_id: id});
      console.log(result);

      if (result) {
        res
          .status(statusCode.RESPONSE_OK)
          .json({message: responseMessage.RESPONSE_OK_DELETED});
      } else {
        res
          .status(statusCode.BAD_REQUEST_ERROR)
          .json({message: responseMessage.BAD_REQUEST_ERROR});
      }
    } catch (error) {
      res.status(statusCode.INTERNAL_ERROR).json(responseMessage.INTERNAL_ERROR);
      console.log(error);
    }
  },
  getUsersById: async (req, res) => {
    const ids = req.params.ids;
    try {
      const arrayIds = ids.split(',');

      const result = [];

      await Promise.all(
        arrayIds.map(async (id) => {
          const userFounded = await User.findById(id);
          if (userFounded) result.push(userFounded);
        })
      );
      console.log(result);
      if (result.length > 0) {
        res
          .status(statusCode.RESPONSE_OK)
          .json({message: responseMessage.RESPONSE_OK, data: result});
      } else {
        res
          .status(statusCode.BAD_REQUEST_ERROR)
          .json({message: responseMessage.BAD_REQUEST_ERROR});
      }
    } catch (error) {
      res.status(statusCode.INTERNAL_ERROR).json(responseMessage.INTERNAL_ERROR);
      console.log(error);
    }
  }
};
