// client/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../socket/socket";

const Login = () => {
  const [username, setUsername] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      socket.connect();
      socket.emit("user_join", username);
      localStorage.setItem("username", username); // optional
      navigate("/chat");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Join the Chat</h2>
      <input
        type="text"
        placeholder="Enter a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Join</button>
    </div>
  );
};

export default Login;
