export default async function ping(sock, msg) {
  const from = msg.key.remoteJid;
  const start = Date.now();
  await sock.sendMessage(from, { text: '🏓 Pinging...' }, { quoted: msg });
  const end = Date.now();
  await sock.sendMessage(from, { text: `🏓 Pong! *${end - start}ms*` });
}
