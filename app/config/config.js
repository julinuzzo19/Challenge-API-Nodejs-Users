const mongoose = require('mongoose');
const db = mongoose.connection;

const {MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB} =
  process.env;

let uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(uri);

db.once('open', _ => {
  console.log('Database is connected to:', uri);
});

// to test the error stop mongod
db.on('error', err => {
  console.log(err);
});
