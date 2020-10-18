const dbname = 'ATS-POC';

module.exports = {
  NODE: 'ATS-POC',
  DB: `mongodb+srv://Pracharat:At0802924312@training-vcfux.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  ENV: 'ats-poc',
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
