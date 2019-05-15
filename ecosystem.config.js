const TARGET_SERVER_HOST =  "ec2-52-59-148-107.eu-central-1.compute.amazonaws.com"//process.env.TARGET_SERVER_HOST ? process.env.TARGET_SERVER_HOST.trim() : '';
// Target server username
const TARGET_SERVER_USER = "ubuntu"  //process.env.TARGET_SERVER_USER ? process.env.TARGET_SERVER_USER.trim() : '';
// Target server application path
const TARGET_SERVER_APP_PATH = `/home/${TARGET_SERVER_USER}/app`;
// Your repository
const REPO = 'git@gitlab.com:codelise/adata/adata.git';


/*********************************** BACKEND ***********************************/
const DEV = process.env.DEV ? process.env.DEV : false;
//  Postgress
const POSTGRES_USER = "postgres"// process.env.POSTGRES_USER ? process.env.POSTGRES_USER.trim() : '';
const POSTGRES_PASSWORD = "p0stgr3s"  // process.env.POSTGRES_PASSWORD ? process.env.POSTGRES_PASSWORD.trim() : '';
const POSTGRES_DB = "adata" //process.env.POSTGRES_DB ? process.env.POSTGRES_DB.trim() : '';  
const POSTGRES_PORT = "5432" // process.env.POSTGRES_PORT ? process.env.POSTGRES_PORT.trim() : '';  

// API
const APP_TYPES = "api" //process.env.APP_TYPES ? process.env.APP_TYPES.trim() : '';  
const API_URL = "https://api.adata.codelise.io" //process.env.API_URL ? process.env.API_URL.trim() : '';
const API_PORT = 3000;//process.env.API_PORT ? process.env.API_PORT.trim() : '';  
const API_DEFAULT_PAGE_LIMIT = 10; //process.env.API_DEFAULT_PAGE_LIMIT ? process.env.API_DEFAULT_PAGE_LIMIT.trim() : '';  

//# CRAWLER
const CRAWLER_URL = "http://127.0.0.1:3100" //process.env.CRAWLER_URL ? process.env.CRAWLER_URL.trim() : '';  

// AUTH
const SECRET_KEY = "jqE5th5F1iL9" //process.env.SECRET_KEY ? process.env.SECRET_KEY.trim() : '';  
const SECRET_EXPIRATION = 7200 // process.env.SECRET_EXPIRATION ? process.env.SECRET_EXPIRATION.trim() : '';  

// AUTH - GOOGLE
const GOOGLE_CLIENT_ID =  "920541335277-hufsvldfa3qamhmlq1n58p43jsna0qjh.apps.googleusercontent.com" //process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID.trim() : '';  
const GOOGLE_CLIENT_SECRET = "WpcrE_yzdEPWaGZ-kaETd1GJ" //process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET.trim() : '';  
const GOOGLE_ADMIN_EMAILS = "pal.kollar@codelise.io|daniel.szuk@codelise.io|kcsbzs@gmail.com" //process.env.GOOGLE_ADMIN_EMAILS ? process.env.GOOGLE_ADMIN_EMAILS.trim() : '';  

/*********************************** FRONTEND ***********************************/
const FE_PORT = 3001 //process.env.FE_PORT ?  process.env.FE_PORT : '';
const FE_URL = "https://adata.codelise.io" // process.env.FE_URL ?  process.env.FE_URL : '';
const INPUT_TIMEOUT =  750 // process.env.INPUT_TIMEOUT ? process.env.INPUT_TIMEOUT : ''; 

const FE_DIST_PATH = `${TARGET_SERVER_APP_PATH}/source/frontend/dist`;
const FE_CONFIG_JSON_PATH = `${TARGET_SERVER_APP_PATH}/config/config.json`;

const BE_DIST_PATH = `${TARGET_SERVER_APP_PATH}/backend/dist`;


module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'frontend',
      script: `node server.js --prefix source/frontend/dist`,
      env: {
        NODE_ENV: 'development',
        PORT: FE_PORT,
        FE_PORT
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: FE_PORT,
        FE_PORT
      }

    },
    {
      name: 'backend',
      script: `npm run start:prod --prefix source/backend`,
      env: {
        NODE_ENV: 'development',
        PORT: API_PORT,
        DEV,
        POSTGRES_USER,
        POSTGRES_PASSWORD,
        POSTGRES_DB,
        POSTGRES_PORT,
        FE_URL,
        APP_TYPES,
        API_URL,
        API_PORT,
        API_DEFAULT_PAGE_LIMIT,
        CRAWLER_URL,
        SECRET_KEY,
        SECRET_EXPIRATION,
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        GOOGLE_ADMIN_EMAILS,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: API_PORT,
        DEV,
        POSTGRES_USER,
        POSTGRES_PASSWORD,
        POSTGRES_DB,
        POSTGRES_PORT,
        FE_URL,
        APP_TYPES,
        API_URL,
        API_PORT,
        API_DEFAULT_PAGE_LIMIT,
        CRAWLER_URL,
        SECRET_KEY,
        SECRET_EXPIRATION,
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        GOOGLE_ADMIN_EMAILS,
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: TARGET_SERVER_USER,
      host: TARGET_SERVER_HOST,
      ref: 'origin/master',
      repo: REPO,
      ssh_options: 'StrictHostKeyChecking=no',
      path: TARGET_SERVER_APP_PATH,
      'post-deploy':
        'git submodule init'
      + ' && git submodule update'
      + ' && echo \"---------------------------------------------------- git submodule update \"'
      + ' && npm install --prefix backend'
      + ' && echo \"---------------------------------------------------- npm install --prefix backend \"'
      + ' && npm run build --prefix backend'
      + ' && echo \"---------------------------------------------------- npm run build --prefix backend \"'
      + ' && npm install --prefix frontend'
      + ' && echo \"---------------------------------------------------- install --prefix frontend  \"'
      + ` && echo \"{\"backendUrl\": \"${API_URL}\",\"appUrl\": \"${FE_URL}\",\"inputTimeoutBeforeServerCall\": ${INPUT_TIMEOUT}}\" > ${TARGET_SERVER_APP_PATH}/backend/src/config/config.json`
      + ' && npm run build:prod --prefix frontend'
      + ' && pm2 startOrRestart ecosystem.config.js --only frontend --env=production'
      + ' && pm2 startOrRestart ecosystem.config.js --only backend --env=production'
      + ' && pm2 save'
    }
  }
};