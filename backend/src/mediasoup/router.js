import { createWorker } from "./worker.js";
import { mediasoupConfig } from "../config/mediasoup.config.js";

const routers = new Map(); // roomId -> router

export const getOrCreateRouter = async (roomId) => {
  if (routers.has(roomId)) {
    return routers.get(roomId);
  }

  const worker = await createWorker();
  const router = await worker.createRouter({
    mediaCodecs: mediasoupConfig.router.mediaCodecs,
  });

  routers.set(roomId, router);

  return router;
};

export const closeRouter = (roomId) => {
  const router = routers.get(roomId);
  if (router) {
    router.close();
    routers.delete(roomId);
  }
};
