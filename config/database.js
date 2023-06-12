const { mongoose } = require("mongoose");

const database = () => {
  mongoose.connect(process.env.DB_URL)
  .then
    ((connect) => {
      console.log(`Database Connected:${connect.connection.host}`);
    })
};

module.exports = database;