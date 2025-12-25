import { useParams } from "react-router-dom";

export default function WaitingRoom() {
  const { roomId } = useParams();
  return (
    <div className="min-h-screen flex items-center justify-center text-xl">
      Waiting for approval — Room {roomId}
    </div>
  );
}
