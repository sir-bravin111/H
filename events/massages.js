import config from '../config.js';

export async function handleMessages(sock, m, cfg) {
  try {
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const body =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      msg.message.imageMessage?.caption ||
      '';

    if (!body.startsWith(cfg.prefix)) return;

    const args = body.slice(cfg.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(`📩 Command received: ${command} from ${from}`);

    // Load command dynamically
    const commandPath = `../commands/${command}.js`;
    try {
      const { default: run } = await import(commandPath);
      await run(sock, msg, args, cfg);
    } catch (err) {
      if (err.code === 'ERR_MODULE_NOT_FOUND') {
        await sock.sendMessage(from, { text: `❌ Command "*${command}*" not found.` });
      } else {
        console.error(`Error in command ${command}:`, err);
        await sock.sendMessage(from, { text: `⚠️ Error running command: ${err.message}` });
      }
    }
  } catch (err) {
    console.error('Message handler error:', err);
  }
}
