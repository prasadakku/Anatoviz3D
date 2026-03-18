import "./App.css";
import Router from "./routes/Router";
import { AuthProvider } from "./utils/auth";

export default function App() {
  return (
    <AuthProvider>
      <div className="app-root">
        <Router />
      </div>
    </AuthProvider>
  );
}
