import { getOrCreateRouter } from "./router.js";
import { createWebRtcTransport } from "./transport.js";

export const registerMediaHandlers = (io, socket) => {
  /**
   * Get RTP Capabilities
   */
  socket.on("media:getRtpCapabilities", async ({ roomId }, cb) => {
    const router = await getOrCreateRouter(roomId);
    cb(router.rtpCapabilities);
  });

  /**
   * Create WebRTC Transport
   */
  socket.on("media:createTransport", async ({ roomId }, cb) => {
    const router = await getOrCreateRouter(roomId);
    const { transport, params } = await createWebRtcTransport(router);

    socket.transports = socket.transports || [];
    socket.transports.push(transport);

    cb(params);
  });

  /**
   * Connect Transport
   */
  socket.on(
    "media:connectTransport",
    async ({ transportId, dtlsParameters }) => {
      const transport = socket.transports?.find((t) => t.id === transportId);
      if (!transport) return;

      await transport.connect({ dtlsParameters });
    }
  );
};
