export default async function sticker(sock, msg, args, config) {
  const from = msg.key.remoteJid;

  // Check if the message is a reply to an image
  const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  const imageMsg = quoted?.imageMessage || msg.message?.imageMessage;

  if (!imageMsg) {
    await sock.sendMessage(from, { text: '❌ Reply to an image with *.sticker* to convert it.' }, { quoted: msg });
    return;
  }

  try {
    // Download image buffer
    const { downloadContentFromMessage } = await import('@whiskeysockets/baileys');
    const stream = await downloadContentFromMessage(imageMsg, 'image');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    // Convert to sticker
    const sharp = (await import('sharp')).default;
    const webpBuffer = await sharp(buffer)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 80 })
      .toBuffer();

    await sock.sendMessage(from, { sticker: webpBuffer }, { quoted: msg });
  } catch (err) {
    console.error('Sticker error:', err);
    await sock.sendMessage(from, { text: '⚠️ Failed to create sticker. Try again.' }, { quoted: msg });
  }
}
