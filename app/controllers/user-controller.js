const statusCode = require('../constants/constants');
const responseMessage = require('../constants/messages');
const User = require('../models/user');
const userService = require('../services/user-service');
require('../config/config');

module.exports = {
  uploadImageUser: async (req, res) => {
    try {
      const {path, mimetype} = req.files;
      const {id} = req.params;

      const result = userService.uploadImage({path, mimetype, id});

      if (result) {
        res.status(statusCode.RESPONSE_OK_CREATED).json({
          message: responseMessage.RESPONSE_OK_CREATED,
          result
        });
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
    const data = req.body;
    const {tempFilePath, mimetype} = req.files?.image;
    data.id = id;

    console.log({tempFilePath, mimetype});
    try {
      const {Location, key} = await userService.uploadImage({
        path: tempFilePath,
        mimetype,
        id
      });
      console.log({Location, key});

      data.image = {url: Location, key};
      const userCreated = await userService.createUser(data);

      if (userCreated) {
        const {_id, ...result} = userCreated._doc;
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
    const data = req.body;

    try {
      const result = userService.updateUser(id, {data});
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
      const result = await userService.removeUser(id);

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

      const result = await userService.getUser(arrayIds);

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
    try {
      const result = await userService.getAllUsers();

      res.json({data: result});
    } catch (error) {
      res.status(statusCode.INTERNAL_ERROR).json(responseMessage.INTERNAL_ERROR);
      console.log(error);
    }
  }
};
