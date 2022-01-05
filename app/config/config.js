const mongoose = require('mongoose');
const db = mongoose.connection;

let uri = 'mongodb://root:admin@127.0.0.1:27018/db_api?authSource=admin';

mongoose.connect(uri);

db.once('open', (_) => {
  console.log('Database is connected to:', uri);
});

// to test the error stop mongod
db.on('error', (err) => {
  console.log(err);
});
