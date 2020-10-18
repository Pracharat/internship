const CONFIG = require('./config'); // Load config (environment)
const mongoose = require('mongoose'); // Load mongoose
const { logger } = require('./utils/logger')
// Bootstrap db connection
const db = mongoose.connection;

logger.info('Starting: API');
logger.info(`Connecting to MongoDB Instance: ${CONFIG.DB}`);
// { useNewUrlParser: true } server AIS not support
mongoose.connect(CONFIG.DB, {
  autoReconnect: true,
  connectTimeoutMS: CONFIG.TIMEOUT.MONGOOSE,
  useNewUrlParser: true
});

db.on('connecting', () => {
  logger.info('connecting to MongoDB...');
});

db.on('error', (error) => {
  logger.info('Could not connect to MongoDB!', error);
  mongoose.disconnect();
});

db.on('connected', () => {
  logger.info('MongoDB connected!');
});

db.once('open', () => {
  logger.info('MongoDB connection opened!');
});

db.on('reconnected', () => {
  logger.info('MongoDB reconnected!');
});

db.on('disconnected', () => {
  logger.info('MongoDB disconnected!');
});

process.on('uncaughtException', (err) => {
  logger.info(err);
  process.exit(1);
});
