import { DisconnectReason } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';

export function handleConnection(sock, update, restartBot) {
  const { connection, lastDisconnect, qr } = update;

  if (qr) {
    console.log('📱 Scan the QR code above with WhatsApp.');
  }

  if (connection === 'close') {
    const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode;
    const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

    console.log(`🔌 Connection closed. Reason: ${statusCode}. Reconnecting: ${shouldReconnect}`);

    if (shouldReconnect) {
      setTimeout(() => restartBot(), 3000);
    } else {
      console.log('❌ Logged out. Delete the session folder and restart.');
    }
  } else if (connection === 'open') {
    console.log('✅ Tom/Jerry bot is connected and ready!');
  }
}
