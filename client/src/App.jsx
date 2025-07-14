// client/src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { SocketContext } from "./socket/socket";
import { useSocket } from "./socket/socket";
import React from "react";

function App() {
  const socketContext = useSocket();

  return (
    <SocketContext.Provider value={socketContext}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export default App;
