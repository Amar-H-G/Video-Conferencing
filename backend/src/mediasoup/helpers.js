import { mediaState } from "./state.js";

/**
 * Close camera producer for a given user in a room
 */
export const forceCloseCameraProducer = (roomId, userId) => {
  const state = mediaState.get(roomId);
  if (!state) return false;

  let closed = false;

  for (const producer of state.producers.values()) {
    // camera producer: video kind AND not screen
    if (
      producer.kind === "video" &&
      producer.appData?.type !== "screen" &&
      producer.appData?.userId?.toString() === userId.toString()
    ) {
      producer.close();
      state.producers.delete(producer.id);
      closed = true;
    }
  }

  return closed;
};
