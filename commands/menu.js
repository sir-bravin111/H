export default async function menu(sock, msg, args, config) {
  const from = msg.key.remoteJid;

  const menuText = `
╔══════════════════════════╗
║   🐱 *TOM/JERRY BOT* 🐭   ║
╚══════════════════════════╝

👋 Hello! I'm *${config.botName}*.
Here are my available commands:

┌──────────────────────────┐
│ 🟢 *General*             │
│  ${config.prefix}menu     │
│  ${config.prefix}ping     │
│  ${config.prefix}alive    │
├──────────────────────────┤
│ 🎨 *Tools*               │
│  ${config.prefix}sticker  │
├──────────────────────────┤
│ ⚙️ *Config*              │
│  Prefix: *${config.prefix}* │
│  Owner: *${config.ownerNumber}* │
└──────────────────────────┘

> Powered by Tom/Jerry Base
  `.trim();

  await sock.sendMessage(from, { text: menuText }, { quoted: msg });
}
