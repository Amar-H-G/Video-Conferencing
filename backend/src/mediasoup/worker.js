import mediasoup from "mediasoup";
import { mediasoupConfig } from "../config/mediasoup.config.js";

let worker;

export const createWorker = async () => {
  if (worker) return worker;

  worker = await mediasoup.createWorker(mediasoupConfig.worker);

  worker.on("died", () => {
    console.error("❌ mediasoup worker died");
    process.exit(1);
  });

  console.log("✅ mediasoup worker created");

  return worker;
};
