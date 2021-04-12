const path = require('path');
const dotenv = require('dotenv');

 
dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 3000,
  SFCC_ENV_URL : process.env.SFCC_ENV_URL || 'https://development-na-gapinc.demandware.net/s/Intermix/dw/shop/v18_8'
}