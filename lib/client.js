import { makeWASocket, useMultiFileAuthState } from '@whiskeysockets/baileys';
import pino from 'pino';

const logger = pino({ level: 'silent' });

export async function createClient(sessionName = 'tom_jerry_session') {
  const { state, saveCreds } = await useMultiFileAuthState(`./session/${sessionName}`);

  const sock = makeWASocket({
    logger,
    printQRInTerminal: true,
    auth: state,
    browser: ['Tom/Jerry Bot', 'Chrome', '1.0.0']
  });

  sock.ev.on('creds.update', saveCreds);
  return sock;
}
