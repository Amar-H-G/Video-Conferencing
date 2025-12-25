import { useParams } from "react-router-dom";

export default function Meeting() {
  const { roomId } = useParams();
  return (
    <div className="min-h-screen flex items-center justify-center text-xl">
      Meeting Room {roomId}
    </div>
  );
}
