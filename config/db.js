const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = () => {
  mongoose
    .connect(db, {
      useURLParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log('Connection to MongoDB successful ✌'))
    .catch(err => {
      console.log(err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
