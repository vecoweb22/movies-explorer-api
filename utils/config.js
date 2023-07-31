require('dotenv').config();

const { NODE_ENV, JWT_SECRET, MONGO_DB } = process.env;

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
const DB_URI = NODE_ENV === 'production' ? MONGO_DB : 'mongodb://127.0.0.1:27017/bitfilmsdb';
const PORT = 3000;

module.exports = {
  secretKey,
  DB_URI,
  PORT,
};
