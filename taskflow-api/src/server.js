// src/server.js
require('dotenv').config();
const app = require('./app');
const connectMongo = require('./config/mongo');
const { createUserTable } = require('./models/user.model');

const PORT = process.env.PORT || 5000;

(async () => {
  await connectMongo();
  await createUserTable();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();           