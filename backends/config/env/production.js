const mongo_usr = 'atsadmin';
let mongo_pass = 'sysbyp@ss';
mongo_pass = encodeURIComponent(mongo_pass);
const dbname = 'admin';
const mongo_addr1 = '172.16.48.62:27017';
const mongo_addr2 = '172.16.48.63:27017';
const mongo_addr3 = '172.16.48.64:27017';
const options = '?replicaSet=rs0';

module.exports = {
  NODE: 'SETTLEMENT',
  DB: `mongodb://${mongo_usr}:${mongo_pass}@${mongo_addr1},${mongo_addr2},${mongo_addr3}/${dbname}${options}`,
  ENV: 'production',
  PORT: 8080,
  TIMEOUT: {
    MONGOOSE: 30000,
  },
  LOG: {
    NAME: 'stm',
    ROOT_PATH: './logs',
    FILE_LEVEL: 'silly', // error, warn, info, verbose, debug, silly
    CONSOLE_LEVEL: 'silly' // error, warn, info, verbose, debug, silly
  },
  ROLE: {
    GUEST: 'SGL-00000',
    DEV: 'SGL-00001',
    SUPPLIER: 'SGL-00002',
    SI: 'SGL-00003',
  },
};
