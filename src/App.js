import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import PorterDashboard from "./pages/PorterDashboard";
import ChatWrapper from "./components/ChatWrapper";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/porter-dashboard" element={<PorterDashboard />} />
        {/* <Route path="/chat" element={<Chat />} /> */}
        <Route path="/chat/:chatId" element={<ChatWrapper />} />
        </Routes>
    </Router>
  );
}

export default App;
