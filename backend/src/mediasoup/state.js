// roomId -> { producers: Map<producerId, producer>, consumers: Map<consumerId, consumer> }
export const mediaState = new Map();

export const getRoomState = (roomId) => {
  if (!mediaState.has(roomId)) {
    mediaState.set(roomId, {
      producers: new Map(),
      consumers: new Map(),
    });
  }
  return mediaState.get(roomId);
};
