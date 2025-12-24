import { getOrCreateRouter } from "./router.js";
import { createWebRtcTransport } from "./transport.js";
import { getRoomState } from "./state.js";

export const registerMediaHandlers = (io, socket) => {
  socket.transports = [];
  socket.producers = [];
  socket.consumers = [];

  /**
   * RTP Capabilities
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

    socket.transports.push(transport);
    cb(params);
  });

  /**
   * Connect Transport
   */
  socket.on(
    "media:connectTransport",
    async ({ transportId, dtlsParameters }) => {
      const transport = socket.transports.find((t) => t.id === transportId);
      if (!transport) return;
      await transport.connect({ dtlsParameters });
    }
  );

  /**
   * PRODUCE (audio/video)
   */
  socket.on(
    "media:produce",
    async ({ roomId, transportId, kind, rtpParameters }, cb) => {
      const transport = socket.transports.find((t) => t.id === transportId);
      if (!transport) return;

      const producer = await transport.produce({ kind, rtpParameters });
      socket.producers.push(producer);

      const roomState = getRoomState(roomId);
      roomState.producers.set(producer.id, producer);

      // notify others
      socket.to(roomId).emit("media:newProducer", {
        producerId: producer.id,
        kind,
      });

      producer.on("transportclose", () => {
        producer.close();
        roomState.producers.delete(producer.id);
      });

      cb({ producerId: producer.id });
    }
  );

  /**
   * CONSUME
   */
  socket.on(
    "media:consume",
    async (
      { roomId, consumerTransportId, producerId, rtpCapabilities },
      cb
    ) => {
      const router = await getOrCreateRouter(roomId);

      if (!router.canConsume({ producerId, rtpCapabilities })) return;

      const transport = socket.transports.find(
        (t) => t.id === consumerTransportId
      );
      if (!transport) return;

      const consumer = await transport.consume({
        producerId,
        rtpCapabilities,
        paused: true,
      });

      socket.consumers.push(consumer);

      const roomState = getRoomState(roomId);
      roomState.consumers.set(consumer.id, consumer);

      consumer.on("transportclose", () => {
        consumer.close();
        roomState.consumers.delete(consumer.id);
      });

      cb({
        id: consumer.id,
        producerId,
        kind: consumer.kind,
        rtpParameters: consumer.rtpParameters,
      });
    }
  );

  /**
   * Resume Consumer
   */
  socket.on("media:resume", async ({ consumerId }) => {
    const consumer = socket.consumers.find((c) => c.id === consumerId);
    if (!consumer) return;
    await consumer.resume();
  });

  /**
   * Cleanup on disconnect
   */
  socket.on("disconnect", () => {
    socket.producers.forEach((p) => p.close());
    socket.consumers.forEach((c) => c.close());
    socket.transports.forEach((t) => t.close());
  });
};
