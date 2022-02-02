const credentials = {
  db: process.env.MONGO_DB,
  url: process.env.MONGO_URL,
  port: process.env.MONGO_PORT,
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
};

exports.credentials = credentials