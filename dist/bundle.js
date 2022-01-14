/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var __dirname = \"/\";\nvar express = __webpack_require__(/*! express */ \"express\");\nvar path = __webpack_require__(/*! path */ \"path\");\nvar cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\nvar logger = __webpack_require__(/*! morgan */ \"morgan\");\nconst app = express();\nconst cors = __webpack_require__(/*! cors */ \"cors\");\n\n__webpack_require__(/*! ./app/config/config */ \"./app/config/config.js\");\n\nconst indexRouter = __webpack_require__(/*! ./app/routes/index */ \"./app/routes/index.js\");\n\n\napp.use(cors());\napp.use(logger('dev'));\napp.use(express.json());\napp.use(express.urlencoded({extended: true}));\napp.use(cookieParser());\napp.use(express.static(path.join(__dirname, 'public')));\n\napp.use('/api', indexRouter);\n\nmodule.exports = app;\n\n\n//# sourceURL=webpack://api-node-challenge/./app.js?");

/***/ }),

/***/ "./app/config/config.js":
/*!******************************!*\
  !*** ./app/config/config.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst db = mongoose.connection;\r\n\r\nlet uri = 'mongodb://root:admin@127.0.0.1:27018/db_api?authSource=admin';\r\n\r\nmongoose.connect(uri);\r\n\r\ndb.once('open', (_) => {\r\n  console.log('Database is connected to:', uri);\r\n});\r\n\r\n// to test the error stop mongod\r\ndb.on('error', (err) => {\r\n  console.log(err);\r\n});\r\n\n\n//# sourceURL=webpack://api-node-challenge/./app/config/config.js?");

/***/ }),

/***/ "./app/constants/constants.js":
/*!************************************!*\
  !*** ./app/constants/constants.js ***!
  \************************************/
/***/ ((module) => {

eval("const NOT_FOUND_ERROR = 404;\r\nconst BAD_REQUEST_ERROR = 400;\r\nconst INTERNAL_ERROR = 500;\r\nconst BAD_GATEWAY = 502;\r\nconst RESPONSE_OK = 200;\r\nconst RESPONSE_OK_CREATED = 201;\r\nconst RESPONSE_OK_UPDATED = 201;\r\nconst RESPONSE_OK_NO_CONTENT = 204;\r\nconst REQUEST_TIMEOUT = 408;\r\nconst NOK_USER_CREDENTIALS = 401;\r\nconst FORBIDDEN = 403;\r\nconst SECRETORPRIVATEKEY = 'SECRETKEY';\r\n\r\n\r\nmodule.exports = {\r\n  NOT_FOUND_ERROR,\r\n  BAD_REQUEST_ERROR,\r\n  INTERNAL_ERROR,\r\n  BAD_GATEWAY,\r\n  RESPONSE_OK,\r\n  RESPONSE_OK_CREATED,\r\n  RESPONSE_OK_UPDATED,\r\n  RESPONSE_OK_NO_CONTENT,\r\n  REQUEST_TIMEOUT,\r\n  NOK_USER_CREDENTIALS,\r\n  FORBIDDEN,\r\n  SECRETORPRIVATEKEY,\r\n};\r\n\n\n//# sourceURL=webpack://api-node-challenge/./app/constants/constants.js?");

/***/ }),

/***/ "./app/constants/messages.js":
/*!***********************************!*\
  !*** ./app/constants/messages.js ***!
  \***********************************/
/***/ ((module) => {

eval("const NOT_FOUND_ERROR = 'Not Found';\r\nconst BAD_REQUEST_ERROR = 'Bad request';\r\nconst INTERNAL_ERROR = 'Internal error';\r\nconst BAD_GATEWAY = 'Bad gateway';\r\nconst RESPONSE_OK = 'OK';\r\nconst RESPONSE_OK_CREATED = 'Generated successfully';\r\nconst RESPONSE_OK_UPDATED = 'Updated successfully';\r\nconst RESPONSE_OK_DELETED = 'Deleted successfully';\r\nconst RESPONSE_OK_NO_CONTENT = 'No Content';\r\nconst REQUEST_TIMEOUT = 'Request timeout';\r\nconst UNAUTHORIZED_USER_CREDENTIALS = 'Unauthorized user credentials';\r\nconst FORBIDDEN = 'Forbidden';\r\n\r\nmodule.exports = {\r\n  NOT_FOUND_ERROR,\r\n  BAD_REQUEST_ERROR,\r\n  INTERNAL_ERROR,\r\n  BAD_GATEWAY,\r\n  RESPONSE_OK,\r\n  RESPONSE_OK_CREATED,\r\n  RESPONSE_OK_UPDATED,\r\n  RESPONSE_OK_NO_CONTENT,\r\n  RESPONSE_OK_DELETED,\r\n  REQUEST_TIMEOUT,\r\n  UNAUTHORIZED_USER_CREDENTIALS,\r\n  FORBIDDEN\r\n};\r\n\n\n//# sourceURL=webpack://api-node-challenge/./app/constants/messages.js?");

/***/ }),

