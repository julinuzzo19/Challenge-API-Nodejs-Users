const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
    },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    company: { type: String },
    url: { type: String },
    text: { type: String },
    image: {
      url: { type: String },
      key: { type: String },
    },
  },
  {
    versionKey: false,
  }
);

module.exports = new model("User", userSchema);
