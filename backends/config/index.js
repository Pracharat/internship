// const config = require(`./env/${process.env.NODE_ENV || 'dev.js'}`);
const config = require(`./env/${process.env.NODE_ENV || 'host.js'}`);
module.exports = config;
