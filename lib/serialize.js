export function serializeMessage(msg) {
  const m = msg.message;
  if (!m) return null;

  return {
    key: msg.key,
    from: msg.key.remoteJid,
    isGroup: msg.key.remoteJid.endsWith('@g.us'),
    sender: msg.key.participant || msg.key.remoteJid,
    type: Object.keys(m)[0],
    body:
      m.conversation ||
      m.extendedTextMessage?.text ||
      m.imageMessage?.caption ||
      m.videoMessage?.caption ||
      '',
    pushName: msg.pushName || 'Unknown',
    timestamp: msg.messageTimestamp
  };
}
