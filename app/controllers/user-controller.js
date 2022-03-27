const statusCode = require('../constants/constants');
const responseMessage = require('../constants/messages');
const User = require('../models/user');
const getUsersApi = require('../services/getUsersNotFounded');
const {uploadImage} = require('../services/uploadImageS3');
require('../config/config');

module.exports = {
  uploadImageUser: async (req, res) => {
    try {
      const {path, mimetype} = req.file;
      const {id} = req.params;

      const image = await uploadImage({path, id, mimetype});
      if (image) {
        const result = await User.findOneAndUpdate({id}, {image});

        if (result) {
          res.status(statusCode.RESPONSE_OK_CREATED).json({
            message: responseMessage.RESPONSE_OK_CREATED,
            result
          });
        } else {
          res
            .status(statusCode.BAD_REQUEST_ERROR)
            .json({message: responseMessage.BAD_REQUEST_ERROR});
        }
      } else {
        res.status(statusCode.BAD_REQUEST_ERROR).json({
          message: responseMessage.INTERNAL_ERROR,
          error
        });
      }
    } catch (error) {
      res.status(statusCode.INTERNAL_ERROR).json(responseMessage.INTERNAL_ERROR);
      console.log(error);
    }
  },

  createUser: async (req, res) => {
    const id = req.params.id;
    const {email, first_name, last_name, company, url, text} = req.body;

    try {
      const userCreated = await new User({
        id,
        email,
        first_name,
        last_name,
        company,
        url,
        text
      }).save();

      const {_id, ...result} = userCreated._doc;

      if (userCreated) {
        res.status(statusCode.RESPONSE_OK_CREATED).json({
          message: responseMessage.RESPONSE_OK_CREATED,
          data: result
        });
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

  update: async (req, res) => {
    const id = req.params.id;
    const {email, company, first_name, last_name, url, text} = req.body;

    try {
      const result = await User.findOneAndUpdate(
        {id},
        {
          email,
          company,
          first_name,
          last_name,
          url,
          text
        }
      );
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
      const result = await User.findOneAndDelete({id});

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
      const notFoundIds = [];

      await Promise.all(
        arrayIds.map(async id => {
          const userFounded = await User.findOne({id}, {_id: 0});
          if (userFounded) result.push(userFounded);
          else {
            notFoundIds.push(id);
          }
        })
      );

      await getUsersApi(notFoundIds);

      if (result.length > 0) {
        res.status(statusCode.RESPONSE_OK).json({data: result});
      } else {
        res
          .status(statusCode.NOT_FOUND_ERROR)
          .json({message: responseMessage.NOT_FOUND_ERROR});
      }
    } catch (error) {
      res.status(statusCode.INTERNAL_ERROR).json(responseMessage.INTERNAL_ERROR);
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    const response = await User.find({});

    res.json({data: response});
  }
};
