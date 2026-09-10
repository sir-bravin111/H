import { makeWASocket, useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import fs from 'fs-extra';
import config from './config.js';
import { handleMessages } from './events/messages.js';
import { handleConnection } from './events/connection.js';

const logger = pino({ level: config.logLevel });

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(`./session/${config.sessionName}`);

  const sock = makeWASocket({
    logger,
    printQRInTerminal: true,
    auth: state,
    browser: ['Tom/Jerry Bot', 'Chrome', '1.0.0']
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    handleConnection(sock, update, startBot);
  });

  sock.ev.on('messages.upsert', async (m) => {
    await handleMessages(sock, m, config);
  });

  return sock;
}

// Ensure session & temp folders exist
fs.ensureDirSync('./session');
fs.ensureDirSync('./temp');

startBot().catch((err) => {
  logger.error('Failed to start bot:', err);
  process.exit(1);
});