/***/ "./app/controllers/user-controller.js":
/*!********************************************!*\
  !*** ./app/controllers/user-controller.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const statusCode = __webpack_require__(/*! ../constants/constants */ \"./app/constants/constants.js\");\r\nconst responseMessage = __webpack_require__(/*! ../constants/messages */ \"./app/constants/messages.js\");\r\nconst User = __webpack_require__(/*! ../models/user */ \"./app/models/user.js\");\r\nconst getUsersApi = __webpack_require__(/*! ../services/getUsersNotFounded */ \"./app/services/getUsersNotFounded.js\");\r\n__webpack_require__(/*! ../config/config */ \"./app/config/config.js\");\r\n\r\nmodule.exports = {\r\n  createUser: async (req, res) => {\r\n    const id = req.params.id;\r\n    const {email, first_name, last_name, company, url, text} = req.body;\r\n\r\n    try {\r\n      const userCreated = await new User({\r\n        id,\r\n        email,\r\n        first_name,\r\n        last_name,\r\n        company,\r\n        url,\r\n        text\r\n      }).save();\r\n\r\n      const {_id, ...result} = userCreated._doc;\r\n\r\n      if (userCreated) {\r\n        res.status(statusCode.RESPONSE_OK_CREATED).json({\r\n          message: responseMessage.RESPONSE_OK_CREATED,\r\n          data: result\r\n        });\r\n      } else {\r\n        res\r\n          .status(statusCode.BAD_REQUEST_ERROR)\r\n          .json({message: responseMessage.BAD_REQUEST_ERROR});\r\n      }\r\n    } catch (error) {\r\n      res.status(statusCode.INTERNAL_ERROR).json(responseMessage.INTERNAL_ERROR);\r\n      console.log(error);\r\n    }\r\n  },\r\n\r\n  update: async (req, res) => {\r\n    const id = req.params.id;\r\n    const {email, company, first_name, last_name, url, text} = req.body;\r\n\r\n    try {\r\n      const result = await User.findOneAndUpdate(\r\n        {id},\r\n        {\r\n          email,\r\n          company,\r\n          first_name,\r\n          last_name,\r\n          url,\r\n          text\r\n        }\r\n      );\r\n      if (result) {\r\n        res\r\n          .status(statusCode.RESPONSE_OK)\r\n          .json({message: responseMessage.RESPONSE_OK_UPDATED});\r\n      } else {\r\n        res\r\n          .status(statusCode.BAD_REQUEST_ERROR)\r\n          .json({message: responseMessage.BAD_REQUEST_ERROR});\r\n      }\r\n    } catch (error) {\r\n      res.status(statusCode.INTERNAL_ERROR).json(responseMessage.INTERNAL_ERROR);\r\n      console.log(error);\r\n    }\r\n  },\r\n\r\n  remove: async (req, res) => {\r\n    const id = req.params.id;\r\n\r\n    try {\r\n      const result = await User.findOneAndDelete({id});\r\n\r\n      if (result) {\r\n        res\r\n          .status(statusCode.RESPONSE_OK)\r\n          .json({message: responseMessage.RESPONSE_OK_DELETED});\r\n      } else {\r\n        res\r\n          .status(statusCode.BAD_REQUEST_ERROR)\r\n          .json({message: responseMessage.BAD_REQUEST_ERROR});\r\n      }\r\n    } catch (error) {\r\n      res.status(statusCode.INTERNAL_ERROR).json(responseMessage.INTERNAL_ERROR);\r\n      console.log(error);\r\n    }\r\n  },\r\n  getUsersById: async (req, res) => {\r\n    const ids = req.params.ids;\r\n    try {\r\n      const arrayIds = ids.split(',');\r\n\r\n      const result = [];\r\n      const notFoundIds = [];\r\n\r\n      await Promise.all(\r\n        arrayIds.map(async (id) => {\r\n          const userFounded = await User.findOne({id}, {_id: 0});\r\n          if (userFounded) result.push(userFounded);\r\n          else {\r\n            notFoundIds.push(id);\r\n          }\r\n        })\r\n      );\r\n\r\n      await getUsersApi(notFoundIds);\r\n\r\n      if (result.length > 0) {\r\n        res.status(statusCode.RESPONSE_OK).json({data: result});\r\n      } else {\r\n        res\r\n          .status(statusCode.NOT_FOUND_ERROR)\r\n          .json({message: responseMessage.NOT_FOUND_ERROR});\r\n      }\r\n    } catch (error) {\r\n      res.status(statusCode.INTERNAL_ERROR).json(responseMessage.INTERNAL_ERROR);\r\n      console.log(error);\r\n    }\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://api-node-challenge/./app/controllers/user-controller.js?");

/***/ }),

