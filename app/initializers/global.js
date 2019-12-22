/*
  Do not import dotenv only
  import dotenv/config and not using dotenv.config()
  because in es6, import is processing before reading file
  https://hacks.mozilla.org/2015/08/es6-in-depth-modules/
*/
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
global.env = {
  __APP_VERSION__: process.env.npm_package_version,
  server: {
    addr: process.env.SERVER_ADDR,
    http: process.env.SERVER_HTTP,
    port: process.env.SERVER_PORT,
    url: process.env.SERVER_URL,
  },

  app: {
    url: process.env.APP_URL
  },
  
  mongo: {
    addr: process.env.MONGO_ADDR,
    db: process.env.MONGO_DB
  },

  key: {
    jwtSecret: process.env.JWT_SECRET
  },

  request_restrictions: {
    request_limit: process.env.REQUEST_LIMIT
  },

  nodeEnv: process.env.NODE_ENV || 'development',
  __DEV__: process.env.NODE_ENV == 'development'
};
