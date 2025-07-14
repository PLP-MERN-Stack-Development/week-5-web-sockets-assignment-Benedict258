import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../socket/socket";

const Login = () => {
  const [username, setUsername] = useState("");
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      socket.connect(username);
      localStorage.setItem("username", username);
      navigate("/chat");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>Join the Chat</h2>
      <input
        type="text"
        placeholder="Enter a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginRight: "1rem" }}
      />
      <button onClick={handleLogin}>Join</button>
    </div>
  );
};

export default Login;
