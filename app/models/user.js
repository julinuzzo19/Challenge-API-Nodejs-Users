const {Schema, model} = require('mongoose');

const userSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
      index: true
    },
    email: {
      type: String,
      required: true
    },
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    company: {type: String, required: true},
    url: {type: String, required: true},
    text: {type: String, required: true}
  },
  {
    versionKey: false
  }
);

module.exports = new model('User', userSchema);
