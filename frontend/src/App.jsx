import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="h-full w-full">
      <Toaster position="top-right" />
      <AppRoutes />
    </div>
  );
}
