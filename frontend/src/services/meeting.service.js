import api from "./api";

// Create a new room
export const createMeeting = async (payload) => {
  const res = await api.post("/rooms", payload);
  return res.data;
};

// Join room by roomId
export const joinMeeting = async (roomId) => {
  const res = await api.post(`/rooms/${roomId}/join`);
  return res.data;
};
