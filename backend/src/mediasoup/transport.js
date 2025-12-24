import { mediasoupConfig } from "../config/mediasoup.config.js";

export const createWebRtcTransport = async (router) => {
  const transport = await router.createWebRtcTransport(
    mediasoupConfig.webRtcTransport
  );

  return {
    transport,
    params: {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
    },
  };
};
