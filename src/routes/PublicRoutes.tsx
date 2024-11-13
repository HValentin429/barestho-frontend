import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Chat from '../features/chat/pages/Chat';
import Messages from '../features/chat/pages/Messages';

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/chat/user/:id" element={<Messages/>} />
      <Route path="/chat/restaurant/:id?" element={<Chat/>} />
    </Routes>
  );
};

export default PublicRoutes;

