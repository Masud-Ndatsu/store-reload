import env from 'dotenv/config';

const { MONGO_PROD_URI, MONGO_DEV_URI, MONGO_TEST_URI } = process.env;

const MONGO_URI =
  process.env.NODE_ENV === 'prod'
    ? MONGO_PROD_URI.replace('<password>', process.env.MONGO_PROD_PASS)
    : process.env.NODE_ENV === 'dev'
    ? MONGO_DEV_URI
    : MONGO_TEST_URI;
const config = {
  app: {
    PORT: process.env.PORT || 5000,
    SALT: process.env.SALT || 10,
    SIGNATURE: process.env.SIGNATURE || 10,
  },
  db: {
    DB_URI: MONGO_URI,
  },
  cloud: {
    name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  },
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};
export default config;
