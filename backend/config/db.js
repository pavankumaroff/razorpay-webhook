const mongoose = require("mongoose");

async function db() {
  const db = process.env.MONGO_URI;

  try {
    await mongoose.connect(db);
    console.log(`Connected to ${db}...`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = db;
