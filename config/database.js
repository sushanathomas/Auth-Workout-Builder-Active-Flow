// Load local credentials without committing them to the repository.
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env'), quiet: true });

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is missing. Copy .env.example to .env and configure your database.');
}

module.exports = {
  url: process.env.MONGODB_URI,
  dbName: process.env.MONGODB_DB_NAME
};