/***/ "./app/models/user.js":
/*!****************************!*\
  !*** ./app/models/user.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {Schema, model} = __webpack_require__(/*! mongoose */ \"mongoose\");\r\n\r\nconst userSchema = new Schema(\r\n  {\r\n    id: {\r\n      type: Number,\r\n      unique: true,\r\n      required: true,\r\n      index: true\r\n    },\r\n    email: {\r\n      type: String,\r\n      required: true\r\n    },\r\n    first_name: {type: String, required: true},\r\n    last_name: {type: String, required: true},\r\n    company: {type: String},\r\n    url: {type: String},\r\n    text: {type: String}\r\n  },\r\n  {\r\n    versionKey: false\r\n  }\r\n);\r\n\r\nmodule.exports = new model('User', userSchema);\r\n\n\n//# sourceURL=webpack://api-node-challenge/./app/models/user.js?");

/***/ }),

/***/ "./app/routes/index.js":
/*!*****************************!*\
  !*** ./app/routes/index.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst router = express.Router();\nconst userRouter = __webpack_require__(/*! ./users */ \"./app/routes/users.js\");\n\nrouter.use('/users', userRouter);\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack://api-node-challenge/./app/routes/index.js?");

/***/ }),

/***/ "./app/routes/users.js":
/*!*****************************!*\
  !*** ./app/routes/users.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst router = express.Router();\n\nconst {\n  createUser,\n  update,\n  remove,\n  getUsersById\n} = __webpack_require__(/*! ../controllers/user-controller */ \"./app/controllers/user-controller.js\");\n\nrouter\n  .post('/:id', createUser)\n  .put('/:id', update)\n  .delete('/:id', remove)\n  .get('/:ids', getUsersById);\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack://api-node-challenge/./app/routes/users.js?");

/***/ }),

/***/ "./app/services/getUsersNotFounded.js":
/*!********************************************!*\
  !*** ./app/services/getUsersNotFounded.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const User = __webpack_require__(/*! ../models/user */ \"./app/models/user.js\");\r\nconst axios = (__webpack_require__(/*! axios */ \"axios\")[\"default\"]);\r\n\r\nmodule.exports = getUsersApi = async (ids) => {\r\n  const requests = ids.map((id) => axios.get(`https://reqres.in/api/users/${id}`));\r\n\r\n  try {\r\n    const result = await Promise.all(requests);\r\n\r\n    result.map((res) => {\r\n      const {id, email, first_name, last_name} = res.data.data;\r\n\r\n      new User({\r\n        id,\r\n        email,\r\n        first_name,\r\n        last_name\r\n      }).save();\r\n    });\r\n  } catch (error) {\r\n    console.log(error);\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://api-node-challenge/./app/services/getUsersNotFounded.js?");

/***/ }),

/***/ "./bin/www":
/*!*****************!*\
  !*** ./bin/www ***!
  \*****************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("//#!/usr/bin/env node\n\n/**\n * Module dependencies.\n */\n\nvar app = __webpack_require__(/*! ../app */ \"./app.js\");\nvar debug = __webpack_require__(/*! debug */ \"debug\")('api-node-challenge:server');\nvar http = __webpack_require__(/*! http */ \"http\");\n\n/**\n * Get port from environment and store in Express.\n */\n\nvar port = normalizePort(process.env.PORT || '3000');\napp.set('port', port);\n\n/**\n * Create HTTP server.\n */\n\nvar server = http.createServer(app);\n\n/**\n * Listen on provided port, on all network interfaces.\n */\n\nserver.listen(port);\nserver.on('error', onError);\nserver.on('listening', onListening);\n\n/**\n * Normalize a port into a number, string, or false.\n */\n\nfunction normalizePort(val) {\n  var port = parseInt(val, 10);\n\n  if (isNaN(port)) {\n    // named pipe\n    return val;\n  }\n\n  if (port >= 0) {\n    // port number\n    return port;\n  }\n\n  return false;\n}\n\n/**\n * Event listener for HTTP server \"error\" event.\n */\n\nfunction onError(error) {\n  if (error.syscall !== 'listen') {\n    throw error;\n  }\n\n  var bind = typeof port === 'string'\n    ? 'Pipe ' + port\n    : 'Port ' + port;\n\n  // handle specific listen errors with friendly messages\n  switch (error.code) {\n    case 'EACCES':\n      console.error(bind + ' requires elevated privileges');\n      process.exit(1);\n      break;\n    case 'EADDRINUSE':\n      console.error(bind + ' is already in use');\n      process.exit(1);\n      break;\n    default:\n      throw error;\n  }\n}\n\n/**\n * Event listener for HTTP server \"listening\" event.\n */\n\nfunction onListening() {\n  var addr = server.address();\n  var bind = typeof addr === 'string'\n    ? 'pipe ' + addr\n    : 'port ' + addr.port;\n  debug('Listening on ' + bind);\n}\n\n\n//# sourceURL=webpack://api-node-challenge/./bin/www?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("axios");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("debug");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("morgan");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./bin/www");
/******/ 	
/******/ })()
;