export default async function alive(sock, msg, args, config) {
  const from = msg.key.remoteJid;
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);

  const aliveText = `
╭━━━〔 *${config.botName}* 〕━━━╮
┃ ✅ Status: *Online*
┃ ⏱️ Uptime: *${hours}h ${minutes}m*
┃ 📦 Node: *${process.version}*
┃ 💾 Memory: *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB*
╰━━━━━━━━━━━━━━━━━━━━━━╯

> I'm alive and ready! 🐱🐭
  `.trim();

  await sock.sendMessage(from, { text: aliveText }, { quoted: msg });
}
