// roomId -> userId -> timeoutId
const pendingDisconnects = new Map();

export const markDisconnected = (roomId, userId, onExpire) => {
  if (!pendingDisconnects.has(roomId)) {
    pendingDisconnects.set(roomId, new Map());
  }
  const roomMap = pendingDisconnects.get(roomId);

  if (roomMap.has(userId)) return;

  const timeoutId = setTimeout(() => {
    roomMap.delete(userId);
    onExpire();
  }, Number(process.env.DISCONNECT_GRACE_MS || 15000));

  roomMap.set(userId, timeoutId);
};

export const clearReconnect = (roomId, userId) => {
  const roomMap = pendingDisconnects.get(roomId);
  if (!roomMap) return;

  const timeoutId = roomMap.get(userId);
  if (timeoutId) clearTimeout(timeoutId);

  roomMap.delete(userId);
  if (roomMap.size === 0) pendingDisconnects.delete(roomId);
};
