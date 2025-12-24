import { closeRouter } from "./router.js";
import { mediaState } from "./state.js";

export const cleanupRoomMedia = (roomId) => {
  // close router
  closeRouter(roomId);

  // clear in-memory media
  const state = mediaState.get(roomId);
  if (state) {
    state.producers.forEach((p) => p.close());
    state.consumers.forEach((c) => c.close());
    mediaState.delete(roomId);
  }
};
