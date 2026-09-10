import 'dotenv/config';

export default {
  botName: process.env.BOT_NAME || 'Tom/Jerry',
  ownerNumber: process.env.OWNER_NUMBER || '1234567890',
  prefix: process.env.PREFIX || '.',
  sessionName: process.env.SESSION_NAME || 'tom_jerry_session',
  autoRead: process.env.AUTO_READ === 'true',
  autoTyping: process.env.AUTO_TYPING === 'true',
  logLevel: process.env.LOG_LEVEL || 'info'
};
