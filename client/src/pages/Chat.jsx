import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../socket/socket";
import { useNavigate } from "react-router-dom"; // 👈 for redirect

const Chat = () => {
  const {
    isConnected,
    messages,
    sendMessage,
    users,
    typingUsers,
    setTyping,
    disconnect,
  } = useContext(SocketContext);

  const [username, setUsername] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    setUsername(savedUsername || "Anonymous");
  }, []);

  useEffect(() => {
    setTyping(newMessage.trim().length > 0);
    return () => setTyping(false);
  }, [newMessage]);

  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage({ message: newMessage, sender: username });
      setNewMessage("");
      setTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    disconnect();
    navigate("/");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Welcome, {username}</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h3>Global Chat Room</h3>

      <div className="message-box">
        {messages.map((msg, index) => (
          <div className="message" key={msg.id || index}>
            <strong>{msg.sender || "System"}:</strong> {msg.message}
          </div>
        ))}
      </div>

      {typingUsers.length > 0 && (
        <p className="typing-indicator">
          {typingUsers.join(", ")} typing...
        </p>
      )}

      <div className="input-box">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>

      <p style={{ marginTop: "1rem" }}>🟢 Online Users: {users.length}</p>
    </div>
  );
};

export default Chat;
